import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
const b = await chromium.launch();
const results = [];
for (const kind of ["font", "hydration"]) {
  const c = await b.newContext();
  const p = await c.newPage();
  const errors = [];
  p.on("pageerror", (e) => errors.push(e.message));
  const releaseAt = Date.now() + 5000;
  await p.route(kind === "font" ? "**/fonts/dm-sans-600.ttf" : "**/src/**", async (r) => {
    await new Promise((resolve) => setTimeout(resolve, Math.max(0, releaseAt - Date.now())));
    await r.continue().catch(() => {});
  });
  await p.goto("http://127.0.0.1:8082/#credentials", { waitUntil: "domcontentloaded" });
  await p.waitForFunction(
    () => document.documentElement.dataset.arrival === "done",
    {},
    { timeout: 6000 },
  );
  assert.equal(await p.evaluate(() => scrollY), 0);
  assert.equal(new URL(p.url()).hash, "");
  await expect(p.locator(".editorial-site")).toHaveAttribute("data-hydrated", "true", {
    timeout: 30000,
  });
  await p.waitForTimeout(1800);
  assert.equal(await p.locator("[data-arrival-inert]").count(), 0);
  assert.deepEqual(errors, []);
  results.push({ kind, result: "passed" });
  await c.close();
}
await b.close();
await fs.writeFile(
  "artifacts/arrival-v2/slow-loading-results.json",
  JSON.stringify(results, null, 2),
);
console.log(results);
