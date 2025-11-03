import fs from "fs";
import path from "path";
import { complete, extractTsFromMarkdown } from "../providers/openai";
import { execa } from "execa";

const AUDIT_SYSTEM = `
You are a senior Playwright reviewer.
Return ONLY a single Markdown code block with a fully revised test file.
Rules:
- Keep imports: import { test, expect } from "@playwright/test"
- Preserve intent but improve selectors, stability, and assertions.
- Assume baseURL in config. Prefer page.goto("/") when possible.
- No comments. Deterministic, resilient locators (getByRole, getByLabel, etc.).
- Keep tests independent. Avoid brittle timing.
`;

export async function auditTests(filePath: string) {
  const abs = path.resolve(filePath);
  if (!fs.existsSync(abs)) {
    console.error(`File not found: ${abs}`);
    process.exit(1);
  }

  console.log("Auditing:", abs);

  const original = fs.readFileSync(abs, "utf8");

  // Run the current tests and capture output
  console.log("Running existing tests...");
  let runOutput = "";
  try {
    const { stdout } = await execa("npx", ["playwright", "test", abs], {
      stdio: "pipe",
    });
    runOutput = stdout;
  } catch (err: any) {
    runOutput = err?.stdout || String(err);
  }

  const prompt = [
    { role: "system" as const, content: AUDIT_SYSTEM },
    {
      role: "user" as const,
      content:
        `Here is a Playwright test file. Improve it for stability and clarity.\n\n` +
        `---FILE START---\n${original}\n---FILE END---\n\n` +
        `Test run output for context:\n${runOutput.substring(0, 4000)}`,
    },
  ];

  const md = await complete(prompt);
  const revised = extractTsFromMarkdown(md);
  fs.writeFileSync(abs, revised, "utf8");
  console.log("Audit complete:", abs);
}
