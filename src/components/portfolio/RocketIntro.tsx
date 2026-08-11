import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Rocket } from "lucide-react";

const SESSION_KEY = "rocket-intro-seen";

export function RocketIntro() {
  const reduceMotion = useReducedMotion();
  const [show, setShow] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (seen || reduceMotion) return;

    setShow(true);
    document.documentElement.style.overflow = "hidden";

    const exitTimer = setTimeout(() => setExiting(true), 1900);
    const doneTimer = setTimeout(finish, 2500);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [reduceMotion]);

  function finish() {
    setShow(false);
    document.documentElement.style.overflow = "";
    sessionStorage.setItem(SESSION_KEY, "1");
  }

  function skip() {
    setExiting(true);
    setTimeout(finish, 500);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="rocket-intro"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: exiting ? 0 : 1, y: exiting ? "-100%" : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onClick={skip}
          className="fixed inset-0 z-[200] bg-background flex items-center justify-center cursor-pointer overflow-hidden"
        >
          {/* rocket + flame travel together */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ y: "60vh", opacity: 0 }}
            animate={{ y: ["60vh", "6vh", "0vh"], opacity: 1 }}
            transition={{ duration: 1.5, times: [0, 0.75, 1], ease: [0.16, 1, 0.3, 1] }}
          >
            {/* flame glow trailing below */}
            <motion.div
              className="absolute -bottom-8 w-3 h-16 rounded-full bg-gradient-to-t from-primary via-orange-400 to-transparent blur-md"
              animate={{ scaleY: [1, 1.6, 0.8], opacity: [0.6, 0.9, 0.3] }}
              transition={{ duration: 0.45, repeat: Infinity, repeatType: "mirror" }}
            />
            {/* idle bob once "landed" */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            >
              <Rocket
                className="w-16 h-16 text-primary"
                strokeWidth={1.5}
                style={{ transform: "rotate(45deg)" }}
              />
            </motion.div>
          </motion.div>

          {/* touchdown ring pulse */}
          <motion.span
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: [0, 0.5, 0], scale: [0.4, 2.2, 2.6] }}
            transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
            className="absolute w-24 h-24 rounded-full border border-primary/60"
          />

          <span className="absolute bottom-10 font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
            Tap to skip
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}