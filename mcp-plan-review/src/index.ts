import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import path from "path";
import { fileURLToPath } from "url";
import { createGeminiModel, generateReview } from "./gemini.js";
import { buildReviewPrompt, buildMarkdown, buildTimestamp } from "./prompts.js";
import { resolveOutputPath, writeReview } from "./fileWriter.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "../..");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("Error: GEMINI_API_KEY environment variable is required");
  process.exit(1);
}

const model = createGeminiModel(GEMINI_API_KEY);

const server = new Server(
  { name: "mcp-plan-review", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "review_plan",
      description:
        "Reviews an implementation plan and points out missing parts or risks using Gemini AI. Saves the result as a Markdown file.",
      inputSchema: {
        type: "object",
        properties: {
          plan: {
            type: "string",
            description: "The implementation plan text to review",
          },
          output_path: {
            type: "string",
            description:
              "Optional file path to save the review. If omitted, saves to plan-reviews/review-<timestamp>.md in the current directory.",
          },
        },
        required: ["plan"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== "review_plan") {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }

  const { plan, output_path } = request.params.arguments as {
    plan: string;
    output_path?: string;
  };

  if (!plan || typeof plan !== "string") {
    throw new Error("Missing required argument: plan (string)");
  }
  if (!plan.trim()) {
    throw new Error("plan cannot be empty");
  }
  if (plan.length > 50_000) {
    throw new Error("plan exceeds maximum length of 50,000 characters");
  }

  const prompt = buildReviewPrompt(plan);

  let review: string;
  try {
    review = await generateReview(model, prompt);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      content: [{ type: "text", text: `Gemini API error: ${msg}` }],
      isError: true,
    };
  }

  const now = new Date();
  const timestamp = buildTimestamp(now);
  const dateStr = now.toLocaleString("en-US");
  const markdown = buildMarkdown(plan, review, dateStr);

  const { filePath, error } = resolveOutputPath(output_path, PROJECT_ROOT, timestamp);
  if (error) {
    return {
      content: [{ type: "text", text: error }],
      isError: true,
    };
  }

  try {
    await writeReview(filePath, markdown);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      content: [{ type: "text", text: `${review}\n\n---\nFailed to save review file: ${msg}` }],
      isError: true,
    };
  }

  return {
    content: [
      {
        type: "text",
        text: `${review}\n\n---\nReview saved to: ${filePath}`,
      },
    ],
  };
});

const transport = new StdioServerTransport();
await server.connect(transport);
