import { useRef } from "react";
import gsap from "gsap";

interface MotionCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glowColor?: string;
  disableTilt?: boolean;
  onClick?: () => void;
}

/**
 * MotionCard - Awwwards-caliber spotlight border card primitive with cursor tracking & spring tilt.
 * Sets CSS variables --mouse-x and --mouse-y on mousemove to illuminate precision border.
 */
export function MotionCard({
  children,
  className = "",
  intensity = 6,
  glowColor = "rgba(245, 158, 11, 0.25)",
  disableTilt = false,
  onClick,
}: MotionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Attach dynamic mousemove listener setting CSS variables
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);

    if (disableTilt) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (x - cx) / cx;
    const dy = (y - cy) / cy;

    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateX: -dy * intensity,
        rotateY: dx * intensity,
        scale: 1.01,
        duration: 0.3,
        ease: "power2.out",
        transformPerspective: 1000,
      });
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || disableTilt) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      style={{
        transformStyle: "preserve-3d",
      }}
      className={`group relative overflow-hidden glass-surface will-change-transform ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {/* Spotlight Dynamic Border Overlay */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-10"
        style={{
          background:
            "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245, 158, 11, 0.25), transparent 80%)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {/* Ambient Surface Spotlight Glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-0"
        style={{
          background:
            "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245, 158, 11, 0.08), transparent 80%)",
        }}
      />

      <div className="relative z-[1] w-full h-full">
        {children}
      </div>
    </div>
  );
}
