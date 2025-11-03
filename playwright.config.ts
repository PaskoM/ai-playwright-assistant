import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  use: {
    headless: true,
    baseURL: process.env.BASE_URL || "https://demo.playwright.dev/todomvc",
  },
  reporter: [["list"], ["html", { outputFolder: "test-results/html" }]],
  timeout: 30000,
});
