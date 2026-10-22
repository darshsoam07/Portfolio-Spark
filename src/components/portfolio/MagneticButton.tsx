import { useRef } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  strength?: number;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
}

/**
 * MagneticButton - Awwwards-caliber magnetic CTA button with spring-damped proximity tracking.
 * Smoothly translates toward cursor on hover and snaps back elastically on leave.
 */
export function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  strength = 0.3,
  type = "button",
  ariaLabel,
  target,
  rel,
  disabled = false,
}: MagneticButtonProps) {
  const elementRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const currentTarget = e.currentTarget;
    const { clientX, clientY } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * strength;
    const y = (clientY - (top + height / 2)) * strength;

    gsap.to(currentTarget, {
      x,
      y,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  };

  if (href) {
    return (
      <a
        ref={elementRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        aria-label={ariaLabel}
        target={target}
        rel={rel}
        className={`inline-flex items-center justify-center will-change-transform ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={elementRef as React.RefObject<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center will-change-transform ${className}`}
    >
      {children}
    </button>
  );
}
