import { test, expect } from "@playwright/test";

test.describe("Kubacki Collective public site", () => {
  test("landing page shows the collective and company branding", async ({ page }) => {
    const response = await page.goto("/", { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { name: "Kubacki Collective", exact: true })).toBeVisible();
    await expect(page.getByRole("banner")).toContainText("By TeamDryBox LLC");
    await expect(page.getByRole("link", { name: "Enter the Collective" })).toBeVisible();
    await expect(page.getByRole("contentinfo")).toContainText("TeamDryBox LLC");
    await expect(page.locator("body")).not.toContainText("CareerOS");
  });

  for (const route of ["/collective", "/collective/", "/start", "/chapters", "/chapters/", "/journal", "/journal/"]) {
    test(`public route ${route} works without CareerOS configuration`, async ({ page }) => {
      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.getByRole("banner")).toContainText("By TeamDryBox LLC");
      await expect(page.getByRole("contentinfo")).toContainText("TeamDryBox LLC");
      await expect(page.locator("body")).not.toContainText("CareerOS");
    });
  }

  for (const section of ["chapters", "journal"]) {
    test(`${section} links open published MDX content`, async ({ page }) => {
      await page.goto(`/${section}`);
      const link = page.locator(`main a[href^="/${section}/"]`).first();
      const title = (await link.getByRole("heading").textContent())!.trim();
      await link.click();
      await expect(page).toHaveURL(new RegExp(`/${section}/[^/]+/?$`));
      // Some existing MDX posts repeat the title inside the article. The first
      // heading is the shared page shell; verify the article separately.
      await expect(page.getByRole("heading", { name: title, level: 1, exact: true }).first()).toBeVisible();
      await expect(page.getByRole("article")).toBeVisible();
      await expect(page.getByRole("contentinfo")).toContainText("TeamDryBox LLC");
    });
  }

  test("unknown public routes return a real 404", async ({ page }) => {
    const response = await page.goto("/collective-ci-nonexistent-page");
    expect(response?.status()).toBe(404);
    await expect(page.locator("body")).not.toContainText("CareerOS");
  });
});
