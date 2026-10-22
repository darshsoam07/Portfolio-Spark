import { chromium } from "playwright";
import fs from "node:fs/promises";
const b = await chromium.launch();
const results = [];
for (const [width, height] of [
  [1440, 900],
  [1920, 1080],
  [768, 1024],
  [390, 844],
]) {
  const p = await b.newPage({
    viewport: { width, height },
    hasTouch: width === 390,
    isMobile: width === 390,
  });
  await p.goto("https://samaymaurya.com/", { waitUntil: "domcontentloaded" });
  await p.waitForTimeout(8000);
  const sels = [
    ".hero-nav",
    ".hero-stage",
    ".hero-intro",
    ".hero-name",
    ".hero-pinboard",
    ".hero-polaroid",
    ".hero-foot",
    ".hero-context",
    ".intro",
    ".intro-stage",
    ".work-stage",
    ".work-card",
    ".work-card-media",
    ".summit-inner",
    ".editorial-heading",
    ".summit-lanes",
    ".browser-section",
    ".about-head",
    ".about-note",
    ".browser",
    ".browser-tabs",
    ".browser-toolbar",
    ".page-about-photo",
    ".page-about-copy",
    ".footer-inner",
    ".footer-title",
    ".footer-email",
  ];
  const measured = [];
  for (const sel of sels) {
    if (await p.locator(sel).count())
      measured.push(
        await p
          .locator(sel)
          .first()
          .evaluate((e, selector) => {
            const s = getComputedStyle(e);
            return {
              selector,
              rect: e.getBoundingClientRect().toJSON(),
              font: s.fontFamily,
              size: s.fontSize,
              weight: s.fontWeight,
              line: s.lineHeight,
              tracking: s.letterSpacing,
              padding: s.padding,
              margin: s.margin,
              gap: s.gap,
              display: s.display,
              columns: s.gridTemplateColumns,
              background: s.backgroundColor,
              color: s.color,
              border: s.border,
              radius: s.borderRadius,
              shadow: s.boxShadow,
              transition: s.transition,
              position: s.position,
            };
          }, sel),
      );
  }
  for (const [label, sel] of [
    ["intro", ".intro"],
    ["toolkit", ".summit-inner"],
  ]) {
    await p
      .locator(sel)
      .evaluate((e) =>
        scrollTo({ top: scrollY + e.getBoundingClientRect().top, behavior: "instant" }),
      );
    await p.waitForTimeout(1400);
    await p.screenshot({ path: `artifacts/fidelity/before/reference-${width}-${label}.png` });
  }
  await p.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await p.waitForTimeout(1000);
  const nav = await p
    .locator(".hero-nav a")
    .evaluateAll((es) => es.map((e) => ({ text: e.textContent, href: e.getAttribute("href") })));
  await p.locator(".hero-polaroid").first().hover();
  await p.waitForTimeout(500);
  await p.screenshot({ path: `artifacts/fidelity/before/reference-${width}-photo-hover.png` });
  results.push({
    width,
    height,
    measured,
    nav,
    menuButtons: await p.getByRole("button", { name: /menu/i }).count(),
  });
  await p.close();
  console.log("detail", width);
}
await fs.writeFile("artifacts/fidelity/reference-details.json", JSON.stringify(results, null, 2));
await b.close();
