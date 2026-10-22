# Arrival navigation and reference audit — 22 October 2026

## Result
Fresh homepage documents, reloads and stale homepage fragments now reveal Darsh Soam at scrollY = 0. Intentional section navigation remains available after arrival. Same-document history uses TanStack; full-document Back restores its saved position after GSAP has created pin spacing. No push or deployment was performed.

## Root cause
The active editorial redesign used only a 1.3-second CSS `.welcome-wash`. It had no scroll lifecycle, lock, completion handler or skip control. A native `#credentials` target and TanStack's enabled scroll restoration could therefore determine the initial viewport. Hero animation ran underneath the overlay. The older Three.js `ArrivalTunnel` still exists as unused source; it is not mounted by this redesign. No active Lenis gate was involved.

A second issue surfaced in testing: native hash entries may contain custom history state without a TanStack key. The installed history package overwrites such state while assigning its initial key. The router setup now merges that state back before subscribing. An additional full-document Back test found restoration occurring before GSAP pin spacing; a pagehide snapshot and one post-layout restoration address that case without applying fresh-load resets to Back.

## Implementation
- A static head bootstrap runs before body/hash targeting and hydration, only on `/`. It preserves pathname, query and history state while removing stale fragments on fresh loads. Native restoration is manual.
- Fresh visits suppress the router's initial scroll restoration, including reduced-motion visits. Subsequent router renders and intentional anchors retain normal behavior.
- The arrival locks document scrolling; background siblings become inert while hydrated. Completion, native Skip Intro, Escape, reduced-motion changes and a four-second fallback all release the gate. The fallback works even when hydration scripts fail.
- The overlay unmounts after completion. Hero text reveals then, with GSAP cleanup scoped to its context. There is no periodic scroll-to-top loop.
- Full-document Back/Forward is deliberately distinguished from a fresh navigation/reload: no intro replay or hash clearing. A saved position is restored once after pin setup. Secondary paths receive no homepage gate.
- The intro uses original SVG lettering for **Darsh Soam**, typographic guides, an outline-to-fill transition, a settling decorative dot, a percentage flourish and generated grain. The percentage represents the entrance sequence, not measured network download progress. The coral panel exits upwards over 2.4 seconds total. Desktop corner text becomes a simpler mobile composition; Skip Intro remains touch-sized.
- Reduced motion bypasses the overlay. No new package or WebGL context is introduced. The decorative counter is bounded, and timers/frames are cleaned up on unmount.

## Reference evidence
Actual reference: https://samaymaurya.com/ . Listing: https://www.wallofportfolios.in/portfolios/samay/ . The listing iframe points to the actual site.

Captured desktop (1440×900), mobile (390×844), reduced-motion frames and video. Evidence is in `artifacts/arrival/`:
- `reference-desktop-600.png`: textured orange/coral panel, upper corner labels, bottom-left percentage and bottom-right profession.
- `reference-lettering-0.png`: visible SVG name/letter construction phase, baseline/x-height/descender guides and dot outline.
- `reference-name-drawing.png`: upward panel exit revealing the cream hero underneath.
- `reference-mobile-300.png`: mobile composition with left labels/counter and right labels omitted.
- `reference-reduced-600.png`: simplified loader still appears under reduced motion.
- `reference-audit.json`, `reference-frames.json`, captured DOM and `reference-video/`: observation records.

The public bundle loaded by the reference was also inspected to resolve timing that sparse screenshots could not establish. It confirms a 2D DOM/SVG Motion implementation: font-ready wait with a 700 ms fallback, line drawing, staggered letter fill, a spring-settled dot, a 2.3-second counter, a 2.5-second draw period and a 0.9-second upward exit. Reduced motion uses a short counter and opacity exit. Its texture has stepped CSS movement. Pointer movement during the intro showed no verified pointer-controlled camera/parallax; no such handler exists in the inspected loader. WebGL elsewhere in the site is not evidence that this entrance is 3D.

## Deliberate differences
The local intro is shorter, uses the established #e75b35 palette and Darsh's full title-case name, uses locally generated grain rather than the reference's image, and fills the name together instead of reproducing every staggered letter. It adds Skip Intro/Escape and completely bypasses the loader for reduced motion. No visitor count, sound effect, personal reference asset or unverified pointer effect was copied. This is a reference-informed adaptation, not a pixel-identical reproduction. Browser/network/font timing can change which intermediate frames are visible.

## Exact application files changed in this task
1. `src/lib/homepage-arrival.ts` — new early lifecycle/bootstrap and history snapshot.
2. `src/routes/__root.tsx` — insert the static bootstrap before head content; allow the deliberate HTML startup attribute.
3. `src/router.tsx` — initial restoration policy and existing history-state preservation.
4. `src/components/editorial/EditorialPortfolio.tsx` — mount arrival component, sequence hero reveal, restore full-document history after pins.
5. `src/components/editorial/HomepageArrival.tsx` — new accessible arrival component and cleanup.
6. `src/components/editorial/HomepageArrival.css` — new scoped arrival motion, grain, SVG and responsive styles.

Added verification/audit scripts: `scripts/capture-arrival-reference.mjs`, `scripts/inspect-arrival-reference.mjs`, `scripts/check-arrival.mjs`, `scripts/verify-arrival.mjs`, `scripts/verify-arrival-history.mjs`. This report: `docs/ARRIVAL_NAVIGATION_AUDIT.md`. Generated screenshots, videos, source observations and exploratory scripts are under the ignored `artifacts/arrival/` folder. Existing unrelated uncommitted files were preserved; `src/styles.css` and credential/project content were not edited in this task.

## Verification
- `npm run typecheck` — pass.
- `npm run lint` — pass, with two pre-existing warnings in unused legacy `ArrivalTunnel.tsx` and `SystemsTopology.tsx`.
- `npm run build` — pass (existing Vite tsconfig-paths advisory).
- `node scripts/verify-arrival.mjs` — fresh/stale hash, refresh from Credentials, intentional navigation/modal, query and custom state preservation, scroll lock, skip, Escape, in-document Back/Forward and overflow at 1440, 1024, 768 and 390 px; reduced-motion bypass, blocked-hydration fallback and secondary-route isolation. No page/console errors in the normal journeys.
- `node scripts/verify-arrival-history.mjs` — full-document Back to Credentials, runtime reduced-motion change, mobile touch skip.
- `npm run test:browser` — existing project dialogs, focus containment, filters, About tabs, credentials entry, local links, hero/collage separation and overflow at 1440, 1920, 1024, 768 and 390 px; reduced-motion checks.
- `node scripts/verify-static-render.mjs` — no-JavaScript hero and gallery containment.

Final screenshots: `final-1440-lettering.png`, `final-390-lettering.png`, `final-1440-exit.png`, `final-390-exit.png`, `local-1440-refresh.png`, `local-390-refresh.png`. Journey recordings: `local-video/`. Machine-readable results: `test-results.json`, `additional-results.json`. The local browser preview was opened at `/` and visually verified at the hero.

Testing used installed Chromium and emulated mobile/reduced-motion settings. Safari, Firefox and physical mobile devices were not tested.

