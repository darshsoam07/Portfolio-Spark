export const EASE_PRECISE = [0.22, 0.8, 0.2, 1] as const;
export const EASE_HEAVY = [0.65, 0, 0.35, 1] as const;

/**
 * Semantic motion grammar — every transition belongs to a layer
 * so motion communicates hierarchy, not decoration.
 */
export const MOTION = {
  section: { duration: 0.65, ease: EASE_PRECISE },
  component: { duration: 0.4, ease: EASE_PRECISE },
  micro: { duration: 0.16, ease: EASE_PRECISE },
  interaction: { duration: 0.24, ease: EASE_PRECISE },
  cinematic: { duration: 0.85, ease: EASE_HEAVY },
} as const;

/** Shared viewport trigger for scroll reveals */
export const VIEWPORT_REVEAL = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -8% 0px",
} as const;

/** Fade-up reveal for sections */
export const SECTION_REVEAL = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: MOTION.section },
} as const;

/** Stagger container — use with `variants` on parent */
export const STAGGER_CONTAINER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
} as const;

/** Individual item in a stagger group */
export const STAGGER_ITEM = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: MOTION.component },
} as const;
