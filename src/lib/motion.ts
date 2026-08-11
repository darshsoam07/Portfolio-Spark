export const EASE_SIGNATURE = [0.16, 1, 0.3, 1] as const;

export const MOTION = {
  micro: { duration: 0.2, ease: [0.2, 0.8, 0.2, 1] },
  standard: { duration: 0.55, ease: EASE_SIGNATURE },
  cinematic: { duration: 1.1, ease: EASE_SIGNATURE },
} as const;

// Centralized arrival config — no scattered sessionStorage calls elsewhere.
export const ARRIVAL_ENABLE_SESSION_SKIP = true;
export const ARRIVAL_SESSION_KEY = "portfolio-arrival-complete";
