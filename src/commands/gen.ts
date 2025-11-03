import fs from "fs";
import path from "path";
import { complete, extractTsFromMarkdown } from "../providers/openai";
import { SYSTEM } from "../prompts";

export async function generateTest(input: string, outputPath: string) {
  console.log("Generating Playwright test for:", input);

  const messages = [
    { role: "system" as const, content: SYSTEM },
    {
      role: "user" as const,
      content: `Create a Playwright test for this feature or page: "${input}"`,
    },
  ];

  const md = await complete(messages);
  const code = extractTsFromMarkdown(md);

  const absPath = path.resolve(outputPath);
  fs.mkdirSync(path.dirname(absPath), { recursive: true });
  fs.writeFileSync(absPath, code, "utf8");

  console.log("Test written to", absPath);
}
