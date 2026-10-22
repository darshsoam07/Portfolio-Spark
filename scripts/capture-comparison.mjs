import { chromium } from "playwright";
import { pathToFileURL } from "node:url";
import path from "node:path";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1920, height: 1000 } });
await p.goto(pathToFileURL(path.resolve("artifacts/fidelity/comparison.html")).href);
await p.screenshot({ path: "artifacts/fidelity/comparison-desktop.png" });
console.log(
  "Comparison images:",
  await p.locator("img").evaluateAll((es) => ({
    total: es.length,
    broken: es.filter((e) => !e.naturalWidth).map((e) => e.src),
  })),
);
await b.close();
