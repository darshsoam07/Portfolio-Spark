# Agent Brief v2 — Arrival Intro: Play On Every Load

> **Status:** This brief SUPERSEDES any earlier brief titled "Arrival Intro Determinism Fix".
> The replay policy has changed from "once per session" to "every page load", and the
> `intro-failsafe` class plus the `<noscript>` block described in the earlier brief are
> **no longer needed**. Do not implement them. See §7.6 for why.

---

## §0 How to use this file

You are a senior frontend engineer working directly in this repository.

Execute §1 through §12 in order. This file is the source of truth for the design.
If you believe something in here is wrong, **say so at the next checkpoint** — do not
silently deviate from it.

Stop and report at every checkpoint in §11. Do not proceed past a checkpoint until the
human replies. Checkpoints exist because this repository deploys to production and syncs
to a third-party editor; silent progress is not acceptable here.

---

## §1 Mission and acceptance criteria

**Mission:** make the arrival intro animation play reliably on **every page load**, on any
machine, in any browser window, including after a refresh.

**Acceptance criteria.** All of these must hold:

1. A fresh load of `/` plays the intro.
2. A plain refresh (F5) plays the intro again.
3. A hard refresh (Ctrl/Cmd+Shift+R) plays the intro again.
4. A second tab pointed at the same URL plays the intro.
5. No blank or black page at any point, on any code path, including when JavaScript never
   boots at all.
6. No flash of the final state (portfolio visible for a frame, then the overlay appearing).
7. Zero hydration warnings in the console.
8. The intro does not replay on re-render, on scroll, or on client-side navigation within a
   single page load.
9. Users with `prefers-reduced-motion: reduce` see the portfolio immediately, with no blank
   period and no overlay.
10. Users with no working WebGL see the portfolio, not a stuck title card.
11. ESC and the Skip Intro button still work, and scrolling is unlocked afterwards.
12. No visual, timing, or easing change to the animation itself.

---

## §2 Ground truth about this stack — read before touching anything

This is **not a Next.js project.** Any instinct you have about Next.js is wrong here.

| Fact | Value |
| --- | --- |
| Framework | TanStack Start + TanStack Router |
| Bundler | Vite 8 |
| Server layer | Nitro 3 (beta) |
| React | 19 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Animation | `motion` v12 (Framer Motion successor) + `three` + `gsap` + `lenis` |
| Scaffolded by | Lovable (`@lovable.dev/vite-tanstack-config`) |
| Package name | `tanstack_start_ts` |

**Consequences:**

- There is no `next.config.*`, no `index.html`, no `pages/`, no `app/`.
- `next dev`, `next build`, `next start`, `dynamic(..., { ssr: false })`, and
  `export const runtime = 'edge'` **do not exist in this project**. Never reference or run them.
- Scripts are: `dev: vite dev`, `build: vite build`, `preview: vite preview`,
  `lint: eslint .`, `format: prettier --write .`.
- The only UI route is `/`. The other routes (`/mcp`, `/.mcp/*`, `/.well-known/*`) are MCP
  endpoints and are irrelevant to this task.

**Repo root:** the folder containing `package.json`, `vite.config.ts`, and `src/`.
If the project was opened from an unzipped archive, the real root may be one level deeper
than the folder you have open. Confirm with:

```bash
pwd && find . -maxdepth 3 -name package.json -not -path "*/node_modules/*"
```

All paths in this brief are relative to that root.

---

## §3 Hard constraints

**Only these five files may change.** Touching anything else is a failure:

1. `src/lib/intro-gate.ts` — new file
2. `src/routes/index.tsx`
3. `src/routes/__root.tsx`
4. `src/components/portfolio/ArrivalTunnel.tsx`
5. `src/styles.css`

**Never run any of these:**

- `git push` (in any form), `git push --force`
- `git rebase`, `git commit --amend`, any squash or interactive rebase
- `npm run format` / `prettier --write .` (it reformats the entire repository and will bury
  your diff in noise — format only the five files above)
- `npm audit fix`, `npm update`, or any dependency version change

**Why history rewriting is forbidden:** `AGENTS.md` in this repo states the project is
connected to Lovable and that rewriting published history rewrites it on Lovable's side,
which can destroy the user's project history. This is non-negotiable.

**If you need to add notes to `AGENTS.md`:** it already exists and contains
`<!-- LOVABLE:BEGIN -->` / `<!-- LOVABLE:END -->` markers. Append **below** the closing
marker. Never overwrite the file.

**Do not change any of these constants or easings:**

| Thing | Value |
| --- | --- |
| Auto-finish timer | `2800` ms |
| Safety timer | `3800` ms |
| Exit delay | `700` ms |
| Boot fail-safe | `6000` ms |
| Overlay exit | `{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }` |
| Portfolio reveal | `opacity 0.6s cubic-bezier(0.22, 0.8, 0.2, 1)` |

**Branch:** work on `fix/intro-every-load`, created from `main`. Never commit to `main`.

---

## §4 Root cause — already diagnosed, do not re-litigate

Four stacked defects. The first is the dominant one.

### 4.1 The `sessionStorage` gate (the dominant cause — not actually a bug, but the wrong policy)

`src/routes/index.tsx` gated the intro on
`sessionStorage.getItem("portfolioIntroPlayed")`. `sessionStorage` **survives every reload,
including a hard refresh**, and clears only when the tab is closed. So once any visit played
the intro in a tab, that tab could never show it again. Refreshing — the natural way to
re-test — is the one action guaranteed not to reset it.

Evidence: on the same laptop, an incognito window played the intro flawlessly while a normal
window showed nothing. Same GPU, same settings. The only difference was stored state. This
also rules out WebGL and reduced-motion as the cause on that machine.

### 4.2 The poison pill

When the reduced-motion or WebGL check bailed out, it wrote
`sessionStorage.setItem(SESSION_KEY, "true")` **before** returning. One transient probe
failure therefore marked the intro permanently played for the rest of the tab's life.

### 4.3 A leaking WebGL probe, called four times per load

`isIntroRequired()` in `index.tsx` ran three times, and `isWebGLAvailable()` in
`ArrivalTunnel.tsx` ran a fourth. Each created a `<canvas>` and requested a WebGL context and
**never released it**. Browsers cap the number of live WebGL contexts, and that cap varies by
GPU and driver. So a later probe could return `false` after an earlier one returned `true`.
That is the source of the "it rarely plays" symptom, and precisely why it was worse on other
machines than on the development machine.

### 4.4 Two independent pieces of state derived from that non-deterministic source

`introActive` and `portfolioRevealed` each called the probe separately. They could disagree,
producing the worst outcome: no intro **and** a hidden portfolio — a black page.

### 4.5 The blank flash

`#portfolio-root` shipped a React inline `opacity: 0` in the server response, so the page
stayed blank until the bundle hydrated. On a mid-range laptop that is half a second or more.
There was also no fail-safe: the CSS gate used `!important` and could only be removed by JS,
so if the bundle failed the page stayed black and scroll-locked forever.

---

## §5 Already ruled out — do not spend time here

- **CSS purge / tree-shaking.** Tailwind v4; all animation classes appear statically in JSX.
- **Edge runtime.** No `runtime` export exists anywhere in the project.
- **`prefers-reduced-motion` false positives.** The check was written correctly.
- **`useLayoutEffect` timing.** There were none in the original code.
- **React `StrictMode`.** Not used.
- **Dynamic imports / `ssr: false`.** None exist.
- **CDN caching of stale chunks.** Not the cause; the failure reproduces on a fresh load with
  a warm cache and disappears in a fresh incognito window, which is a storage signature, not
  a caching signature.
- **The animation code itself.** It renders perfectly when it runs. Do not "fix" the tunnel.

---

## §6 Two paths — prefer Path A

### Path A — apply the prepared patch (preferred)

`intro-every-load.patch` should be in the repo root. It is a `git format-patch` output
against a clean `main`.

```bash
git status                      # must be clean
git checkout main
git checkout -b fix/intro-every-load
git apply --check --3way intro-every-load.patch   # dry run first
git am --3way intro-every-load.patch
git show --stat HEAD
```

Expected diffstat: **5 files changed, 147 insertions(+), 113 deletions(-)**.

If the dry run fails, **stop and report at Checkpoint 2.** Do not improvise a merge. The
fallback is `git apply --3way --reject` followed by manual resolution of `.rej` files, but
only with human approval.

### Path B — implement from the spec in §7

Use this only if Path A is impossible (patch missing or does not apply). The result must be
functionally identical to §7. Do not invent a different architecture.

---

## §7 Target design specification

### 7.1 New file: `src/lib/intro-gate.ts`

The single source of truth for eligibility. **No storage APIs of any kind appear in this
file or anywhere else in `src/`.**

Exports:

- `shouldPlayIntro(): boolean` — returns `false` during SSR. On the client, computes the
  decision **at most once per page load** and memoises it in a module-level variable. The
  decision is: `false` if `prefers-reduced-motion: reduce` matches, otherwise the result of
  the WebGL probe.
- `clearIntroPending(): void` — removes the `intro-pending` class from
  `document.documentElement`.
- `cancelIntroFailsafe(): void` — clears `window.__introFailsafeTimer` and sets it to
  `undefined`.

Private helper `hasWorkingWebGL(): boolean` must:

- guard on `window.WebGLRenderingContext` first,
- try `getContext("webgl")` then `getContext("experimental-webgl")`,
- and **immediately release the context** with
  `gl.getExtension("WEBGL_lose_context")?.loseContext()` before returning `true`.

Releasing the context is the fix for §4.3 and is not optional.

Declare the timer global in this file:

```ts
declare global {
  interface Window {
    __introFailsafeTimer?: ReturnType<typeof setTimeout>;
  }
}
```

### 7.2 `src/routes/index.tsx`

- **Delete** `isIntroRequired()` entirely.
- **Delete** the `portfolioRevealed` state entirely. It is referenced in exactly one place
  (the `#portfolio-root` inline style), which also goes away.
- `introActive` becomes `useState<boolean>(true)` — unconditionally, with no initialiser
  function. Server and client therefore produce a byte-identical first render, which is what
  eliminates the hydration mismatch.
- Add an isomorphic layout effect:

```ts
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
```

  and use it with an empty dependency array to run, before first paint:

```ts
cancelIntroFailsafe();
if (!shouldPlayIntro()) {
  clearIntroPending();
  setIntroActive(false);
}
```

  `cancelIntroFailsafe()` is called **unconditionally**, outside the `if`. Reaching this line
  proves the bundle booted, so the application now owns revealing the portfolio and the
  fail-safe must never fire.

- `handleIntroComplete` becomes a `useCallback(..., [])` that calls `clearIntroPending()`,
  `cancelIntroFailsafe()`, `setIntroActive(false)`, `window.scrollTo(0, 0)`.
- Remove the `isIntroRequired()` cleanup block from the scroll-restoration effect.
- `#portfolio-root` keeps **only** the transition:

```tsx
style={{ transition: "opacity 0.6s cubic-bezier(0.22, 0.8, 0.2, 1)" }}
```

### 7.3 `src/components/portfolio/ArrivalTunnel.tsx`

- Remove `const SESSION_KEY = "portfolioIntroPlayed";`
- Remove the entire `isWebGLAvailable()` function.
- Remove the `sessionStorage.setItem` try/catch from `finishIntro`.
- Remove **all three** eligibility early-return blocks from the top of the first effect,
  replacing them with a comment pointing at `src/lib/intro-gate.ts`. This component must not
  probe anything; duplicated probing is what made the behaviour non-deterministic.
- Add `hasFinishedRef.current = true;` to the `3800` ms safety timer and to the
  WebGL-failure `catch`, so completion can never double-fire.
- Add `id="arrival-tunnel"` to the outermost overlay `motion.div` (the one that already has
  `key="arrival-tunnel"`). The CSS rule in §7.5 depends on this id.

### 7.4 `src/routes/__root.tsx`

Replace the inline head script with this exact logic:

```js
(function () {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var root = document.documentElement;
    root.classList.add('intro-pending');
    window.__introFailsafeTimer = setTimeout(function () {
      root.classList.remove('intro-pending');
    }, 6000);
  } catch (e) {}
})();
```

No storage access. No WebGL probe here — probing WebGL in a blocking head script can trigger
GPU-process startup and delay first paint for every visitor. That trade-off is deliberate; see
§7.7.

### 7.5 `src/styles.css`

Keep the existing `html.intro-pending` rules untouched. Add exactly one rule after them:

```css
html:not(.intro-pending) #arrival-tunnel {
  display: none !important;
}
```

### 7.6 Why `intro-failsafe` and `<noscript>` are NOT needed (unlike in the v1 brief)

Because React no longer applies an inline `opacity: 0` to `#portfolio-root`, the
`intro-pending` class is now the **only** thing hiding the portfolio. That single change
collapses three previously separate problems:

- **JavaScript disabled or the bundle never loads.** The head script never runs, so
  `intro-pending` is never added. The portfolio is therefore visible by default, and
  `html:not(.intro-pending) #arrival-tunnel` hides the overlay. This case now passes with no
  extra code.
- **Reduced-motion users.** No `intro-pending` is added, so the portfolio is visible from the
  very first paint. The blank flash they used to get is gone.
- **The fail-safe.** Removing `intro-pending` is now sufficient to reveal the portfolio, so
  the `6000` ms timeout body needs only that one line.

If you find yourself adding an `intro-failsafe` class, a `<noscript>` block, or an inline
`opacity` on `#portfolio-root`, you have deviated from this design. Stop and report.

### 7.7 Known, accepted residual

The head script checks only reduced-motion, while `shouldPlayIntro()` also checks WebGL. A
visitor with no working WebGL therefore gets `intro-pending` and sees the static title card
until the pre-paint layout effect clears it. This self-corrects before paint on any normal
connection. This is accepted. Do not "fix" it by probing WebGL in the head script.

---

## §8 Build and serve — the trap

`npm run build` runs `vite build`. This project's Vite preset bundles **Nitro**, and Nitro's
default target in this configuration is **Cloudflare**, not Node. A Cloudflare bundle cannot
be started with `node .output/server/index.mjs`.

So: build, then **classify the output before trying to serve it**:

```bash
npm install          # or bun install — bun.lock and package-lock.json both exist; pick one and say which
npm run build
ls -R .output 2>/dev/null || ls -R dist
```

Then report at Checkpoint 4 what you found, and which of these applies:

- **Node server output** (`.output/server/index.mjs` with a Node entry) → serve with
  `node .output/server/index.mjs` in the background, logging to a file.
- **Cloudflare/Vercel output** → you cannot serve it directly with Node. Try
  `npx vite preview` and check whether it returns server-rendered HTML containing the inline
  head script. If it does not, **stop and ask** rather than changing the build configuration.
  Changing the Nitro preset is out of scope for this task.

Whatever you start, start it in the **background** with output redirected to a log file, and
verify readiness with a finite command. Never leave a server running in the foreground.

Critically: **verify against the built output, not `vite dev`.** The whole class of bug here
is a dev/production difference, so a dev-server test proves nothing.

---

## §9 Verification protocol

Use the browser subagent against the served production build. Capture a screenshot for each
scenario. Report a pass/fail table.

| # | Scenario | Expected |
| --- | --- | --- |
| 1 | Fresh load, normal (non-incognito) window | Intro plays fully, then portfolio reveals |
| 2 | Plain refresh (F5) | Intro plays again |
| 3 | Hard refresh (Ctrl/Cmd+Shift+R) | Intro plays again |
| 4 | Second tab, same URL | Intro plays |
| 5 | Reduced motion emulated (DevTools → Rendering → Emulate CSS `prefers-reduced-motion`) | No intro, no blank period, portfolio visible immediately |
| 6 | Slow 3G throttling | Intro plays and is not truncated |
| 7 | JavaScript disabled | Portfolio visible, no overlay, page scrolls |
| 8 | Mobile viewport, 390×844 | No layout shift, no horizontal scroll, intro fits |
| 9 | ESC key during intro | Intro exits immediately, scroll unlocked, no replay |
| 10 | Skip Intro button | Same as #9 |

**In every scenario, check the console.** These strings are failures and must be reported
verbatim: `did not match`, `Hydration failed`, `hydrating`, `recreating`, `Warning: useLayoutEffect`.

**Scenario 6 interpretation.** The boot fail-safe is cancelled at hydration, so a slow
connection should no longer truncate the intro. If it somehow still does, **report it — do
not change the `6000`, `2800`, or `3800` ms constants or any easing.** Those are product
decisions, not yours.

**Also verify the probe count is exactly one.** There must be exactly one `getContext(`
call site in the whole `src/` tree:

```bash
grep -rn 'getContext(' src/
```

Expect two matches on adjacent lines in `src/lib/intro-gate.ts` (the `webgl` and
`experimental-webgl` attempts within the single probe), and **nothing anywhere else**.

---

## §10 Codebase traps

1. **`ArrivalTunnel.tsx` has TWO effects, and they are easy to confuse.**
   - Effect 1: eligibility gate, scroll lock, ESC listener, the `2800`/`3800` ms timers, and
     a cleanup that restores `document.body.style.overflow`. Its dependency array is `[]` —
     it runs **once**.
   - Effect 2: the three.js scene. Its dependency array is `[isActive]`, and it **already
     contains** `if (!isActive) return;` as its first statement.

   Do **not** add an `if (!isActive) return;` guard to Effect 1. It has empty deps and only
   ever runs with `isActive === true`, so the guard is dead code that misleads the next
   reader into thinking Effect 1 re-runs.

2. **`useMemo` is imported but unused** in `ArrivalTunnel.tsx`. Pre-existing. Leave it alone —
   removing it enlarges the diff for no benefit.

3. **`AGENTS.md` already exists** and is Lovable-authored. See §3.

4. **Both `bun.lock` and `package-lock.json` exist.** Pick one package manager, state which
   you used, and do not commit a change to the other lockfile.

5. **`src/router.tsx` sets `scrollRestoration: true`** and `index.tsx` also sets
   `window.history.scrollRestoration = "manual"`. Pre-existing tension. Not in scope.

---

## §11 Checkpoints — stop at each one

**Checkpoint 1 — Orientation.** Report: the resolved repo root, `git status`, current branch,
the `git log --oneline -3`, and whether `intro-every-load.patch` is present. Nothing changed
yet. **Stop.**

**Checkpoint 2 — Patch dry run.** Report the result of `git apply --check --3way`. If it
fails, report the exact error and stop without improvising. **Stop.**

**Checkpoint 3 — Diff review.** Report:
- `git diff --stat main HEAD`
- the complete `git diff main HEAD`
- `npx prettier --check` on the five files → must pass
- `npx tsc --noEmit` → report any error that is not a module-resolution error
- `grep -rn 'isIntroRequired\|isWebGLAvailable\|setPortfolioRevealed\|portfolioRevealed\|SESSION_KEY\|portfolioIntroPlayed' src/` → must return nothing
- `grep -rn 'sessionStorage\|localStorage' src/` → must return nothing but comments

**Stop.**

**Checkpoint 4 — Build output classification.** Report the build log tail, the `.output`/`dist`
tree, your classification per §8, and the exact command you propose to serve it. **Stop.**

**Checkpoint 5 — Verification matrix.** Report the §9 table with pass/fail, screenshots, and
every console message. **Stop.**

**Checkpoint 6 — Final report.** Root cause / files changed / what changed / why it is now
deterministic / validation results / remaining risk. Then **stop permanently**. Do not push,
do not deploy, do not open a pull request. The human pushes.

---

## §12 Definition of done

- All twelve acceptance criteria in §1 verified against the **production build**, not `vite dev`.
- Exactly five files changed, matching §7.
- Prettier and TypeScript clean.
- Zero hydration warnings.
- Exactly one WebGL probe call site, which releases its context.
- No storage API anywhere in `src/`.
- Committed to `fix/intro-every-load`. **Not pushed.**
- Checkpoint 6 delivered, including any risk you are genuinely unsure about. An honest
  "I could not verify X" is worth more than a confident claim you did not test.
