import { chromium } from "playwright";
import fs from "node:fs/promises";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("https://samaymaurya.com/", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(8000);
console.log(
  await p.locator("h1,h2,section,canvas").evaluateAll((es) =>
    es.map((e) => ({
      tag: e.tagName,
      id: e.id,
      class: e.className,
      text: e.textContent.slice(0, 80),
    })),
  ),
);
await fs.writeFile("artifacts/fidelity/reference-dom.html", await p.content());
await b.close();
