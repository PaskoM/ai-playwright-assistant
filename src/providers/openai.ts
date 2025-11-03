import "dotenv/config";
import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("Missing OPENAI_API_KEY in .env");
  process.exit(1);
}

const model = process.env.OPENAI_MODEL || "anthropic/claude-3.5-sonnet";

const client = new OpenAI({
  apiKey,
  baseURL: process.env.OPENAI_BASE_URL || "https://openrouter.ai/api/v1",
});

export async function complete(
  messages: { role: "system" | "user" | "assistant"; content: string }[]
) {
  const res = await client.chat.completions.create({
    model,
    temperature: 0.2,
    messages,
  });
  return res.choices?.[0]?.message?.content || "";
}

export function extractTsFromMarkdown(md: string): string {
  // Prefer ```ts or ```typescript blocks
  const typed = md.match(/```(?:ts|typescript)\n([\s\S]*?)```/i);
  if (typed) return typed[1].trim();

  // Fallback: any code fence, but strip a possible language token on line 1
  const any = md.match(/```([\s\S]*?)```/);
  if (any) {
    const text = any[1].replace(/^\s*[a-zA-Z0-9_+-]+\s*\n/, "");
    return text.trim();
  }
  return md.trim();
}
