/**
 * Single source of truth for the arrival-intro decision.
 *
 * Why this file exists:
 * The decision was previously recomputed in four independent places — two
 * `useState` initialisers in routes/index.tsx, one effect in the same file,
 * and again inside ArrivalTunnel — using a probe that is NOT idempotent.
 * Each call did `document.createElement("canvas").getContext("webgl")` and
 * never released the resulting context. Browsers cap the number of live WebGL
 * contexts, so once that budget was reached later calls returned `false`
 * while earlier calls had returned `true`. Those disagreeing answers were
 * written into two separate pieces of React state, producing combinations no
 * branch handled (most damagingly: intro skipped *and* portfolio still
 * hidden).
 *
 * Everything now funnels through `shouldPlayIntro()`, which is evaluated at
 * most once per page load and releases its probe context immediately.
 */

export const INTRO_SESSION_KEY = "portfolioIntroPlayed";
const INTRO_PENDING_CLASS = "intro-pending";

let cachedDecision: boolean | null = null;

function hasWorkingWebGL(): boolean {
  try {
    if (!window.WebGLRenderingContext) return false;
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return false;
    // Hand the context straight back. An unreleased probe context counts
    // against the browser's live-context limit, which is what made this
    // check non-deterministic in the first place.
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

/**
 * Should the arrival intro play on this page load?
 * Evaluated at most once per page load. Returns `false` during SSR — the
 * server must never decide this, or the client will disagree and hydration
 * will mismatch.
 */
export function shouldPlayIntro(): boolean {
  if (typeof window === "undefined") return false;
  if (cachedDecision !== null) return cachedDecision;

  let decision: boolean;
  try {
    if (sessionStorage.getItem(INTRO_SESSION_KEY)) {
      decision = false;
    } else if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      decision = false;
    } else {
      decision = hasWorkingWebGL();
    }
  } catch {
    // Storage or matchMedia blocked (lockdown / private browsing): skip.
    decision = false;
  }

  cachedDecision = decision;
  return decision;
}

/**
 * Record that the intro is finished — for the rest of this session and, via
 * the memo, for the rest of this page load. This is what prevents any replay.
 */
export function markIntroPlayed(): void {
  cachedDecision = false;
  try {
    sessionStorage.setItem(INTRO_SESSION_KEY, "true");
  } catch {
    // Ignore private-browsing storage restrictions.
  }
}

/** Release the pre-paint CSS gate set by the inline script in __root.tsx. */
export function clearIntroPending(): void {
  if (typeof document === "undefined") return;
  document.documentElement.classList.remove(INTRO_PENDING_CLASS);
}
