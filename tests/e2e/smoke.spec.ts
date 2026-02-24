import { test, expect } from "@playwright/test";

test.describe("Smoke", () => {
  test("home loads and does not expose Chapters/Journal links", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("body")).toBeVisible();

    await expect(page.locator('a[href="/chapters"]')).toHaveCount(0);
    await expect(page.locator('a[href="/journal"]')).toHaveCount(0);

    const collectiveLinks = page.locator('a[href="/collective"], a[href="/collective/"]');
    await expect(collectiveLinks.first()).toBeVisible();

    await collectiveLinks.first().click();
    await expect(page).toHaveURL(/\/collective\/?$/);
    await expect(page.locator("body")).toBeVisible();
  });

  test("collective loads (do not require links)", async ({ page }) => {
    await page.goto("/collective", { waitUntil: "domcontentloaded" });
    await expect(page.locator("body")).toBeVisible();

    // Must have at least one visible heading somewhere on the page
    await expect(page.getByRole("heading").first()).toBeVisible();

    // Still enforce hidden routes are not exposed via UI links on this page
    await expect(page.locator('a[href="/chapters"]')).toHaveCount(0);
    await expect(page.locator('a[href="/journal"]')).toHaveCount(0);
  });

  test("core routes respond", async ({ page }) => {
    // NOTE: /collections is not live yet (currently 404), so do not assert it here.
    const routes = ["/", "/collective"];
    for (const route of routes) {
      const resp = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(resp, `No response for ${route}`).not.toBeNull();
      expect(resp!.status(), `Bad status for ${route}`).toBeLessThan(400);
      await expect(page.locator("body")).toBeVisible();
    }
  });
});
