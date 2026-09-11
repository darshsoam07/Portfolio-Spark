/**
 * Single source of truth for whether the arrival intro should play.
 *
 * Policy: the intro plays on EVERY page load. There is deliberately no
 * sessionStorage or localStorage flag. Persisting an "already played" flag was
 * the reason the intro appeared once per tab and then never again on refresh,
 * because sessionStorage survives reloads (including hard refresh) and only
 * clears when the tab itself is closed.
 *
 * Two conditions still suppress it:
 *   1. prefers-reduced-motion: reduce  (accessibility)
 *   2. no working WebGL context        (the tunnel is rendered with three.js)
 *
 * The decision is computed at most once per page load and then memoised. This
 * matters: the previous implementation probed WebGL up to four times per load
 * and never released the contexts it created. Browsers cap the number of live
 * WebGL contexts and that cap varies by GPU and driver, so a later probe could
 * return false after an earlier one returned true. That is what produced the
 * "sometimes it plays, sometimes it doesn't" behaviour, and why it was worse on
 * other machines than on the development machine.
 */

declare global {
  interface Window {
    __introFailsafeTimer?: ReturnType<typeof setTimeout>;
  }
}

const INTRO_PENDING_CLASS = "intro-pending";

let cachedDecision: boolean | null = null;

/**
 * Probes for a usable WebGL context and immediately releases it again, so that
 * calling this can never contribute to exhausting the browser's context limit.
 */
function hasWorkingWebGL(): boolean {
  try {
    if (!window.WebGLRenderingContext) return false;
    const canvas = document.createElement("canvas");
    const gl =
      (canvas.getContext("webgl") as WebGLRenderingContext | null) ??
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

/** Returns the same answer for the entire lifetime of the page load. */
export function shouldPlayIntro(): boolean {
  if (typeof window === "undefined") return false;
  if (cachedDecision !== null) return cachedDecision;

  let decision = false;
  try {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      decision = hasWorkingWebGL();
    }
  } catch {
    decision = false;
  }

  cachedDecision = decision;
  return decision;
}

/**
 * Drops the CSS gate. Removing this class is all that is required to reveal the
 * portfolio and hide the overlay, which is why no JavaScript-applied inline
 * style is used for either any more.
 */
export function clearIntroPending(): void {
  if (typeof document === "undefined") return;
  document.documentElement.classList.remove(INTRO_PENDING_CLASS);
}

/**
 * Cancels the boot fail-safe armed by the inline script in __root.tsx. Called
 * as soon as React hydrates, because from that moment the application itself
 * guarantees the portfolio gets revealed, so the fail-safe must not fire and
 * cut a legitimately slow intro short.
 */
export function cancelIntroFailsafe(): void {
  if (typeof window === "undefined") return;
  if (window.__introFailsafeTimer !== undefined) {
    clearTimeout(window.__introFailsafeTimer);
    window.__introFailsafeTimer = undefined;
  }
}
