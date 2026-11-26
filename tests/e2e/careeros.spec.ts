import { test, expect } from "@playwright/test";

// These scaffold routes require a configured test Supabase project and are not
// deployed to the public S3 site. Run with the explicit CareerOS configuration.
test.describe("CareerOS scaffold", () => {
  test("auth routes load", async ({ page }) => {
    await page.goto("/sign-in", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: "Sign in to your workspace" })).toBeVisible();
    await page.goto("/sign-up", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: "Create your CareerOS account" })).toBeVisible();
  });

  test("protected routes redirect unauthenticated users to sign in", async ({ page }) => {
    for (const route of ["/dashboard", "/onboarding", "/opportunities", "/pipeline", "/settings"]) {
      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response?.status(), `Failed to load ${route}`).toBeLessThan(400);
      await expect(page).toHaveURL(/\/sign-in/);
      await expect(page.getByRole("heading", { name: "Sign in to your workspace" })).toBeVisible();
    }
  });
});
