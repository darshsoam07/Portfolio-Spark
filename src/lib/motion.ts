export const EASE_SIGNATURE = [0.16, 1, 0.3, 1] as const;
export const EASE_ACCELERATE = [0.65, 0, 0.35, 1] as const;
export const EASE_TRANSMIT = [0.22, 0.7, 0.16, 1] as const;

export const MOTION = {
  micro: { duration: 0.18, ease: EASE_SIGNATURE },
  standard: { duration: 0.56, ease: EASE_SIGNATURE },
  cinematic: { duration: 1.05, ease: EASE_SIGNATURE },
  event: { duration: 2.8, ease: EASE_TRANSMIT },
  stagger: 0.075,
} as const;

export const ARRIVAL_ENABLE_SESSION_SKIP = true;
export const ARRIVAL_SESSION_KEY = "darsh-arrival-v2";

export const VIEWPORT = {
  once: true,
  margin: "-12% 0px -12% 0px",
} as const;

export function cinematicDelay(index: number, base = 0) {
  return base + index * MOTION.stagger;
}
