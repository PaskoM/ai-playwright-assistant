import { Command } from "commander";
import { generateTest } from "./commands/gen";
import { auditTests } from "./commands/audit";

const program = new Command();

program
  .name("ai-playwright-assistant")
  .description("Generate and maintain Playwright tests with LLM help");

program
  .command("gen")
  .description("Generate new Playwright test from URL or feature")
  .argument("<input>", "Page URL or feature description")
  .option("-o, --output <path>", "Output path", "tests/e2e/ai-test.spec.ts")
  .action(async (input, options) => {
    await generateTest(input, options.output);
  });

program
  .command("audit")
  .description("Audit and improve existing tests")
  .argument("<path>", "Path to existing test file")
  .action(async (path) => {
    await auditTests(path);
  });

program.parse();
