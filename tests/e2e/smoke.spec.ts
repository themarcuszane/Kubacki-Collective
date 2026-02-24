import { test, expect } from "@playwright/test";

test.describe("Kubacki Collective - Smoke", () => {
  test("home loads and key sections exist", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("main").first()).toBeVisible();

    // Section anchors
    await expect(page.locator("#manifesto")).toBeVisible();
    await expect(page.locator("#principles")).toBeVisible();
    await expect(page.locator("#atmosphere")).toBeVisible();
    await expect(page.locator("#chapters")).toBeVisible();
    await expect(page.locator("#journal")).toBeVisible();
    await expect(page.locator("#signal")).toBeVisible();

    // At least one image should render
    await expect(page.locator("img").first()).toBeVisible();
  });

  test("chapters index loads and shows expected H1", async ({ page }) => {
    await page.goto("/chapters");

    // Use H1 role so we don't collide with nav links
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Collections of work, patterns, and proof."
    );

    // Ensure at least one chapter card link exists
    await expect(page.locator('a[href^="/chapters/"]').first()).toBeVisible();
  });

  test("journal index loads and shows expected H1", async ({ page }) => {
    await page.goto("/journal");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Notes from the build.");

    await expect(page.locator('a[href^="/journal/"]').first()).toBeVisible();
  });

  test("a chapter page renders an H1 and some body content", async ({ page }) => {
    await page.goto("/chapters/cinematic");

    // H1 must exist
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Body should have at least one paragraph rendered by MDX
    await expect(page.locator("article p").first()).toBeVisible();
  });

  test("a journal post renders an H1 and some body content", async ({ page }) => {
    await page.goto("/journal/hero-rhythm", { waitUntil: "domcontentloaded" });

    await expect(page).toHaveURL(/\/journal\/hero-rhythm/);

    const h1 = page.locator("main h1").first();
    await expect(h1).toHaveCount(1);
    await h1.scrollIntoViewIfNeeded();
    await expect(h1).toBeVisible();

    const p = page.locator("article p").first();
    await expect(p).toHaveCount(1);
    await p.scrollIntoViewIfNeeded();
    await expect(p).toBeVisible();
  });

  test("no pageerror exceptions", async ({ page }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (err) => pageErrors.push(String(err)));

    await page.goto("/");
    await page.waitForTimeout(300);

    expect(pageErrors).toEqual([]);
  });
});
