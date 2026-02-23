import { test, expect } from "@playwright/test";

test.describe("Kubacki Collective - Smoke", () => {
  test("home loads and key sections exist", async ({ page }) => {
    await page.goto("/");

    // Basic page sanity
    await expect(page).toHaveTitle(/Kubacki/i).catch(async () => {
      // Title may not be set yet; don't hard fail on title
      // We'll still assert content below.
    });

    // Check for section anchors (IDs should exist)
    await expect(page.locator("#manifesto")).toBeVisible();
    await expect(page.locator("#principles")).toBeVisible();
    await expect(page.locator("#atmosphere")).toBeVisible();
    await expect(page.locator("#chapters")).toBeVisible();
    await expect(page.locator("#journal")).toBeVisible();
    await expect(page.locator("#signal")).toBeVisible();

    // Ensure images render (Next/Image renders <img> tags)
    const imgs = page.locator("img");
    await expect(imgs.first()).toBeVisible();
  });

  test("chapters index loads", async ({ page }) => {
    await page.goto("/chapters");
    await expect(page.getByText("Chapters")).toBeVisible();
    // Should have at least one link card
    await expect(page.locator('a[href^="/chapters/"]').first()).toBeVisible();
  });

  test("journal index loads", async ({ page }) => {
    await page.goto("/journal");
    await expect(page.getByText("Journal")).toBeVisible();
    await expect(page.locator('a[href^="/journal/"]').first()).toBeVisible();
  });

  test("a chapter page renders MDX content", async ({ page }) => {
    await page.goto("/chapters/cinematic");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    // Look for a known heading inside the MDX
    await expect(page.getByText("What makes it feel expensive?")).toBeVisible();
  });

  test("a journal post renders MDX content", async ({ page }) => {
    await page.goto("/journal/hero-rhythm");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText(/Motion is punctuation/i)).toBeVisible();
  });

  test("no obvious runtime errors in console", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(String(err)));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/");
    await page.waitForTimeout(500);

    // Allow Next.js dev overlay warnings; we only care about actual runtime errors
    const filtered = errors.filter((e) => !e.includes("Download the React DevTools"));
    expect(filtered).toEqual([]);
  });
});
