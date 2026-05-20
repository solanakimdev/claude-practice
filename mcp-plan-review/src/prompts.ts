export function buildReviewPrompt(plan: string): string {
  return `You must respond in English only. Point out any missing parts or risks in this implementation plan:\n\n${plan}`;
}

export function buildMarkdown(plan: string, review: string, dateStr: string): string {
  return `# Plan Review\n\n**Date:** ${dateStr}\n\n## Original Plan\n\n${plan}\n\n## Gemini Review\n\n${review}\n`;
}

export function buildTimestamp(now: Date): string {
  return now
    .toISOString()
    .replace(/T/, "-")
    .replace(/:/g, "")
    .slice(0, 15);
}
