import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
const out = "artifacts/arrival";
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch();
const errors = [];
const results = [];
const base = process.env.PREVIEW_URL || "http://127.0.0.1:8082";
async function ready(p) {
  await p.waitForFunction(() => document.documentElement.dataset.arrival === "done");
  await expect(p.locator(".editorial-site")).toHaveAttribute("data-hydrated", "true");
  await p.waitForTimeout(1600);
  assert.equal(await p.evaluate(() => scrollY), 0);
  await expect(p.locator("h1")).toContainText("Darsh");
  assert.equal(await p.locator("[data-arrival-inert]").count(), 0);
}
async function credentials(p) {
  await p.locator("#about-3").click();
  await p.locator('a[href="#credentials"]').click();
  await p.waitForTimeout(1800);
  assert.equal(new URL(p.url()).hash, "#credentials");
  assert.ok((await p.evaluate(() => scrollY)) > 1000);
  await p.locator("[data-credential-id]").first().click();
  await expect(p.locator(".credential-dialog")).toBeVisible();
  await p.keyboard.press("Escape");
}
try {
  for (const [width, height] of [
    [1440, 900],
    [1024, 900],
    [768, 1024],
    [390, 844],
  ]) {
    const ctx = await browser.newContext({
      viewport: { width, height },
      hasTouch: width === 390,
      isMobile: width === 390,
      recordVideo: { dir: out + "/local-video" },
    });
    const p = await ctx.newPage();
    p.on("pageerror", (e) => errors.push(e.message));
    p.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    await p.goto(base + "/?arrival-test=1#credentials", { waitUntil: "domcontentloaded" });
    if (await p.evaluate(() => window.__homepageArrival?.pending)) {
      await p.mouse.wheel(0, 700);
      assert.equal(await p.evaluate(() => scrollY), 0);
      await p.screenshot({ path: `${out}/local-${width}-intro.png` });
    }
    await ready(p);
    assert.equal(new URL(p.url()).hash, "");
    assert.equal(new URL(p.url()).search, "?arrival-test=1");
    await p.screenshot({ path: `${out}/local-${width}-hero.png` });
    assert.ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await credentials(p);
    await p.evaluate(() =>
      history.replaceState({ ...history.state, arrivalMarker: "preserved" }, "", location.href),
    );
    await p.reload({ waitUntil: "domcontentloaded" });
    await ready(p);
    assert.equal(await p.evaluate(() => history.state.arrivalMarker), "preserved");
    await p.screenshot({ path: `${out}/local-${width}-refresh.png` });
    await credentials(p);
    await p.locator('a[href="#main"]').last().click();
    await p.waitForTimeout(1500);
    await p.goBack();
    await p.waitForTimeout(1600);
    assert.equal(new URL(p.url()).hash, "#credentials");
    assert.ok((await p.evaluate(() => scrollY)) > 1000);
    assert.equal(await p.locator(".arrival-overlay:visible").count(), 0);
    await p.goForward();
    await p.waitForTimeout(1600);
    assert.equal(new URL(p.url()).hash, "#main");
    assert.ok((await p.evaluate(() => scrollY)) < 200);
    await p.goto(base, { waitUntil: "domcontentloaded" });
    const skip = p.locator("[data-skip-arrival]");
    if (await skip.isVisible()) {
      await skip.click();
      await ready(p);
    } else throw new Error("Skip intro missing");
    await p.goto(base, { waitUntil: "domcontentloaded" });
    await p.keyboard.press("Escape");
    await ready(p);
    results.push({
      width,
      passed: [
        "fresh/stale hash",
        "scroll lock",
        "credentials navigation and modal",
        "refresh",
        "query/history-state preservation",
        "back/forward",
        "skip",
        "Escape",
        "overflow",
      ],
    });
    await ctx.close();
  }
  const reduced = await browser.newPage({ reducedMotion: "reduce" });
  await reduced.goto(base + "/#credentials");
  await ready(reduced);
  assert.equal(await reduced.locator(".arrival-overlay:visible").count(), 0);
  await credentials(reduced);
  await reduced.close();
  results.push({ reducedMotion: "bypassed, hero at zero, navigation works" });
  const failure = await browser.newPage();
  await failure.route("**/src/**", (route) => route.abort());
  await failure.goto(base + "/#credentials", { waitUntil: "domcontentloaded" });
  await failure.waitForTimeout(4500);
  assert.equal(await failure.evaluate(() => document.documentElement.dataset.arrival), "done");
  assert.equal(
    await failure.evaluate(() => getComputedStyle(document.documentElement).overflow),
    "visible",
  );
  assert.equal(await failure.evaluate(() => scrollY), 0);
  results.push({ failure: "blocked hydration releases lock" });
  await failure.close();
  const secondary = await browser.newPage();
  await secondary.goto(base + "/missing-page#section");
  assert.equal(new URL(secondary.url()).hash, "#section");
  assert.equal(await secondary.evaluate(() => window.__homepageArrival), undefined);
  results.push({ secondary: "no homepage gate or hash removal" });
  await secondary.close();
  assert.deepEqual(errors, []);
  await fs.writeFile(out + "/test-results.json", JSON.stringify({ results, errors }, null, 2));
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
