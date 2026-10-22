import { chromium } from "playwright";
import fs from "node:fs/promises";
const out = "artifacts/arrival";
await fs.mkdir(out, { recursive: true });
const b = await chromium.launch();
const report = [];
for (const mode of ["desktop", "mobile", "reduced"]) {
  const context = await b.newContext({
    viewport: mode === "mobile" ? { width: 390, height: 844 } : { width: 1440, height: 900 },
    reducedMotion: mode === "reduced" ? "reduce" : "no-preference",
    recordVideo: { dir: out + "/reference-video" },
  });
  const p = await context.newPage();
  await p.goto("https://samaymaurya.com/", { waitUntil: "commit" });
  for (const delay of [100, 300, 600, 1000, 2000]) {
    await p.waitForTimeout(delay);
    await p.screenshot({ path: `${out}/reference-${mode}-${delay}.png` });
    report.push({
      mode,
      delay,
      data: await p.evaluate(() => ({
        text: document.body?.innerText.slice(0, 800),
        loaders: [
          ...document.querySelectorAll('[class*="load"],[class*="intro"],[class*="preloader"]'),
        ]
          .slice(0, 25)
          .map((e) => ({
            tag: e.tagName,
            class: e.className,
            text: e.textContent.slice(0, 300),
            style: getComputedStyle(e).cssText,
            rect: e.getBoundingClientRect().toJSON(),
            transform: getComputedStyle(e).transform,
            background: getComputedStyle(e).backgroundColor,
          })),
        canvases: document.querySelectorAll("canvas").length,
      })),
    });
  }
  await p.mouse.move(100, 100);
  await p.mouse.move(1100, 650, { steps: 15 });
  await p.screenshot({ path: `${out}/reference-${mode}-pointer.png` });
  await fs.writeFile(`${out}/reference-${mode}.html`, await p.content());
  await context.close();
}
const p = await b.newPage();
await p.goto("https://www.wallofportfolios.in/portfolios/samay/", {
  waitUntil: "domcontentloaded",
});
report.push({ listing: await p.locator("iframe").evaluateAll((es) => es.map((e) => e.src)) });
await fs.writeFile(out + "/reference-audit.json", JSON.stringify(report, null, 2));
await b.close();
