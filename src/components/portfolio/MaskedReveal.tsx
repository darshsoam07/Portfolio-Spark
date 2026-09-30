import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MaskedRevealProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  delay?: number;
  duration?: number;
  inline?: boolean;
}

/**
 * MaskedReveal - Awwwards-caliber masked scroll reveal animation.
 * Wraps major typography/metrics in an overflow-hidden block and smoothly
 * reveals inner elements from translateY(100%) to translateY(0%) via GSAP ScrollTrigger with ease: "power4.out".
 */
export function MaskedReveal({
  children,
  className = "",
  innerClassName = "",
  delay = 0,
  duration = 1.1,
  inline = false,
}: MaskedRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(inner, { yPercent: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { yPercent: 100, opacity: 0.1 },
        {
          yPercent: 0,
          opacity: 1,
          duration,
          delay,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, duration]);

  const wrapperClass = inline
    ? `inline-block overflow-hidden align-bottom ${className}`
    : `block overflow-hidden ${className}`;

  const innerClass = inline
    ? `inline-block will-change-transform ${innerClassName}`
    : `block will-change-transform ${innerClassName}`;

  return (
    <div ref={containerRef} className={wrapperClass}>
      <div ref={innerRef} className={innerClass}>
        {children}
      </div>
    </div>
  );
}
