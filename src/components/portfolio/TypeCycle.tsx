import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const ROLES = [
  "DevOps Engineer",
  "Cloud Architect",
  "Automation Enthusiast",
  "Site Reliability Engineer",
];

export function TypeCycle({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [text, setText] = useState(reduced ? ROLES[0] : "");
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const full = ROLES[i];
    if (!erasing && text === full) {
      const t = setTimeout(() => setErasing(true), 1800);
      return () => clearTimeout(t);
    }
    if (erasing && text === "") {
      setErasing(false);
      setI((p) => (p + 1) % ROLES.length);
      return;
    }
    const t = setTimeout(
      () =>
        setText((prev) => (erasing ? full.slice(0, prev.length - 1) : full.slice(0, prev.length + 1))),
      erasing ? 40 : 60,
    );
    return () => clearTimeout(t);
  }, [text, erasing, i, reduced]);

  return (
    <span className={className} aria-label="DevOps Engineer, Cloud Architect, Automation Enthusiast, Site Reliability Engineer">
      {text}
      <span className="type-caret" aria-hidden="true" />
    </span>
  );
}
