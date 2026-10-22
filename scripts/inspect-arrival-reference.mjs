import { chromium } from "playwright";
import fs from "node:fs/promises";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.addInitScript(() => {
  window.framesAudit = [];
  setInterval(() => {
    const el = document.querySelector(".loader");
    if (el)
      window.framesAudit.push({
        time: performance.now(),
        html: el.outerHTML,
        style: [el, ...el.querySelectorAll("svg,text,.loader-texture")].map((e) => ({
          tag: e.tagName,
          cls: e.getAttribute("class"),
          opacity: getComputedStyle(e).opacity,
          visibility: getComputedStyle(e).visibility,
          transform: getComputedStyle(e).transform,
          animation: getComputedStyle(e).animation,
          background: getComputedStyle(e).backgroundImage,
        })),
      });
  }, 100);
});
await p.goto("https://samaymaurya.com/", { waitUntil: "commit" });
await p.waitForSelector(".loader");
await p.mouse.move(100, 100);
await p.waitForTimeout(100);
await p.mouse.move(1200, 700);
await p.screenshot({ path: "artifacts/arrival/reference-pointer-during-intro.png" });
await p.waitForTimeout(4000);
await fs.writeFile(
  "artifacts/arrival/reference-frames.json",
  JSON.stringify(await p.evaluate(() => window.framesAudit), null, 2),
);
await b.close();
