import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ARRIVAL_ENABLE_SESSION_SKIP,
  ARRIVAL_SESSION_KEY,
  EASE_ACCELERATE,
  EASE_SIGNATURE,
  MOTION,
} from "@/lib/motion";

type ArrivalPhase = "signal" | "materialize" | "ignite" | "handoff" | "complete";

export function ArrivalSequence({ onComplete }: { onComplete: () => void }) {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<ArrivalPhase>("signal");
  const finishRef = useRef<(() => void) | null>(null);

  const finish = useCallback(() => {
    finishRef.current?.();
  }, []);

  useEffect(() => {
    let cancelled = false;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const complete = () => {
      if (cancelled) return;
      if (ARRIVAL_ENABLE_SESSION_SKIP) sessionStorage.setItem(ARRIVAL_SESSION_KEY, "1");
      document.documentElement.style.overflow = previousOverflow;
      setPhase("complete");
      onComplete();
    };

    finishRef.current = complete;
    const previouslySeen = ARRIVAL_ENABLE_SESSION_SKIP && sessionStorage.getItem(ARRIVAL_SESSION_KEY);
    const timers: number[] = [];
    const at = (delay: number, callback: () => void) => {
      timers.push(window.setTimeout(callback, delay));
    };

    if (reduceMotion || previouslySeen) {
      setPhase("handoff");
      at(280, complete);
    } else {
      setPhase("signal");
      at(480, () => setPhase("materialize"));
      at(1450, () => setPhase("ignite"));
      at(2860, () => setPhase("handoff"));
      at(3520, complete);
    }

    return () => {
      cancelled = true;
      timers.forEach(window.clearTimeout);
      document.documentElement.style.overflow = previousOverflow;
      finishRef.current = null;
    };
  }, [onComplete, reduceMotion]);

  if (phase === "complete") return null;

  const assembled = phase === "materialize" || phase === "ignite" || phase === "handoff";
  const ignited = phase === "ignite" || phase === "handoff";

  return (
    <motion.section
      aria-label="Arrival sequence"
      initial={{ opacity: 1 }}
      animate={phase === "handoff" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: phase === "handoff" ? 0.65 : 0.2, ease: EASE_SIGNATURE }}
      className="arrival-stage"
    >
      <button className="arrival-skip" onClick={finish} type="button">
        Skip arrival <span aria-hidden="true">↗</span>
      </button>

      <motion.div
        className="arrival-signal"
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{
          scale: ignited ? 2.8 : assembled ? 1.4 : 1,
          opacity: ignited ? 0.45 : 1,
        }}
        transition={{ duration: ignited ? 0.9 : 0.45, ease: EASE_SIGNATURE }}
      />
      <div className="arrival-grid" data-visible={assembled} />
      <div className="arrival-dust" data-visible={assembled} />
      <div className="arrival-traces" data-visible={assembled}>
        <i />
        <i />
        <i />
      </div>

      <div className="arrival-copy" aria-hidden="true">
        <motion.p
          animate={{ opacity: phase === "signal" ? 1 : 0.6, y: assembled ? -7 : 0 }}
          transition={MOTION.standard}
        >
          INBOUND SIGNAL / 01
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={assembled ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ ...MOTION.cinematic, delay: 0.1 }}
        >
          MISSION CONTROL
        </motion.h2>
        <motion.span
          initial={{ opacity: 0 }}
          animate={ignited ? { opacity: 1 } : { opacity: 0 }}
          transition={MOTION.standard}
        >
          CORE / ONLINE
        </motion.span>
      </div>

      <motion.div
        className="arrival-core"
        initial={{ opacity: 0, scale: 0.7, rotateX: -25 }}
        animate={
          ignited
            ? { opacity: 1, scale: 1, rotateX: 0, rotateZ: 6 }
            : assembled
              ? { opacity: 0.7, scale: 0.85, rotateX: -14, rotateZ: 0 }
              : { opacity: 0, scale: 0.7, rotateX: -25 }
        }
        transition={{ duration: 0.9, ease: ignited ? EASE_ACCELERATE : EASE_SIGNATURE }}
      >
        <span />
        <span />
        <span />
      </motion.div>

      <motion.div
        className="arrival-flash"
        animate={ignited ? { opacity: [0, 0.85, 0] } : { opacity: 0 }}
        transition={{ duration: 0.7, ease: EASE_ACCELERATE }}
      />
    </motion.section>
  );
}
