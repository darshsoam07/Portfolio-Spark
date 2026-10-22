import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
await fs.mkdir("artifacts/refinement", { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];
const errors = [];
const base = process.env.PREVIEW_URL || "http://127.0.0.1:8082";
try {
  for (const [width, height] of [
    [1440, 900],
    [1920, 1080],
    [1024, 900],
    [768, 1024],
    [390, 844],
  ]) {
    const page = await browser.newPage({
      viewport: { width, height },
      hasTouch: width === 390,
      isMobile: width === 390,
    });
    page.on("pageerror", (e) => errors.push({ width, message: e.message }));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push({ width, message: m.text() });
    });
    const response = await page.goto(base, { waitUntil: "networkidle", timeout: 120000 });
    assert.equal(response.status(), 200);
    await expect(page.locator(".editorial-site")).toHaveAttribute("data-hydrated", "true", {
      timeout: 60000,
    });
    console.log("Testing", width);
    await page.waitForTimeout(1600);
    await page.screenshot({ path: `artifacts/refinement/local-${width}.png` });
    assert.equal(await page.locator("h1").count(), 1);
    assert.ok(await page.locator("h1").isVisible());
    assert.equal((await page.locator("h1").innerText()).replace(/\s+/g, " ").trim(), "Darsh Soam.");
    const nameBox = await page.locator(".hero-name").boundingBox();
    assert.ok(
      nameBox && nameBox.x >= 0 && nameBox.x + nameBox.width <= width,
      "Full name fits the viewport",
    );
    for (const photo of await page.locator(".polaroid").all()) {
      const box = await photo.boundingBox();
      assert.ok(
        box &&
          (box.x >= nameBox.x + nameBox.width ||
            box.x + box.width <= nameBox.x ||
            box.y >= nameBox.y + nameBox.height ||
            box.y + box.height <= nameBox.y),
        "Name and collage do not overlap",
      );
    }
    await expect(page.locator(".hero > .eyebrow")).toHaveText("DEVOPS & CLOUD ENGINEERING");
    await expect(page.locator(".project-repository")).toHaveCount(3);
    for (const link of await page.locator(".project-repository").all()) {
      assert.match(await link.getAttribute("href"), /^https:\/\/github\.com\/darshsoam07\//);
    }
    assert.equal(
      await page.getByRole("link", { name: "say hey", exact: true }).getAttribute("href"),
      "mailto:darshsoam2006@gmail.com",
    );
    assert.ok(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
      `Overflow at ${width}`,
    );
    await page
      .getByRole("button", { name: "Darsh's portrait — bring card forward", exact: true })
      .click();
    await expect(page.locator(".photo-0")).toHaveAttribute("aria-pressed", "true");
    await page.getByRole("link", { name: "work", exact: true }).click();
    await page.waitForTimeout(1400);
    await page.screenshot({ path: `artifacts/refinement/local-work-${width}.png` });
    await page.getByRole("button", { name: "Explore FailureLab", exact: true }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    assert.equal(
      await page.getByRole("link", { name: "Explore the repository" }).getAttribute("href"),
      "https://github.com/darshsoam07/FailureLab",
    );
    await page.keyboard.press("Tab");
    assert.ok(await page.evaluate(() => !!document.activeElement.closest("dialog")));
    await page.keyboard.press("Escape");
    await expect(page.locator(".project-dialog")).not.toBeVisible();
    if (width > 1024) {
      await page.keyboard.press("Tab");
      const secondRepository = page.getByRole("link", {
        name: "QueryVault repository on GitHub",
        exact: true,
      });
      await expect(secondRepository).toBeFocused();
      await page.waitForTimeout(1000);
      const repositoryBox = await secondRepository.boundingBox();
      assert.ok(
        repositoryBox && repositoryBox.x >= 0 && repositoryBox.x + repositoryBox.width <= width,
        "Keyboard reveals the next repository link",
      );
      await page.keyboard.press("Tab");
      const secondProject = page.getByRole("button", { name: "Explore QueryVault", exact: true });
      await expect(secondProject).toBeFocused();
      await page.waitForTimeout(1000);
      const box = await secondProject.boundingBox();
      assert.ok(
        box && box.x >= -1 && box.x + box.width <= width + 1,
        "Keyboard reveals the next pinned project",
      );
      await page.keyboard.press("Enter");
      await expect(page.getByRole("dialog")).toBeVisible();
      await page.keyboard.press("Escape");
    }
    await page.locator("#toolkit").scrollIntoViewIfNeeded();
    await page.getByRole("tab", { name: "Cloud", exact: false }).click();
    await page.keyboard.press("ArrowRight");
    await expect(page.locator("#skill-1")).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("heading", { name: "Docker", exact: true })).toBeVisible();
    await page.waitForTimeout(300);
    await page.screenshot({ path: `artifacts/refinement/local-toolkit-${width}.png` });
    await page.getByRole("link", { name: "about me", exact: true }).click();
    await page.getByRole("tab", { name: "education", exact: true }).click();
    await expect(
      page.getByText("B.Tech in Computer Science Engineering", { exact: true }),
    ).toBeVisible();
    await page.getByRole("tab", { name: "credentials", exact: true }).click();
    await expect(
      page.getByRole("link", { name: "Explore certifications & achievements" }),
    ).toBeVisible();
    await page.getByRole("tab", { name: "about me", exact: true }).click();
    await page.screenshot({ path: `artifacts/refinement/local-about-${width}.png` });
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.screenshot({ path: `artifacts/refinement/local-contact-${width}.png` });
    assert.ok(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
      `Bottom overflow at ${width}`,
    );
    const brokenImages = await page
      .locator("img")
      .evaluateAll((images) =>
        images.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src),
      );
    assert.deepEqual(brokenImages, []);
    const brokenAnchors = await page
      .locator('a[href^="#"]')
      .evaluateAll((links) =>
        links
          .map((a) => a.getAttribute("href"))
          .filter((h) => !document.getElementById(h.slice(1))),
      );
    assert.deepEqual(brokenAnchors, []);
    await page.screenshot({ path: `artifacts/refinement/local-full-${width}.png`, fullPage: true });
    results.push({
      width,
      height,
      status: "passed",
      checks: [
        "SSR 200",
        "full-name readability and collage separation",
        "direct repository and contact links",
        "no horizontal overflow",
        "photo selection",
        "project dialog and Escape",
        "dialog focus containment",
        "filter keyboard navigation",
        "about tabs",
        "certificate links",
        "images",
        "anchor targets",
      ],
    });
    await page.close();
  }
  const reduced = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  await reduced.goto(base, { waitUntil: "networkidle" });
  await expect(reduced.locator(".editorial-site")).toHaveAttribute("data-hydrated", "true", {
    timeout: 60000,
  });
  assert.equal(await reduced.locator(".pin-spacer").count(), 0);
  assert.equal(await reduced.locator(".welcome-wash").isVisible(), false);
  assert.ok(await reduced.locator("h1").isVisible());
  await reduced.keyboard.press("Tab");
  assert.equal(
    await reduced.locator(".skip-link").evaluate((e) => e === document.activeElement),
    true,
  );
  await reduced.keyboard.press("Enter");
  for (const title of ["FailureLab", "QueryVault", "Expense Tracker with Insights"]) {
    await reduced.getByRole("button", { name: `Explore ${title}`, exact: true }).click();
    await expect(reduced.getByRole("dialog")).toBeVisible();
    await reduced.keyboard.press("Escape");
  }
  results.push({
    mode: "reduced motion",
    status: "passed",
    checks: [
      "no pinned scrolling",
      "no loader",
      "visible content",
      "keyboard skip link",
      "all project dialogs",
    ],
  });
  await reduced.getByRole("tab", { name: "credentials", exact: true }).click();
  await expect(
    reduced.getByRole("link", { name: "Explore certifications & achievements" }),
  ).toBeVisible();
  const links = [
    `${base}/favicon.svg`,
    ...new Set(
      await reduced
        .locator("a")
        .evaluateAll((as) =>
          as.map((a) => a.href).filter((h) => h.startsWith(location.origin) && !h.includes("#")),
        ),
    ),
  ];
  for (const href of links) {
    const r = await reduced.request.get(href);
    assert.equal(r.status(), 200, href);
  }
  results.push({ localLinks: links.length, status: "passed" });
  await reduced.close();
  assert.deepEqual(errors, [], "Browser console/runtime errors");
  await fs.writeFile(
    "artifacts/refinement/browser-results.json",
    JSON.stringify({ results, errors }, null, 2),
  );
  console.log(JSON.stringify({ results, errors }, null, 2));
} finally {
  await browser.close();
}
