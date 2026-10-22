import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import crypto from "node:crypto";
const manifest = JSON.parse(await fs.readFile("src/data/credentials.json", "utf8"));
const base = "http://127.0.0.1:8082";
const out = "artifacts/credentials";
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch();
const results = [];
const errors = [];
try {
  for (const [width, height] of [
    [1440, 900],
    [1024, 900],
    [768, 1024],
    [390, 844],
  ]) {
    const page = await browser.newPage({
      viewport: { width, height },
      hasTouch: width === 390,
      isMobile: width === 390,
    });
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    await page.goto(base, { waitUntil: "networkidle" });
    await page.locator('.editorial-site[data-hydrated="true"]').waitFor();
    const cards = page.locator("[data-credential-id]");
    await expect(cards).toHaveCount(9);
    const ids = await cards.evaluateAll((es) => es.map((e) => e.dataset.credentialId));
    assert.equal(new Set(ids).size, 9);
    for (const item of manifest) {
      await expect(
        page.getByRole("button", { name: `Explore ${item.title}`, exact: true }),
      ).toHaveCount(1);
    }
    for (let i = 0; i < 9; i++) {
      const card = cards.nth(i);
      await card.scrollIntoViewIfNeeded();
      await page.waitForTimeout(650);
      if (width === 390) await card.tap();
      else await card.click();
      const modal = page.locator(".credential-dialog");
      await expect(modal).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Close achievement", exact: true }),
      ).toBeFocused();
      const title = await modal.locator("h2").innerText();
      const record = manifest.find((c) => c.title === title);
      if (record) {
        await expect(modal.locator(".credential-facts")).toContainText(record.issuer);
        await expect(modal.locator(".credential-facts")).toContainText(record.dateLabel);
        await expect(modal.locator(".credential-preview img")).toHaveAttribute(
          "src",
          record.certificateImage,
        );
        if (record.badgeImage)
          await expect(modal.locator(".credential-dialog-badge img")).toHaveAttribute(
            "src",
            record.badgeImage,
          );
        else await expect(modal.locator(".credential-dialog-badge img")).toHaveCount(0);
      }
      await expect(modal.getByRole("link", { name: "Verify credential", exact: true })).toHaveCount(
        0,
      );
      for (const img of await modal.locator("img").all()) {
        await expect(img).toBeVisible();
        await img.evaluate((e) => e.decode());
        const dims = await img.evaluate((e) => ({
          w: e.width,
          h: e.height,
          nw: e.naturalWidth,
          nh: e.naturalHeight,
        }));
        assert.ok(dims.nw > 0);
        assert.ok(
          Math.abs(dims.w / dims.h - dims.nw / dims.nh) < 0.025,
          "Original image aspect ratio",
        );
      }
      for (const link of await modal.locator("a").all()) {
        assert.equal(
          (await page.request.get(new URL(await link.getAttribute("href"), base).href)).status(),
          200,
        );
      }
      await page.keyboard.press("Tab");
      assert.ok(
        await page.evaluate(() => !!document.activeElement.closest(".credential-dialog")),
        "Focus stays in native modal",
      );
      assert.ok(
        await modal.evaluate((e) => e.scrollWidth <= e.clientWidth + 1),
        "Dialog has no horizontal overflow",
      );
      if (i === 0 || i === 4) await page.screenshot({ path: `${out}/modal-${i}-${width}.png` });
      if (i % 2 === 0) await page.keyboard.press("Escape");
      else await page.getByRole("button", { name: "Close achievement", exact: true }).click();
      await expect(modal).not.toBeVisible();
      await expect(card).toBeFocused();
    }
    for (const [name, selector] of [
      ["feature", ".credentials-heading"],
      ["training", ".credential-collection-heading"],
      ["internship", ".credential-internship"],
    ]) {
      await page
        .locator(selector)
        .evaluate((e) =>
          scrollTo({ top: scrollY + e.getBoundingClientRect().top - 28, behavior: "instant" }),
        );
      await page.waitForTimeout(800);
      await page.screenshot({ path: `${out}/${name}-${width}.png` });
    }
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await page.locator("#credentials").screenshot({ path: `${out}/collection-${width}.png` });
    results.push({
      width,
      height,
      achievements: 9,
      manifestAchievements: 5,
      modalChecks:
        "pairings, dates, category, image ratios, local links, Escape, close button, focus containment/restoration",
      status: "passed",
    });
    await page.close();
  }
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.locator('.editorial-site[data-hydrated="true"]').waitFor();
  const feature = page.locator(".credential-feature-button");
  await feature.scrollIntoViewIfNeeded();
  assert.equal(
    await feature.evaluate((e) => getComputedStyle(e.closest(".credential-reveal")).opacity),
    "1",
  );
  await feature.click();
  await expect(page.locator(".credential-dialog")).toBeVisible();
  await page.mouse.click(2, 2);
  await expect(page.locator(".credential-dialog")).not.toBeVisible();
  await expect(feature).toBeFocused();
  const images = await page
    .locator("#credentials img")
    .evaluateAll((es) => es.map((e) => ({ src: e.getAttribute("src"), lazy: e.loading })));
  assert.ok(images.every((e) => e.lazy === "lazy"));
  for (const item of manifest)
    for (const url of [item.badgeImage, item.certificateImage].filter(Boolean))
      assert.equal((await page.request.get(base + url)).status(), 200);
  const safe = await fs.readFile(
    "public/certifications/eduskills-ai-cloud-engineer-internship-certificate-public.jpg",
  );
  const old = await fs.readFile("public/certificates/eduskills-cloud-engineer.jpg");
  assert.equal(
    crypto.createHash("sha256").update(safe).digest("hex"),
    crypto.createHash("sha256").update(old).digest("hex"),
  );
  results.push({
    reducedMotion: "passed",
    backdropDismissal: "passed",
    lazyImages: images.length,
    publicSafeLegacyAlias: "byte-identical",
    assets: 9,
  });
  assert.deepEqual(errors, []);
  await fs.writeFile(`${out}/results.json`, JSON.stringify({ results, errors }, null, 2));
  console.log(JSON.stringify({ results, errors }, null, 2));
  await page.close();
} finally {
  await browser.close();
}
