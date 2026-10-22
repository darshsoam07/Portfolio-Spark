# Portfolio redesign — implementation and verification

## Scope and baseline

Local implementation on `codex/reference-portfolio`. Baseline commit: `b3887710183eb9d2a0c078237dfb7625a8c3e93f` (the clean original `main`). No commits were rewritten, no push was made, and no production deployment was performed. Original portfolio components and data remain available; the home route now mounts the editorial implementation.

The checkout uses React 19, TypeScript, TanStack Start/Router, Vite 8, Tailwind 4, GSAP, Motion, and Lenis. The redesign uses GSAP for entrance/pinned motion, CSS for hover states, and native anchors/dialogs for navigation. The former intro gate and global Lenis hook are no longer mounted. Server/API routes and existing MCP tools remain intact.

## Reference inspection

Inspected the actual https://samaymaurya.com/ in Chromium, not the surrounding Wall of Portfolios interface. Also inspected https://www.wallofportfolios.in/portfolios/samay/. Captured the actual reference at 1440, 1024, 768, and 390px and inspected the work, about, and footer sections. Screenshots live in the ignored `artifacts/` directory.

Verified characteristics:

- Warm off-white paper background (rendered reference `rgb(241, 240, 235)`), dark olive-black type, vermilion accents.
- DM Sans for body and large first name; Instrument Serif for italic greetings and editorial headings; handwritten annotations.
- Desktop navigation in a roughly 89%-width container, 77px tall. At 1440px the reference name is 237.6px and navigation is 15px.
- Greeting/name on the left, three tilted photo prints on the right. Mobile moves the photo strip below the name and stacks the introduction.
- Introductory statement and an experience strip, a long VR transition, dark featured projects, light filtered UI snippets, a browser-window About section, then a mountain illustration and contact footer.
- Desktop featured work is a scroll-driven horizontal gallery. The mobile presentation becomes vertical.
- About contains multiple selectable tabs; the reference also progresses through them while scrolling.
- Photo selection changes stacking order; project hover states, a playful cat button, and a reading-progress rail add interaction.
- An orange initial loading screen and optional ambient sound are present.

Timing is estimated from observation, not extracted from the reference implementation. Photo movement feels approximately 250–400ms; entrance motion approximately 600–1000ms. Pinned project movement is scroll-driven rather than fixed-duration. The reference's VR sequence, sound choreography, and full tab-scroll timeline were not quantitatively measured.

## Implemented adaptation

- Paper palette, typography families, hierarchy, navigation, large lowercase name, three overlapping prints, handwritten captions, and orange accents.
- Darsh's supplied portrait. Two original code-native prints represent cloud engineering and automation; no other person's photos or biography are reused.
- Orange welcome wipe (1.3s, CSS cubic-bezier), GSAP entrance (0.85s, 0.1s stagger, power3.out), photo selection/hover (0.35s), and desktop pinned gallery (linear movement with 0.6s scrub). All animation respects reduced motion.
- Three project presentations with native modal summaries, repository links, focus containment, Escape dismissal, and focus restoration.
- A five-category toolkit adapts the reference's filtered snippets section to verified engineering skills. Keyboard arrow/Home/End navigation is supported.
- Browser-styled About tabs contain biography, project log, education, and credentials. Certificate images open directly.
- Mountain line illustration and two-column contact treatment. The graphic is decorative; no mountaineering history or achievement is attributed to Darsh.
- Accessible navigation, skip link, visible keyboard focus, responsive layout, reduced-motion vertical gallery, and a progress indicator.
- No JavaScript is required to read the main content. Horizontal gallery layout is enabled only after hydration.

## Content provenance

Existing `src/data/portfolioData.ts` supplies identity, contact links, skills, education, credentials, and expense-tracker details. The original portrait is `src/assets/darsh.jpeg`.

Additional verified sources:

- https://github.com/darshsoam07/FailureLab/blob/main/README.md — fault injection, deterministic SLO guards, distributed Python services, AI-assisted analysis. Its future orchestration roadmap is not presented as delivered functionality.
- https://github.com/darshsoam07/QueryVault-Project/blob/main/README.md — hybrid retrieval, evidence gates, citations, durable ingestion, and tenant isolation.
- https://github.com/darshsoam07/Expense-Tracker-with-Insights — direct project link replaces the generic profile link.
- https://github.com/darshsoam07/DSA-in-Java- — additional work link.

The repository has no `public/resume.pdf`. Resume actions therefore open an explicitly labelled email request instead of linking to a missing file. No experience, project results, testimonials, or metrics were invented. Architecture illustrations are presentation graphics, not screenshots or live telemetry.

## Important files

- `src/components/editorial/EditorialPortfolio.tsx`: integrated page, project artwork, interactions, dialog, and motion.
- `src/data/selectedWork.ts`: source-verified project summaries and direct links.
- `src/styles.css`: editorial design system and responsive styling.
- `src/routes/index.tsx`: actual home-route integration.
- `src/routes/__root.tsx`: fonts, favicon/canonical, theme, and removal of the old blocking intro/global scrolling.
- `public/favicon.svg`: personalized paper/ink/orange mark.
- `vite.config.ts`: explicit Nitro Vercel preset; retains Lovable/TanStack configuration.
- `scripts/verify-portfolio.mjs`: reproducible four-width browser suite and screenshots.
- `scripts/inspect-reference.mjs`, `scripts/reference-sections.mjs`: reference captures.
- `scripts/check-links.mjs`: public external-link checks.
- `.prettierrc`, `eslint.config.js`, `.gitignore`: Windows line-ending support and generated-output exclusions.

Legacy fixes: removed an invalid Motion easing cast; added the missing `disabled` prop to MagneticButton; added `layers` to the topology icon union. A few retained legacy files received automatic formatting fixes to make the existing lint command pass. No legacy source components were deleted.

## Verification

Commands executed:

| Command                                                                   | Result                                                                                                                                                   |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm ls --depth=0`                                                        | Existing dependency tree resolved.                                                                                                                       |
| `npm install -D @playwright/test --fetch-retries=0 --fetch-timeout=20000` | Installed browser-test tooling and updated lockfile.                                                                                                     |
| `npx tsc --noEmit` / `node node_modules/typescript/bin/tsc --noEmit`      | Passed after repairing the three legacy type issues.                                                                                                     |
| `npm run lint`                                                            | Initially failed on baseline formatting/line endings; fixed.                                                                                             |
| `node node_modules/eslint/bin/eslint.js . --fix`                          | Passed with 0 errors, 2 existing warnings (ArrivalTunnel effect dependency and SystemsTopology Fast Refresh export).                                     |
| `npm run build`                                                           | Passed.                                                                                                                                                  |
| `node node_modules/vite/bin/vite.js build`                                | Passed with explicit Vercel output.                                                                                                                      |
| `node scripts/verify-portfolio.mjs`                                       | Responsive, interaction, keyboard, reduced-motion, image, anchor, and console checks. Machine-readable latest results: `artifacts/browser-results.json`. |
| `node scripts/check-links.mjs`                                            | Five GitHub URLs returned 200. LinkedIn returned 999 (automated-access blocked).                                                                         |

Browser checks cover 1440/1024/768/390px, SSR HTTP 200, visible content, horizontal overflow, photo toggling, project modal open/close, keyboard focus, filters, About tabs, certificate links, image load success, and valid section anchors. Reduced motion disables the welcome wipe and pinned gallery. Screenshots include each first viewport, work, toolkit, About, contact, and full-page layout. A full-page screenshot cannot show every frame of a pinned animation; section captures supplement it.

Initial automated failures were not counted as passes. The test first clicked before client hydration completed; an explicit hydration wait fixed that race. A later gallery keyboard test found that `overflow:hidden` allowed native focus to scroll the transformed container; `overflow:clip` prevents that competing scroll.

## Visual fidelity and remaining differences

The hero, paper/ink/orange palette, font families, print treatment, dark project gallery, browser-window About, and illustrated footer follow the observed reference. Desktop hero spacing and mobile photo spacing were adjusted after side-by-side screenshot inspection.

This is not pixel-perfect. Differences are deliberate or documented:

- The reference's three personal/travel photos become one authentic portrait plus two engineering prints.
- UI screenshots become original engineering illustrations and a toolkit; the supplied repositories do not include a complete set of production screenshots.
- The reference's 3D VR-headset tunnel is simplified to a server illustration transition. Ambient sound and the animated cat are not reproduced.
- The About panel uses explicit tabs/next rather than the reference's long scroll-scrubbed tab sequence. No travel or personal-hobby content was fabricated.
- Project detail opens in an accessible dialog instead of reproducing the reference's separate case-study routes.
- The welcome animation is a short CSS wipe rather than a literal asset-progress counter.
- LinkedIn availability requires a human browser check because of HTTP 999. Email delivery and receipt cannot be tested without sending a message; none was sent.
- Font downloads depend on Google Fonts; local system/Georgia fallbacks remain available.
- npm reported 20 dependency advisories (including high/critical) during installation. Broad dependency upgrades were not applied as part of this design change; review before production release.

## Preview and deployment

```powershell
npm run dev -- --host 127.0.0.1 --port 8082
# Open http://127.0.0.1:8082/
npm run typecheck
npm run lint
npm run test:browser
npm run build
```

If Playwright's browser is not installed on a different machine, run `npx playwright install chromium`. On this machine, existing Chromium was reused via `PLAYWRIGHT_BROWSERS_PATH=C:/Users/daksh/AppData/Local/ms-playwright` for tool-driven verification. Set `PREVIEW_URL` to test another local port.

Vercel build output is generated in `.vercel/output` with a Node.js 24 server function and static assets. This verifies packaging, not a live Vercel deployment. Production publishing still requires the owner's approval. No secrets or environment configuration were changed.
