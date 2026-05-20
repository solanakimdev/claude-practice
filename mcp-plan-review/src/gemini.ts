import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

export function createGeminiModel(apiKey: string): GenerativeModel {
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
}

export async function generateReview(
  model: GenerativeModel,
  prompt: string
): Promise<string> {
  const result = await model.generateContent(prompt);
  return result.response.text();
}
