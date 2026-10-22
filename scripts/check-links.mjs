import { request } from "@playwright/test";
import fs from "node:fs/promises";
const context = await request.newContext();
const urls = [
  "https://github.com/darshsoam07/FailureLab",
  "https://github.com/darshsoam07/QueryVault-Project",
  "https://github.com/darshsoam07/Expense-Tracker-with-Insights",
  "https://github.com/darshsoam07/DSA-in-Java-",
  "https://github.com/darshsoam07",
  "https://www.linkedin.com/in/darsh-soam-42a605324",
];
const results = await Promise.all(
  urls.map(async (url) => {
    try {
      const r = await context.get(url, { timeout: 20000 });
      return { url, status: r.status() };
    } catch (e) {
      return { url, error: e.message.split("\n")[0] };
    }
  }),
);
await fs.mkdir("artifacts", { recursive: true });
await fs.writeFile("artifacts/external-links.json", JSON.stringify(results, null, 2));
console.log(results);
await context.dispose();
