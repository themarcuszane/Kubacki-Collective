import { test, expect } from "@playwright/test";

test.describe("Smoke", () => {
  test("landing page loads with primary auth entry points", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("body")).toBeVisible();

    await expect(page.getByRole("heading", { name: "Your AI Job Search Command Center" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Get Started" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Sign In" }).first()).toBeVisible();
  });

  test("auth routes load", async ({ page }) => {
    await page.goto("/sign-in", { waitUntil: "domcontentloaded" });
    await expect(page.locator("body")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Sign in to your workspace" })).toBeVisible();

    await page.goto("/sign-up", { waitUntil: "domcontentloaded" });
    await expect(page.locator("body")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Create your CareerOS account" })).toBeVisible();
  });

  test("protected routes redirect unauthenticated users to sign in", async ({ page }) => {
    const routes = ["/dashboard", "/onboarding", "/opportunities", "/pipeline", "/settings"];
    for (const route of routes) {
      const resp = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(resp, `No response for ${route}`).not.toBeNull();
      expect(resp!.status(), `Bad status for ${route}`).toBeLessThan(400);
      await expect(page.locator("body")).toBeVisible();
      await expect(page).toHaveURL(/\/sign-in/);
    }
  });
});
