import { chromium, expect } from "@playwright/test";
import fs from "node:fs/promises";
import assert from "node:assert/strict";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://127.0.0.1:8082/", { waitUntil: "domcontentloaded" });
await p.waitForFunction(() => document.documentElement.dataset.arrival === "done");
await p.waitForTimeout(1600);
await p.locator("#about-3").click();
await p.locator('[href="#credentials"]').click();
await p.waitForTimeout(1800);
const y = await p.evaluate(() => scrollY);
await p.goto("about:blank");
await p.goBack();
await p.waitForFunction(
  () =>
    document.querySelector(".editorial-site")?.dataset.hydrated === "true" &&
    !window.__homepageArrival?.restore,
);
await p.waitForTimeout(300);
assert.equal(new URL(p.url()).hash, "#credentials");
const restoredY = await p.evaluate(() => scrollY);
assert.ok(Math.abs(restoredY - y) < 10, `Expected ${y}; restored ${restoredY}`);
assert.equal(await p.locator(".arrival-overlay:visible").count(), 0);
await p.goto("http://127.0.0.1:8082/", { waitUntil: "domcontentloaded" });
await p.emulateMedia({ reducedMotion: "reduce" });
await p.waitForTimeout(250);
assert.equal(await p.evaluate(() => window.__homepageArrival.pending), false);
assert.equal(await p.evaluate(() => scrollY), 0);
const mobile = await b.newPage({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});
await mobile.goto("http://127.0.0.1:8082/", { waitUntil: "domcontentloaded" });
await mobile.locator("[data-skip-arrival]").tap();
await mobile.waitForTimeout(1600);
assert.equal(await mobile.evaluate(() => scrollY), 0);
await expect(mobile.locator("h1")).toBeVisible();
console.log("PASS full-document history, reduced-motion changed during intro, mobile tap skip");
await fs.writeFile(
  "artifacts/arrival/additional-results.json",
  JSON.stringify({ documentHistory: true, liveReducedMotion: true, mobileTapSkip: true }),
);
await b.close();
