import { useReducedMotion } from "motion/react";
import { useCallback, useRef } from "react";

type InfrastructureCoreProps = {
  className?: string;
  compact?: boolean;
  label?: string;
};

export function InfrastructureCore({
  className = "",
  compact = false,
  label = "Interactive infrastructure core",
}: InfrastructureCoreProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (reduceMotion || !ref.current || event.pointerType === "touch") return;
      const bounds = ref.current.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      ref.current.style.setProperty("--core-rotate-x", `${-y * 14}deg`);
      ref.current.style.setProperty("--core-rotate-y", `${x * 18}deg`);
      ref.current.style.setProperty("--core-shift-x", `${x * 16}px`);
      ref.current.style.setProperty("--core-shift-y", `${y * 14}px`);
    },
    [reduceMotion],
  );

  const onPointerLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.setProperty("--core-rotate-x", "0deg");
    ref.current.style.setProperty("--core-rotate-y", "0deg");
    ref.current.style.setProperty("--core-shift-x", "0px");
    ref.current.style.setProperty("--core-shift-y", "0px");
  }, []);

  return (
    <div
      ref={ref}
      className={`infrastructure-core ${compact ? "infrastructure-core--compact" : ""} ${className}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      role="img"
      aria-label={label}
    >
      <div className="core-haze" />
      <div className="core-orbit core-orbit--outer" />
      <div className="core-orbit core-orbit--inner" />
      <div className="core-assembly">
        <span className="core-plane core-plane--back" />
        <span className="core-plane core-plane--left" />
        <span className="core-plane core-plane--right" />
        <span className="core-plane core-plane--front" />
        <span className="core-heart" />
        <span className="core-scan" />
      </div>
      <div className="core-telemetry core-telemetry--north">LATENCY / 08 MS</div>
      <div className="core-telemetry core-telemetry--east">US-EAST / READY</div>
      <div className="core-telemetry core-telemetry--south">K8S / NOMINAL</div>
      <div className="core-telemetry core-telemetry--west">CI/CD / ACTIVE</div>
    </div>
  );
}
