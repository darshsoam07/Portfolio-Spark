# Antigravity Agent Brief — Arrival Intro Determinism Fix

> Task-scoped brief. Read this file completely before taking any action.
> Execute end to end. Stop only at the checkpoints defined in section 11.

---

## 0. How to use this document

You are acting as a senior frontend engineer and deployment-debugging specialist
working directly in this repository. This brief contains a **completed
diagnosis**, a **target design**, **hard constraints**, and a **verification
protocol**. Do not re-derive anything listed here as ground truth — it has
already been established by reading the full source.

If something in this brief contradicts what you actually observe in the code,
**trust the code**, state the contradiction explicitly, and stop at a checkpoint
rather than silently diverging from the plan.

The user is a beginner. Explain what you are doing in plain language. Never ask
them to make a technical judgement call that you can make yourself.

---

## 1. Mission

The arrival/intro animation ("TRANSIT SIGNAL // INITIALIZING", with a Skip Intro
/ ESC control) works in the dev server but is unreliable on the live deployment
at `https://darshsoam.vercel.app`.

**The animation logic itself is not the bug.** The identical code runs
differently in production, so the defect lies in lifecycle, hydration, or build
behaviour — not in the three.js render loop, the timings, or the easings.

The mission is complete when all of the following hold against a **production
build**:

1. The intro plays exactly once per browser session, start to finish.
2. On loads where the intro should not play, the portfolio renders immediately —
   with no flash of the overlay and no flash of the final state.
3. The page is never permanently black and never permanently scroll-locked, even
   if the JS bundle fails to load or throws.
4. The intro never replays on re-render.
5. No hydration errors or warnings in the browser console.
6. Zero changes to visual design, timing values, or easing curves.
7. It works with no scroll and no user interaction, on a throttled network, and
   at a 375px viewport.

---

## 2. Ground truth about this repo — do not re-derive

The user originally described this as a Next.js app. **It is not.** Any advice or
command involving `next dev`, `next build`, `next start`, `dynamic(..., { ssr:
false })`, `runtime = 'edge'`, or the Next.js App Router is inapplicable here.

| Fact | Value |
| --- | --- |
| Framework | TanStack Start + TanStack Router |
| Bundler | Vite 8 |
| Server build | Nitro (build-only) |
| React | 19.2 |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` |
| Animation libs | `motion` v12, `three` v0.185, `gsap` v3.15, `lenis` v1.3 |
| Scaffolded by | Lovable (`@lovable.dev/vite-tanstack-config`) |
| Host | Vercel, auto-deploying from GitHub |
| Package name | `tanstack_start_ts` |

Scripts in `package.json`: `dev` → `vite dev`, `build` → `vite build`,
`preview` → `vite preview`, `lint` → `eslint .`, `format` → `prettier --write .`

There is **no** `index.html`, no `next.config.*`, and no `runtime` export
anywhere in `src`. There is no `StrictMode` wrapper.

### Files that matter

| Path | Role |
| --- | --- |
| `src/routes/index.tsx` | Owns intro state, renders the overlay and the portfolio |
| `src/components/portfolio/ArrivalTunnel.tsx` | The intro overlay itself (three.js tunnel, ~519 lines) |
| `src/routes/__root.tsx` | `RootShell`, document head, pre-paint inline script |
| `src/styles.css` | The pre-hydration gating CSS |
| `src/lib/intro-gate.ts` | **New file** — the single source of truth for the intro decision |

### Identifiers and constants (must stay consistent)

- sessionStorage key: `portfolioIntroPlayed`
- Pre-paint HTML class: `intro-pending`
- Overlay element id: `arrival-tunnel`
- Portfolio wrapper id: `portfolio-root`
- Intro timings, **unchanged**: auto-finish `2800ms`, hard-stop safety `3800ms`,
  exit transition `700ms`, fail-safe class removal `6000ms`
- `RootShell` renders `<html lang="en" className="dark scroll-smooth">`

---

## 3. Hard constraints

1. **Smallest change that makes the trigger deterministic.** Nothing more.
2. **Do not modify files unrelated to the intro trigger and mount logic.** The
   allowed set is the five files in the table above. If you believe another file
   must change, stop at a checkpoint and explain why.
3. **Do not change any visual, timing, or easing value** unless it is strictly
   required for reliability. If it is, call it out explicitly.
4. **Do not touch the three.js internals** of the tunnel render loop.
5. Work on branch `fix/intro-deterministic-hydration`. Create it if absent.
6. **Never push to `main`. Never merge. Never deploy.** On this setup, a push to
   `main` deploys straight to the live site. Pushing the feature branch only
   creates a Vercel preview, and even that requires explicit approval.
7. Do not `git add -A` blindly. Stage only intended files.
8. Leave pre-existing unrelated issues alone (for example, `useMemo` is imported
   but unused in `ArrivalTunnel.tsx` — that predates this work; do not fix it).

---

## 4. Diagnosis already completed — do not re-investigate

Four defects stack on top of each other. Any fix must address all four.

### Defect 1 — a non-idempotent probe called four times, feeding two independent states

`isIntroRequired()` in `src/routes/index.tsx` was called three times (in the
`introActive` initializer, in the `portfolioRevealed` initializer, and in the
mount effect), and `isWebGLAvailable()` in `ArrivalTunnel.tsx` a fourth time.

Each call did `document.createElement("canvas").getContext("webgl")` and **never
released the context**. Browsers cap the number of live WebGL contexts, so a
later call can return `false` after an earlier one returned `true`.

Because `introActive` and `portfolioRevealed` were two *independent* pieces of
state seeded by two separate calls, they could disagree. The reachable bad state
is `introActive === false` **and** `portfolioRevealed === false` — a black page,
rescued only if a third probe also happened to return `false`.

### Defect 2 — the SSR overlay painted before hydration could unmount it

**This is most likely the symptom the user actually saw.**

The server always rendered `introActive = true`, so the overlay markup shipped
in every HTML response. The pre-paint inline script in `__root.tsx` gated only
`#portfolio-root` — it never gated the overlay.

So on any load where the intro should *not* play, the browser painted the
server-rendered overlay: the words "TRANSIT SIGNAL // INITIALIZING" with **no
tunnel behind them**, because three.js had not booted yet. It stayed there until
hydration finished. The duration scales with JS boot time — imperceptible in
`vite dev`, multiple seconds on a cold or throttled production load.

### Defect 3 — a genuine hydration mismatch

The client initializer could differ from the server's `true`. React 19 responds
by silently discarding the server HTML in production and re-rendering the root.
That re-runs `RootShell`, which re-asserts `<html className="dark
scroll-smooth">`. Because that `className` is React-owned, the re-assert can
**wipe the `intro-pending` class** that the inline script added.

### Defect 4 — no fail-safe

The gate was `!important` CSS removable only by JS. A stale CDN chunk, a blocked
asset, or any earlier runtime error therefore left a permanently black page with
scroll locked — a direct violation of requirement 3 in section 1.

---

## 5. Already ruled out — do not spend time here

Each of these was checked against the source and eliminated:

- **CSS purge / tree-shaking** — Tailwind v4; every class is static in JSX; no
  class names built by string concatenation.
- **Edge vs Node runtime** — no `runtime` export anywhere in `src`.
- **`prefers-reduced-motion`** — was already being checked correctly.
- **`useLayoutEffect` behaving differently in prod** — there were none in the
  codebase before this fix.
- **`StrictMode` double-invocation** — no `StrictMode` in the tree.
- **Dynamic import of the animation library missing `{ ssr: false }`** — there
  are no dynamic imports of it.

### One behaviour that is correct and must not be "fixed"

`sessionStorage` survives a reload in the same tab. Therefore **a hard refresh
is not supposed to replay the intro.** Only a brand-new session does. Also note
that incognito windows share session storage until *every* incognito window is
closed. Do not report either of these as a bug, and account for both when
interpreting test results.

---

## 6. Two execution paths — pick one

First run `ls intro-deterministic-fix.patch` at the repo root.

### Path A — the patch exists (preferred)

```bash
git status                      # report repo state and branch; stop if dirty
git checkout -b fix/intro-deterministic-hydration
git apply --check --3way intro-deterministic-fix.patch   # dry run
git am --3way intro-deterministic-fix.patch              # apply + commit
git show --stat HEAD
```

Expected: 5 files changed, ~157 insertions, ~109 deletions, with
`src/lib/intro-gate.ts` created.

If a hunk is rejected, the working tree has drifted from the snapshot the patch
was built against. Fall back to `git apply --3way --reject`, resolve the `.rej`
files **against the design in section 7**, then delete the `.rej` files.

### Path B — no patch, or the patch cannot be salvaged

Implement section 7 from scratch. It is a complete specification.

---

## 7. Target design — authoritative specification

The governing idea: **one memoized decision, computed once per page load, with
an identical first render on server and client, resolved before first paint, and
backed by a fail-safe.**

### 7.1 New file: `src/lib/intro-gate.ts`

```ts
export const INTRO_SESSION_KEY = "portfolioIntroPlayed"
const INTRO_PENDING_CLASS = "intro-pending"

let cachedDecision: boolean | null = null
```

- `function hasWorkingWebGL(): boolean` — probes for a WebGL context, then
  **immediately releases it** via
  `gl.getExtension("WEBGL_lose_context")?.loseContext()`. Releasing the context
  is what makes the probe idempotent and is the fix for defect 1.
- `export function shouldPlayIntro(): boolean` — the single source of truth.
  Memoizes into `cachedDecision` so it is computed at most once per page load,
  no matter how many callers ask. Returns `false` during SSR (no `window`).
  Conditions: no `portfolioIntroPlayed` in sessionStorage, WebGL works, and
  `prefers-reduced-motion` does not match.
- `export function markIntroPlayed(): void` — sets `cachedDecision = false` and
  writes the sessionStorage key.
- `export function clearIntroPending(): void` — removes `intro-pending` from
  `document.documentElement`.

All `sessionStorage` access and all `getContext(` calls must live **only** in
this file and in the inline head script. Nowhere else.

### 7.2 `src/routes/index.tsx`

```ts
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

const [introActive, setIntroActive] = useState<boolean>(true)
const portfolioRevealed = !introActive          // derived, NOT independent state
```

- `introActive` initializes to `true` **unconditionally**. This makes the first
  client render byte-identical to the server render, eliminating defect 3.
- `portfolioRevealed` becomes a derived value. The two states can no longer
  disagree, eliminating the black-page state from defect 1.
- A `useIsomorphicLayoutEffect` on mount calls `shouldPlayIntro()` once and
  calls `setIntroActive(false)` if it returns `false`. Running as a *layout*
  effect means this resolves before the browser paints, so there is no flash.
- `handleIntroComplete` is wrapped in `useCallback(..., [])` and does:
  `markIntroPlayed()`, `clearIntroPending()`, `setIntroActive(false)`,
  `window.scrollTo(0, 0)`. A stable identity prevents replay on re-render.
- Remove `isIntroRequired` and the `setPortfolioRevealed` setter entirely.

### 7.3 `src/components/portfolio/ArrivalTunnel.tsx`

- Delete the local `isWebGLAvailable()` probe. The component must not make its
  own decision — it renders when it is rendered.
- Give the overlay root `id="arrival-tunnel"`.
- Change nothing else. All timings and easings stay exactly as they are.

### 7.4 `src/styles.css`

Add, alongside the existing `html.intro-pending` rules:

```css
html:not(.intro-pending) #arrival-tunnel {
  display: none !important;
}
```

This is the fix for defect 2. If the head script decides the intro should not
play, it never adds `intro-pending`, so the server-rendered overlay is hidden at
first paint — before hydration, without waiting for JS to boot.

### 7.5 `src/routes/__root.tsx`

Rewrite the pre-paint inline script as an IIFE that:

1. Captures `var root = document.documentElement`.
2. Applies the same decision logic as `shouldPlayIntro()`.
3. **Returns early** when the intro should not play, so `intro-pending` is never
   added and rule 7.4 hides the overlay immediately.
4. Otherwise adds `intro-pending` and registers
   `setTimeout(function () { root.classList.remove('intro-pending') }, 6000)`.

That timeout is the fail-safe for defect 4: if the bundle never boots, the gate
self-clears and the user gets a usable page instead of a black screen.

---

## 8. Build and serve — a known trap, read before validating

`npm run preview` (`vite preview`) **may not serve real server-side rendering
for this app.** The build routes through Nitro, and the Vite config indicates
Nitro may default to a **Cloudflare** target. A Cloudflare Worker bundle will
not run under plain Node.

Validating against the wrong runtime is worse than not validating at all,
because the hydration path is exactly what is broken here.

So, in order:

1. Determine the installer. This repo contains **both** `bun.lock` and
   `package-lock.json`. Pick the one that matches the lockfile actually in use
   and say which you chose.
2. `npm run build` (or the bun equivalent).
3. Inspect the output — check for `.output/` and `dist/`. **Report exactly what
   was produced** and what the correct local SSR serve command is.
4. If the output is a Cloudflare or Vercel preset bundle rather than a Node
   server, either run it under the matching local emulator, or temporarily set
   the Nitro preset to `node-server` **for local validation only** and revert
   that change before committing. Never commit a preset change.
5. Start the server in the background, redirecting output to a log file, and
   report the localhost URL.

---

## 9. Verification protocol

Use the browser subagent. Test the **local production build** as the subject and
the **live site** at `https://darshsoam.vercel.app` as a broken baseline for
comparison. Ensure Browser Tools are enabled and both hosts are allowlisted.

Run this matrix against each target:

| # | Scenario | Pass criteria |
| --- | --- | --- |
| 1 | Fresh session, direct load | Intro plays fully, then the portfolio appears |
| 2 | Hard refresh, same tab | Portfolio appears immediately. **No frozen "TRANSIT SIGNAL // INITIALIZING" screen.** Intro correctly does not replay |
| 3 | Client-side nav away and back | No intro replay, no black screen |
| 4 | Fresh session, Slow 3G throttling | No overlay flash before the tunnel renders; no stall |
| 5 | Fresh session, 375px viewport | Intro plays and completes; layout intact |
| 6 | Skip Intro button, then ESC key | Both dismiss immediately and reveal the portfolio |
| 7 | JS blocked entirely | Page is readable and scrollable within ~6s. Not black |

For every scenario, capture the console and report hydration errors or warnings
verbatim. **A clean console on scenario 2 is the single most important signal.**

A frozen title-card with no tunnel behind it is the exact fingerprint of defect
2. If you see it, the fix is not working — report it, do not rationalise it.

Save screenshots and browser recordings as artifacts.

---

## 10. Codebase-specific traps

- `id="arrival-tunnel"` and the CSS selector in `styles.css` are coupled by a
  bare string. Renaming either one silently reintroduces defect 2.
- `RootShell` sets `className` on `<html>`, so React owns that attribute. Adding
  classes to `<html>` from an inline script is inherently fragile — that is
  precisely defect 3. Do not add more script-managed classes to `<html>`.
- The design depends on an inline `<script>`, so it fails closed under a strict
  CSP without `unsafe-inline` (the intro simply never plays, which is a safe
  degradation). This is not a regression; the previous code had the same
  dependency.
- The 6000ms fail-safe is a heuristic. The intro self-finishes at 2800ms with a
  hard stop at 3800ms, so the margin is comfortable — but if intro duration ever
  changes, this number must change with it.

---

## 11. Checkpoints — stop and ask the user

Stop and wait for explicit human approval at each of these. Do not proceed on
assumption.

1. **Repo state is not clean**, or this is not a git repository.
2. **The patch does not apply cleanly** — report the rejected hunks before
   attempting a manual resolution.
3. **After applying the change, before building** — present the full diff and
   confirm only the five allowed files were touched.
4. **The build output requires a preset change** to serve locally.
5. **Any scenario in section 9 fails** — report, do not iterate silently more
   than twice.
6. **Before any `git push`.** Always. Without exception.
7. **You want to modify a file outside the allowed set.**

---

## 12. Definition of done

- [ ] Change applied on branch `fix/intro-deterministic-hydration`
- [ ] Exactly five files touched, one of them new
- [ ] `prettier --check` passes on all changed files
- [ ] `tsc --noEmit` shows no new errors
- [ ] No surviving references to `isIntroRequired`, `isWebGLAvailable`, or
      `setPortfolioRevealed`
- [ ] `sessionStorage` and `getContext(` appear only in `intro-gate.ts` and the
      inline head script
- [ ] Production build succeeds
- [ ] All seven scenarios in section 9 pass, with artifacts saved
- [ ] Console clean of hydration warnings
- [ ] Nothing pushed, nothing deployed

### Final report format

Report back under exactly these headings:

1. **Root cause** — which of the four defects were present, confirmed against
   the code you actually read
2. **Files changed** — path, lines added/removed
3. **What changed** — one short paragraph per file
4. **Why it is now deterministic in production** — tie each item back to a
   specific defect
5. **Validation results** — the section 9 matrix, with a clear split between
   what you actually verified and what you did not
6. **Remaining risk** — real risks only, no filler

Be explicit about what you did **not** verify. An honest gap is useful; an
unverified claim is not.
