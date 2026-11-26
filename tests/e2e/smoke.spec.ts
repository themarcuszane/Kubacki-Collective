import { test, expect } from '@playwright/test';

const shirt = '/images/collective/derek-kubacki-shirt-poland.png';

test.describe('Kubacki Collective public site', () => {
  for (const [route, label, nextPhoto, lastPhoto] of [
    ['/', 'Homepage portraits', '/images/hero/paris-coat.jpg', '/images/hero/snow-fire.jpg'],
    ['/collective', 'Collective portraits', '/images/collective/mountain-view.jpg', '/images/collective/umbrella-portrait.jpg']
  ]) {
    test(`portrait controls work on ${route} and respect reduced motion`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(route, { waitUntil: 'networkidle' });
      const carousel = page.getByRole('region', { name: label, exact: true });
      const activeImage = carousel.locator('[aria-roledescription="slide"][aria-hidden="false"] img');
      await expect(carousel.getByRole('button', { name: 'Play slideshow', exact: true })).toBeVisible();
      await expect(activeImage).toHaveAttribute('src', shirt);
      await expect(activeImage).toHaveCSS('object-fit', 'contain');
      await expect.poll(() => activeImage.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
      await carousel.getByRole('button', { name: 'Next photo', exact: true }).click();
      await expect(activeImage).toHaveAttribute('src', nextPhoto);
      await carousel.getByRole('button', { name: 'Previous photo', exact: true }).click();
      await expect(activeImage).toHaveAttribute('src', shirt);
      await carousel.getByRole('button', { name: 'Previous photo', exact: true }).click();
      await expect(activeImage).toHaveAttribute('src', lastPhoto);
      await expect(carousel.getByRole('button', { name: 'Play slideshow', exact: true })).toBeVisible();
    });
  }

  test('slideshow can play and pause after a manual selection', async ({ page }) => {
    await page.goto('/');
    const carousel = page.getByRole('region', { name: 'Homepage portraits', exact: true });
    const activeImage = carousel.locator('[aria-roledescription="slide"][aria-hidden="false"] img');
    await carousel.getByRole('button', { name: 'Show photo 1: The shirt concept', exact: true }).click();
    await expect(activeImage).toHaveAttribute('src', shirt);
    await carousel.getByRole('button', { name: 'Play slideshow', exact: true }).click();
    await expect(activeImage).toHaveAttribute('src', '/images/hero/paris-coat.jpg', { timeout: 12000 });
    await carousel.getByRole('button', { name: 'Pause slideshow', exact: true }).click();
    await expect(carousel.getByRole('button', { name: 'Play slideshow', exact: true })).toBeVisible();
  });

  test('mobile navigation opens, navigates, and closes', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.getByRole('button', { name: 'Open navigation', exact: true }).click();
    const menu = page.getByRole('navigation', { name: 'Mobile navigation', exact: true });
    await expect(menu).toBeVisible();
    await menu.getByRole('link', { name: 'Chapters', exact: true }).click();
    await expect(page).toHaveURL(/\/chapters\/?$/);
    await expect(menu).not.toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('landing page shows the collective and company branding', async ({ page }) => {
    const response = await page.goto('/', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { name: 'Kubacki Collective', exact: true })).toBeVisible();
    await expect(page.getByRole('banner')).toContainText('By TeamDryBox LLC');
    await expect(page.getByRole('link', { name: 'Enter the Collective' })).toBeVisible();
    await expect(page.getByRole('contentinfo')).toContainText('TeamDryBox LLC');
    await expect(page.locator('body')).not.toContainText('CareerOS');
  });

  for (const route of ['/collective', '/collective/', '/start', '/chapters', '/chapters/', '/journal', '/journal/']) {
    test(`public route ${route} works without CareerOS configuration`, async ({ page }) => {
      const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
      expect(response?.status()).toBe(200);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.getByRole('banner')).toContainText('By TeamDryBox LLC');
      await expect(page.getByRole('contentinfo')).toContainText('TeamDryBox LLC');
      await expect(page.locator('body')).not.toContainText('CareerOS');
    });
  }

  for (const section of ['chapters', 'journal']) {
    test(`${section} links open published MDX content`, async ({ page }) => {
      await page.goto(`/${section}`);
      const link = page.locator(`main a[href^="/${section}/"]`).first();
      const title = (await link.getByRole('heading').textContent())!.trim();
      await link.click();
      await expect(page).toHaveURL(new RegExp(`/${section}/[^/]+/?$`));
      await expect(page.getByRole('heading', { name: title, level: 1, exact: true }).first()).toBeVisible();
      await expect(page.getByRole('article')).toBeVisible();
      await expect(page.getByRole('contentinfo')).toContainText('TeamDryBox LLC');
    });
  }

  test('journal index lists each post once while older slugs still resolve', async ({ page }) => {
    await page.goto('/journal/');
    const titles = await page.locator('main li h2').allTextContents();
    expect(titles.length).toBeGreaterThan(0);
    expect(new Set(titles).size).toBe(titles.length);
    for (const slug of ['kubacki-aesthetic-rules', 'not-for-everyone-note', 'what-we-ship-first']) {
      expect((await page.goto(`/journal/${slug}/`))?.status()).toBe(200);
    }
  });

  test('removed workshop portrait is absent from pages and public assets', async ({ page, request }) => {
    for (const route of ['/', '/collective', '/start']) {
      await page.goto(route);
      await expect(page.locator('img[src*="inventor.jpeg"]')).toHaveCount(0);
    }
    expect((await request.get('/images/collective/inventor.jpeg')).status()).toBe(404);
  });

  test('unknown public routes return a real 404', async ({ page }) => {
    expect((await page.goto('/collective-ci-nonexistent-page'))?.status()).toBe(404);
    await expect(page.locator('body')).not.toContainText('CareerOS');
  });
});
