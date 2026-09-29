import { useEffect, useRef } from "react";
import gsap from "gsap";
import portrait from "@/assets-portrait.jpg";
import { PROFILE } from "@/data/portfolio";

interface HeroSectionProps {
  isTriggered?: boolean;
}

export function HeroSection({ isTriggered = true }: HeroSectionProps) {
  const heroRootRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const summaryRef = useRef<HTMLParagraphElement>(null);
  const portraitCardRef = useRef<HTMLDivElement>(null);
  const telemetryHudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isTriggered) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Initial state reset
      gsap.set(
        [
          badgeRef.current,
          nameRef.current,
          roleRef.current,
          summaryRef.current,
          portraitCardRef.current,
          telemetryHudRef.current,
        ],
        { opacity: 0, y: 30 }
      );

      // Kinetic Stagger Chain
      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 0.1,
      })
        .to(
          nameRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "expo.out",
          },
          "-=0.5"
        )
        .to(
          roleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.6"
        )
        .to(
          portraitCardRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.0,
            ease: "back.out(1.2)",
          },
          "-=0.7"
        )
        .to(
          summaryRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.6"
        )
        .to(
          telemetryHudRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.5"
        );
    }, heroRootRef);

    return () => ctx.revert();
  }, [isTriggered]);

  return (
    <section
      ref={heroRootRef}
      id="surface"
      className="relative min-h-screen w-full flex items-center justify-center px-6 pt-28 pb-16 overflow-hidden"
    >
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Editorial Information */}
        <div className="lg:col-span-7 flex flex-col items-start gap-5">
          {/* Telemetry Capsule Badge */}
          <div
            ref={badgeRef}
            className="flex items-center gap-2.5 rounded-full border border-amber-900/50 bg-[#0d1017]/80 px-3.5 py-1.5 font-mono text-xs text-amber-400 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.1)]"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="tracking-wider">EXPOSITION LOG // 00-01: THE DESCENT</span>
          </div>

          {/* Name Header with Editorial Serif */}
          <h1
            ref={nameRef}
            className="display-serif text-6xl sm:text-7xl lg:text-8xl tracking-tight text-[#f4ecd8] leading-[1.05]"
          >
            Darsh{" "}
            <span className="bg-gradient-to-r from-brass-200 via-brass-300 to-brass-500 bg-clip-text font-medium italic text-transparent">
              Soam
            </span>
          </h1>

          {/* Role Monospace Title */}
          <p
            ref={roleRef}
            className="font-mono text-lg sm:text-xl text-amber-500 tracking-wide font-medium"
          >
            Cloud & DevOps Engineer
          </p>

          {/* Crisp Summary Statement */}
          <p
            ref={summaryRef}
            className="text-base sm:text-lg text-fog font-light leading-relaxed max-w-xl"
          >
            {PROFILE.subheadline} This is the descent — scroll to dive through every layer
            of the stack, down to the black box.
          </p>

          {/* Telemetry Strip */}
          <div
            ref={telemetryHudRef}
            className="mt-4 flex flex-wrap items-center gap-6 border-t border-white/10 pt-6 font-mono text-xs text-fog"
          >
            <div>
              <span className="block text-[10px] uppercase text-faint">INFRASTRUCTURE</span>
              <span className="text-paper">AWS // TERRAFORM</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase text-faint">CONTAINERS</span>
              <span className="text-paper">KUBERNETES // DOCKER</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase text-faint">OBSERVABILITY</span>
              <span className="text-brass-300">CLOUDWATCH // PROMETHEUS</span>
            </div>
          </div>
        </div>

        {/* Right Column: Holographic Specimen Portrait */}
        <div className="lg:col-span-5 flex justify-center">
          <div
            ref={portraitCardRef}
            className="relative group w-72 sm:w-80 aspect-[4/5] rounded-2xl p-2 border border-brass-400/25 bg-gradient-to-b from-[#111722]/80 to-[#06080d]/90 shadow-2xl backdrop-blur-md overflow-hidden"
          >
            {/* Subtle Amber Glow Accent */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brass-400/20 to-brass-600/0 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative h-full w-full rounded-xl overflow-hidden grayscale contrast-125 hover:grayscale-0 transition-all duration-700">
              <img
                src={portrait}
                alt="Darsh Soam"
                className="h-full w-full object-cover object-top scale-105 group-hover:scale-100 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030407] via-transparent to-transparent opacity-80" />

              {/* Technical Reticle Overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] text-brass-300/90 bg-black/60 px-3 py-1.5 rounded border border-brass-400/30 backdrop-blur-sm">
                <span>SPECIMEN // DARSH.SOAM</span>
                <span className="text-emerald-400">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
