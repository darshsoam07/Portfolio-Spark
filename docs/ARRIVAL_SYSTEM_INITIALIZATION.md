# Reference recording observations — before implementation

Source: `C:\Users\daksh\Videos\Screen Recordings\Screen Recording 2026-10-22 221955.mp4`, 28.7 s, 1918×1012. Extracted the final segment at 200 ms intervals; overview and detailed contact sheets are in `artifacts/arrival-v2/`.

- 21.0 s: cream browser content before the coral overlay.
- 21.2–23.4 s: coral overlay, small corner labels, bottom-left 000%; a visible initialization/font wait.
- 23.8 s: 008%, thin horizontal/vertical guides begin drawing.
- 24.2 s: 045%, additional guide geometry and an initial letter contour.
- 24.6 s: 078%, recognizable outlined name and circle construction.
- 25.0 s: 093%, solid name fills from the left while outlines remain on the right.
- 25.4 s: 099%, nearly complete solid name.
- 25.8 s: 100%, solid name and settled dark dot.
- 26.2 s: name fades/moves upward as the coral panel starts lifting.
- 26.6 s: cream hero largely visible; coral reduced to the upper strip.
- 27.0–28.7 s: hero and collage visible at the top.

This is evidence of flat SVG/DOM drafting and typography motion, not a 3D tunnel. The cursor remains near the center; the recording does not establish pointer-responsive motion, so no pointer effect is required. Browser chrome is retained in the reference frames. Earlier chat/switcher content in the recording is unrelated to the design and was not used as instruction.

Original direction: “Darsh / System Initialization”. Use two-line name typography, an asymmetric infrastructure rail with three connected nodes, a framed identity block, engineering annotations, and a synchronized visual sequence counter. Keep coral/cream/charcoal. Use one GSAP timeline, no new package or WebGL. Normal target duration ~3.2 s after readiness, bounded font readiness and startup watchdog. Existing hero layout, content and navigation policy remain.

## Implemented choreography

One scoped GSAP timeline draws the original infrastructure frame and BUILD / DEPLOY / OBSERVE rail, reveals outlined two-line typography, wipes to solid lettering, settles the decorative dot, and lifts the coral panel while the hero reveal begins. Nominal duration is 3.2 seconds. The percentage labels visual sequence progress, not measured resource loading.

A preloaded local DM Sans face (SIL OFL included) prevents outline/fill mismatch. A 300 ms font budget bypasses the sequence if the face is unavailable. The existing four-second document watchdog remains authoritative; delayed hydration cannot retain the scroll lock. Skip, Escape, touch and reduced motion share the existing completion path. Normal anchor navigation and history restoration remain intact.

SVG nodes and the dot use opacity reveals rather than CSS scale transforms: visual inspection caught browser transform-origin offsets, which have been corrected.

## Files changed for this task

- src/components/editorial/HomepageArrival.tsx
- src/components/editorial/HomepageArrival.css
- src/components/editorial/EditorialPortfolio.tsx
- src/lib/homepage-arrival.ts
- src/routes/__root.tsx
- public/fonts/dm-sans-600.ttf
- public/fonts/DM-Sans-OFL.txt
- scripts/verify-portfolio.mjs (wait for arrival completion before settled screenshots)
- scripts/verify-arrival-loading.mjs (new delayed-resource regression)
- docs/ARRIVAL_SYSTEM_INITIALIZATION.md

## Verification — 23 October 2026

- npm run typecheck: passed.
- npm run build: passed, Vercel production output generated locally; no deployment performed.
- npm run lint: zero errors; two existing warnings in legacy ArrivalTunnel.tsx and SystemsTopology.tsx. Targeted ESLint on changed application files and verification scripts passed.
- node scripts/verify-arrival.mjs: passed at 1440, 1024, 768 and 390 widths. Fresh/stale hashes, refresh, credentials navigation/modal, query/history state, back/forward, scroll lock, Skip, Escape and overflow checked. Reduced motion, blocked hydration watchdog and secondary routes passed.
- node scripts/verify-arrival-history.mjs: passed full-document history restoration, reduced-motion change during intro and mobile tap skip.
- node scripts/verify-arrival-loading.mjs: passed with font and JavaScript requests held until a five-second network release. Verified unlocked page, hero at zero, eventual hydration and no page errors. Initial test delayed every dependency independently and exceeded the hydration assertion timeout; revised test uses a bounded network outage instead.
- npm run test:browser: passed at 1440, 1920, 1024, 768 and 390 widths, plus reduced motion. Name/collage separation, project dialogs, focus containment, skill filters, About tabs, credential links, images, contact links and anchors passed. No runtime errors reported.
- Desktop and mobile intro/hero screenshots inspected. Local preview opened in the in-app browser.

Evidence: artifacts/arrival-v2/intro-1440.png, intro-390.png, hero-1440.png, hero-390.png, videos/, slow-loading-results.json. Reference contact sheet: reference-sequence.jpg. Existing suites retain their reports under artifacts/arrival and artifacts/refinement.

Limitations: automated interaction tests used Chromium; no physical iOS/Safari device testing. Slow-load behavior deliberately bypasses the animation to prioritize usable content. Production remains unchanged; no push or deployment was performed for this task.
