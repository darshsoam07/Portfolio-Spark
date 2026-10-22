import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto("https://samaymaurya.com/");
await page.waitForTimeout(8000);
for (const [name, selector] of [
  ["work", "#work"],
  ["about", "#experience"],
  ["footer", "footer"],
]) {
  const el = page.locator(selector);
  if (await el.count()) {
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `artifacts/reference-${name}.png` });
  }
}
console.log(
  await page.locator("body").evaluate((e) => ({
    background: getComputedStyle(e).backgroundColor,
    font: getComputedStyle(e).fontFamily,
  })),
);
await browser.close();
