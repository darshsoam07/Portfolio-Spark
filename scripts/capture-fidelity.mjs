import { chromium } from "playwright";
import fs from "node:fs/promises";
const phase = process.argv[2] || "before";
const out = `artifacts/fidelity/${phase}`;
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch();
const report = [];
for (const [width, height] of [
  [1440, 900],
  [1920, 1080],
  [768, 1024],
  [390, 844],
]) {
  for (const [site, url] of phase === "before"
    ? [
        ["reference", "https://samaymaurya.com/"],
        ["local", "http://127.0.0.1:8082/"],
      ]
    : [["local", "http://127.0.0.1:8082/"]]) {
    const context = await browser.newContext({
      viewport: { width, height },
      isMobile: width === 390,
      hasTouch: width === 390,
      ...(width === 1440 ? { recordVideo: { dir: out, size: { width, height } } } : {}),
    });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: "networkidle", timeout: 120000 });
    if (site === "local")
      await page.locator('.editorial-site[data-hydrated="true"]').waitFor({ timeout: 60000 });
    await page.waitForTimeout(site === "reference" ? 8000 : 2000);
    await page.screenshot({ path: `${out}/${site}-${width}-hero.png` });
    const data = await page
      .locator("header,nav,main > section,main > footer, h1,h2")
      .evaluateAll((es) =>
        es.map((e) => {
          const s = getComputedStyle(e);
          return {
            tag: e.tagName,
            id: e.id,
            class: e.className,
            text: e.textContent?.slice(0, 100),
            rect: e.getBoundingClientRect().toJSON(),
            font: s.fontFamily,
            size: s.fontSize,
            line: s.lineHeight,
            tracking: s.letterSpacing,
            color: s.color,
            background: s.backgroundColor,
            padding: s.padding,
            gap: s.gap,
            display: s.display,
            columns: s.gridTemplateColumns,
            radius: s.borderRadius,
            shadow: s.boxShadow,
            position: s.position,
            transition: s.transition,
          };
        }),
      );
    report.push({ site, width, height, data });
    if (width >= 1440) {
      for (let i = 0; i <= 10; i++) {
        await page.evaluate(
          (p) =>
            scrollTo({
              top: (document.documentElement.scrollHeight - innerHeight) * p,
              behavior: "instant",
            }),
          i / 10,
        );
        await page.waitForTimeout(800);
        await page.screenshot({ path: `${out}/${site}-${width}-scroll-${i * 10}.png` });
      }
    }
    const selectors =
      site === "local"
        ? [".work-intro", "#work", "#toolkit", "#experience", "#contact"]
        : ["#work", "#snippets", "#experience", "footer"];
    for (const selector of selectors) {
      const loc = page.locator(selector).first();
      if (await loc.count()) {
        await loc.evaluate((e) =>
          scrollTo({ top: scrollY + e.getBoundingClientRect().top, behavior: "instant" }),
        );
        await page.waitForTimeout(1200);
        await page.screenshot({
          path: `${out}/${site}-${width}-${selector.replace(/[.#]/g, "")}.png`,
        });
      }
    }
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await page
      .locator("nav a")
      .first()
      .hover()
      .catch(() => {});
    await page.screenshot({ path: `${out}/${site}-${width}-nav-hover.png` });
    await page.screenshot({ path: `${out}/${site}-${width}-full.png`, fullPage: true });
    await context.close();
    console.log(site, width, "captured");
  }
}
await fs.writeFile(`${out}/measurements.json`, JSON.stringify(report, null, 2));
await browser.close();
