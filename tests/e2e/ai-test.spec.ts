import { test, expect } from "@playwright/test";

test.describe("TodoMVC", () => {
  test("add two items, toggle first, delete second", async ({ page }) => {
    await page.goto("./");

    const newTodo = page.getByPlaceholder("What needs to be done?");
    await newTodo.fill("First todo");
    await newTodo.press("Enter");
    await newTodo.fill("Second todo");
    await newTodo.press("Enter");

    const items = page.locator(".todo-list li");
    await expect(items).toHaveCount(2);
    await expect(items.nth(0)).toContainText("First todo");
    await expect(items.nth(1)).toContainText("Second todo");

    await items.nth(0).locator("input.toggle").check();
    await expect(items.nth(0)).toHaveClass(/completed/);

    await items.nth(1).hover();
    await items.nth(1).locator("button.destroy").click();

    await expect(items).toHaveCount(1);
    await expect(items.nth(0)).toContainText("First todo");
  });
});
