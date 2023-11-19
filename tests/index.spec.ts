import { test, expect } from "@playwright/test";
import { API_URL } from "./constants";

test("Load index.html", async ({ page }) => {
  // 1. Go to API_URL
  await page.goto(API_URL);

  // 2. Assert that the title is correct
  await expect(page.title()).resolves.toMatch("Api colores");

  // 3. Assert that the heading is correct
  await expect(page.textContent("h1")).resolves.toMatch("Api colores");
});
