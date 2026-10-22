import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage();
p.on("pageerror", (e) => console.log("ERROR", e.message));
await p.goto("http://127.0.0.1:8082/#credentials");
await p.waitForTimeout(5000);
console.log(
  await p.evaluate(() => ({
    url: location.href,
    y: scrollY,
    gate: window.__homepageArrival,
    attr: document.documentElement.dataset.arrival,
    inert: document.querySelectorAll("[inert]").length,
  })),
);
await b.close();
