import fs from "fs/promises";
import path from "path";

export function resolveOutputPath(
  outputPath: string | undefined,
  projectRoot: string,
  timestamp: string
): { filePath: string; error?: string } {
  if (outputPath) {
    const resolved = path.resolve(projectRoot, outputPath);
    if (!resolved.startsWith(projectRoot + path.sep)) {
      return { filePath: "", error: "output_path must be within the project directory" };
    }
    return { filePath: resolved };
  }
  return { filePath: path.join(projectRoot, `plan-reviews/review-${timestamp}.md`) };
}

export async function writeReview(filePath: string, content: string): Promise<void> {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, "utf-8");
}
