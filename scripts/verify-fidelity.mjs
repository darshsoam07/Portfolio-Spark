import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
const b = await chromium.launch();
const results = [];
try {
  for (const reference of [true, false]) {
    const tag = reference ? "reference" : "local";
    const ctx = await b.newContext({
      viewport: { width: 1440, height: 900 },
      recordVideo: { dir: "artifacts/fidelity/motion", size: { width: 1440, height: 900 } },
    });
    const p = await ctx.newPage();
    await p.goto(reference ? "https://samaymaurya.com/" : "http://127.0.0.1:8082/", {
      waitUntil: "networkidle",
    });
    await p.waitForTimeout(reference ? 8000 : 1800);
    await p
      .locator(reference ? ".hero-hoverword" : ".intro-copy p:nth-child(2) span")
      .first()
      .hover();
    await p.screenshot({ path: `artifacts/fidelity/${tag}-text-hover.png` });
    await p
      .locator(reference ? ".hero-polaroid" : ".polaroid")
      .first()
      .hover();
    await p.waitForTimeout(500);
    await p.screenshot({ path: `artifacts/fidelity/${tag}-portrait-hover.png` });
    await p
      .locator("#work")
      .evaluate((e) =>
        scrollTo({ top: scrollY + e.getBoundingClientRect().top, behavior: "instant" }),
      );
    await p.waitForTimeout(1000);
    await p
      .locator(reference ? ".work-card-media" : ".project-open")
      .first()
      .hover({ force: true });
    await p.waitForTimeout(500);
    await p.screenshot({ path: `artifacts/fidelity/${tag}-project-hover.png` });
    if (!reference) {
      const frame = p.locator(".browser-frame");
      await frame.evaluate((e) =>
        scrollTo({ top: scrollY + e.getBoundingClientRect().top - 55, behavior: "instant" }),
      );
      await p.waitForTimeout(800);
      const start = await p.evaluate(() => scrollY);
      await p.evaluate((y) => scrollTo({ top: y + 900 * 0.6, behavior: "instant" }), start);
      await p.waitForTimeout(800);
      await expect(p.locator("#about-1")).toHaveAttribute("aria-selected", "true");
      await p.getByRole("tab", { name: "education", exact: true }).click();
      await p.evaluate((y) => scrollTo({ top: y + 900 * 0.9, behavior: "instant" }), start);
      await p.waitForTimeout(700);
      await expect(p.locator("#about-2")).toHaveAttribute("aria-selected", "true");
      const f = await frame.boundingBox();
      assert.ok(f.y >= 50 && f.y < 60, "About browser remains pinned");
      const resumes = await p
        .locator("a")
        .evaluateAll((es) =>
          es.filter((e) => /resume/i.test(e.textContent)).map((e) => e.getAttribute("href")),
        );
      assert.ok(
        resumes.length === 3 &&
          resumes.every((s) => s === "mailto:darshsoam2006@gmail.com?subject=Resume%20request"),
      );
      results.push({
        aboutScroll: "advances tabs",
        manualSelection: "preserved while scrolling",
        resume: "3 correctly labelled mailto requests",
      });
    }
    await ctx.close();
  }
  const mobile = await b.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  await mobile.goto("http://127.0.0.1:8082/", { waitUntil: "networkidle" });
  await mobile.waitForTimeout(1800);
  await mobile.locator(".photo-0").tap();
  await expect(mobile.locator(".photo-0")).toHaveAttribute("aria-pressed", "true");
  await mobile.getByRole("link", { name: "about me", exact: true }).tap();
  await mobile.getByRole("tab", { name: "education", exact: true }).tap();
  await expect(
    mobile.getByText("B.Tech in Computer Science Engineering", { exact: true }),
  ).toBeVisible();
  assert.equal(await mobile.locator(".pin-spacer").count(), 0);
  results.push({ mobile: "touch photo, navigation, tabs; no pins" });
  await mobile.close();
  await fs.writeFile("artifacts/fidelity/motion-results.json", JSON.stringify(results, null, 2));
  console.log(results);
} finally {
  await b.close();
}
