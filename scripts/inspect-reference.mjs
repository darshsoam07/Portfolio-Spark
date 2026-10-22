import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto("https://samaymaurya.com/", { waitUntil: "networkidle" });
await page.waitForTimeout(6000);
await page.screenshot({ path: "artifacts/reference-1440.png" });
console.log(
  await page.locator("h1,h2,nav").evaluateAll((es) =>
    es.map((e) => ({
      text: e.textContent,
      font: getComputedStyle(e).fontFamily,
      size: getComputedStyle(e).fontSize,
      rect: e.getBoundingClientRect().toJSON(),
    })),
  ),
);
await page.waitForTimeout(6000);
await page.screenshot({ path: "artifacts/reference-full.png", fullPage: true });
for (const width of [1024, 768, 390]) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto("https://samaymaurya.com/", { waitUntil: "networkidle" });
  await page.waitForTimeout(6000);
  await page.screenshot({ path: `artifacts/reference-${width}.png` });
}
await browser.close();
