import { test, expect } from "@playwright/test";

test.describe("Kubacki Collective public site", () => {
  for (const [route, nextPhoto] of [["/", "/images/hero/paris-coat.jpg"], ["/collective", "/images/collective/inventor.jpeg"]]) {
    test(`new shirt portrait leads ${route} carousel and rotation continues`, async ({ page }) => {
      await page.clock.install({ time: new Date("2026-11-25T12:00:00Z") });
      await page.clock.pauseAt(new Date("2026-11-25T12:00:01Z"));
      await page.goto(route, { waitUntil: "networkidle" });
      await page.clock.runFor(1500);
      const portrait = page.locator('img[src="/images/collective/derek-kubacki-shirt-poland.png"]');
      await expect(portrait).toBeVisible();
      await expect(portrait).toHaveCSS("object-fit", "contain");
      await expect.poll(() => portrait.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
      if (route === "/collective") {
        await expect(portrait).toHaveCSS("opacity", "1");
      }
      await page.clock.runFor(route === "/" ? 6000 : 2000);
      if (route === "/") {
        await expect(page.locator(`img[src="${nextPhoto}"]`)).toBeVisible();
      } else {
        await expect(portrait).toHaveCSS("opacity", "0");
        await expect(page.locator(`img[src="${nextPhoto}"]`)).toHaveCSS("opacity", "1");
      }
    });
  }

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
