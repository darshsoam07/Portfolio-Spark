import { chromium } from "playwright";
import fs from "node:fs/promises";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
let results = [];
for (const url of [
  "https://www.wallofportfolios.in/portfolios/samay/",
  "https://darshsoam.vercel.app/",
]) {
  try {
    await p.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    results.push({
      url,
      title: await p.title(),
      text: (await p.locator("body").innerText()).slice(0, 16000),
      frames: p.frames().map((f) => f.url()),
    });
  } catch (e) {
    results.push({ url, error: e.message });
  }
}
await fs.mkdir("artifacts/fidelity", { recursive: true });
await fs.writeFile("artifacts/fidelity/content-references.json", JSON.stringify(results, null, 2));
console.log(results);
await b.close();
