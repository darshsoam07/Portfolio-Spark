import { useEffect, useRef, useState } from "react";
import { useAnimate, useReducedMotion } from "motion/react";
import { ARRIVAL_ENABLE_SESSION_SKIP, ARRIVAL_SESSION_KEY, EASE_SIGNATURE } from "@/lib/motion";

type ArrivalPhase = "boot" | "materialize" | "ignite" | "launch" | "exit" | "complete";

export function ArrivalSequence({ onComplete }: { onComplete: () => void }) {
  const reduceMotion = useReducedMotion();
  const [scope, animate] = useAnimate();
  const [phase, setPhase] = useState<ArrivalPhase>("boot");
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const alreadySeen = ARRIVAL_ENABLE_SESSION_SKIP && sessionStorage.getItem(ARRIVAL_SESSION_KEY);
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    let cancelled = false;

    const finish = () => {
      document.documentElement.style.overflow = prevOverflow;
      if (ARRIVAL_ENABLE_SESSION_SKIP) sessionStorage.setItem(ARRIVAL_SESSION_KEY, "1");
      setPhase("complete");
      onComplete();
    };

    async function shortFade() {
      await animate(scope.current, { opacity: [1, 0] }, { duration: 0.25, delay: 0.1 });
      if (!cancelled) finish();
    }

    async function fullLaunch() {
      setPhase("boot");
      await animate("[data-boot-text]", { opacity: [0, 1] }, { duration: 0.3, delay: 0.15 });
      if (cancelled) return;

      setPhase("materialize");
      await animate(
        "[data-rocket]",
        { opacity: [0, 1], y: [30, 0], scale: [0.85, 1] },
        { duration: 0.55, ease: EASE_SIGNATURE, delay: 0.15 },
      );
      if (cancelled) return;

      setPhase("ignite");
      await animate(
        "[data-exhaust]",
        { opacity: [0, 1], scaleY: [0.3, 1] },
        { duration: 0.35, ease: "easeOut" },
      );
      if (cancelled) return;

      setPhase("launch");
      await Promise.all([
        animate(
          "[data-rocket-group]",
          { y: ["0vh", "-4vh", "-130vh"], scale: [1, 1, 0.7] },
          { duration: 1.15, ease: [0.6, 0, 0.85, 0.2], times: [0, 0.25, 1] },
        ),
        animate(
          "[data-exhaust]",
          { scaleY: [1, 2.4], opacity: [1, 0.85] },
          { duration: 1.15, ease: [0.6, 0, 0.85, 0.2] },
        ),
        animate(
          "[data-trail]",
          { opacity: [0, 0.8], scaleY: [0.2, 3] },
          { duration: 0.9, delay: 0.25, ease: "easeIn" },
        ),
      ]);
      if (cancelled) return;

      setPhase("exit");
      await animate("[data-flash]", { opacity: [0, 0.9, 0] }, { duration: 0.35, ease: "easeOut" });
      if (cancelled) return;

      await animate(scope.current, { opacity: [1, 0] }, { duration: 0.45, ease: EASE_SIGNATURE });
      if (cancelled) return;

      finish();
    }

    if (reduceMotion || alreadySeen) shortFade();
    else fullLaunch();

    return () => {
      cancelled = true;
      document.documentElement.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  if (phase === "complete") return null;

  return (
    <div
      ref={scope}
      aria-hidden="true"
      className="fixed inset-0 z-[300] bg-background flex items-center justify-center overflow-hidden pointer-events-none"
    >
      <div
        data-boot-text
        className="absolute top-1/2 -translate-y-24 opacity-0 flex flex-col items-center gap-2 font-mono text-[10px] tracking-[0.35em] text-primary uppercase"
      >
        <span>Portfolio.OS</span>
        <span className="text-muted-foreground">Initializing Experience</span>
      </div>

      <div data-rocket-group className="relative flex items-center justify-center">
        <div
          data-exhaust
          className="absolute -bottom-2 w-2 h-10 origin-top rounded-full bg-gradient-to-b from-primary via-primary/60 to-transparent opacity-0"
        />
        <div
          data-trail
          className="absolute -bottom-2 w-1 h-24 origin-top rounded-full bg-gradient-to-b from-primary/70 to-transparent opacity-0 blur-[2px]"
        />
        <div data-rocket className="opacity-0">
          <RocketMark />
        </div>
      </div>

      <div data-flash className="absolute inset-0 bg-primary opacity-0" />
    </div>
  );
}

function RocketMark() {
  return (
    <svg width="40" height="64" viewBox="0 0 40 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 2 C27 12 29 26 29 38 L29 48 L11 48 L11 38 C11 26 13 12 20 2Z"
        stroke="#22D3EE"
        strokeWidth="1.4"
        fill="#0A0A0A"
      />
      <circle cx="20" cy="24" r="4" stroke="#22D3EE" strokeWidth="1.2" fill="#0A0A0A" />
      <path d="M11 38 L3 50 L11 48Z" stroke="#22D3EE" strokeWidth="1.2" fill="#0A0A0A" />
      <path d="M29 38 L37 50 L29 48Z" stroke="#22D3EE" strokeWidth="1.2" fill="#0A0A0A" />
      <path d="M14 48 L26 48 L23 54 L17 54Z" stroke="#22D3EE" strokeWidth="1.2" fill="#0A0A0A" />
    </svg>
  );
}
