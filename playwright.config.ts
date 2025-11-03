import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  use: {
    headless: false,
    baseURL: "https://demo.playwright.dev/todomvc/",
  },
  reporter: [["list"], ["html"]],
  timeout: 30000,
  outputDir: "test-results",
});
