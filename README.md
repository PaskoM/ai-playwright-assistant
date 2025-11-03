Generate and maintain Playwright test cases using LLMs (via OpenRouter).
Designed as a demo for GenAI + QA automation.

Features:
CLI to generate Playwright tests from plain text or URLs
Auditing tool to refactor existing flaky tests
OpenRouter integration (free Anthropic / OpenAI models)
Runs against the official Playwright TodoMVC demo

Setup:
git clone https://github.com/PaskoM/ai-playwright-assistant.git
cd ai-playwright-assistant
npm install

Create .env
OPENAI_API_KEY=sk-or-v1\*...
OPENAI_BASE_URL=https://openrouter.ai/api/v1
OPENAI_MODEL=anthropic/claude-3.5-sonnet

Generate a test:
npx ts-node src/cli.ts gen "TodoMVC: add two items, toggle first, delete second"

Run tests:
npx playwright test --headed

Stack:
Playwright
TypeScript
OpenRouter
Commander
