import { useRef, useState } from "react";
import { motion } from "motion/react";

interface MotionCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glowColor?: string;
  disableTilt?: boolean;
}

/**
 * MotionCard - reusable glass-surface card primitive with cursor-tracking tilt.
 * Use for: project cards, experience, education, major skill surfaces.
 * Do NOT wrap every div in MotionCard.
 */
export function MotionCard({
  children,
  className = "",
  intensity = 6,
  glowColor = "rgba(183, 255, 60, 0.12)",
  disableTilt = false,
}: MotionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });

  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disableTilt || prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);

    setTransform({
      rotateX: -dy * intensity,
      rotateY: dx * intensity,
      scale: 1.012,
    });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0, scale: 1 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: transform.rotateX,
        rotateY: transform.rotateY,
        scale: transform.scale,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.5 }}
      className={`relative glass-surface ${className}`}
      whileHover={{
        boxShadow: `0 0 32px -8px ${glowColor}`,
      }}
    >
      {children}
    </motion.div>
  );
}
