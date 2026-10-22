import fs from "node:fs/promises";
const groups = [
  ["Hero desktop", 1440, "hero", "hero"],
  ["Wide hero", 1920, "hero", "hero"],
  ["Work", 1440, "work", "work"],
  ["About", 1440, "experience", "experience"],
  ["Toolkit", 768, "toolkit", "toolkit"],
  ["Mobile hero", 390, "hero", "hero"],
  ["Contact", 390, "footer", "contact"],
];
let html = `<!doctype html><html lang="en"><meta charset="utf-8"><title>Darsh Soam — reference comparison</title><style>body{margin:24px;background:#e3e2dc;color:#252820;font:15px Arial}h1{font-size:26px}section{margin:32px 0} .grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}figure{margin:0}img{width:100%;height:auto;display:block}figcaption{padding:12px;background:white;font-weight:bold}a{color:inherit}p{max-width:900px;line-height:1.6}</style><h1>Reference / Before / Final</h1><p>Captured at identical viewport dimensions. Source images are unmodified. Personalized content and pinned-section lengths differ; compare section geometry rather than overall page length. Click an image to inspect the original capture.</p>`;
for (const [label, w, ref, local] of groups) {
  html += `<section><h2>${label} · ${w}px</h2><div class="grid">`;
  for (const [title, path] of [
    ["Reference", `before/reference-${w}-${ref}.png`],
    ["Before", `before/local-${w}-${local}.png`],
    ["Final", `final/local-${w}-${local}.png`],
  ])
    html += `<figure><figcaption>${title}</figcaption><a href="${path}"><img src="${path}" alt="${title} ${label}"></a></figure>`;
  html += "</div></section>";
}
await fs.writeFile("artifacts/fidelity/comparison.html", html);
