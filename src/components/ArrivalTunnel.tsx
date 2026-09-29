import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ArrivalTunnelProps {
  onComplete: () => void;
}

interface PhosphorParticle {
  x: number;
  y: number;
  z: number;
  pz: number;
  hueOffset: number;
  size: number;
}

export default function ArrivalTunnel({ onComplete }: ArrivalTunnelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressNumberRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const statusTextRef = useRef<HTMLDivElement>(null);

  const animationFrameRef = useRef<number>(0);
  const hasFinishedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Respect reduced motion preferences
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
      return;
    }

    document.body.style.overflow = "hidden";

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    // Layered enterprise telemetry particle field (850 nodes)
    const particleCount = 850;
    const fov = 320;
    const maxZ = 1600;
    const particles: PhosphorParticle[] = Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * width * 2.2,
      y: (Math.random() - 0.5) * height * 2.2,
      z: Math.random() * maxZ,
      pz: maxZ,
      hueOffset: (Math.random() - 0.5) * 14, // Amber-to-gold chromatic variance
      size: Math.random() * 1.6 + 0.8,
    }));

    const warpState = {
      speed: 1.2,
      glowRadius: 0,
      glowAlpha: 0.15,
      streakLength: 1.0,
      chromaticAberration: 0,
    };

    // Helper for direct DOM mutation - Zero React State Thrashing
    const updateHud = (percent: number, status: string) => {
      if (progressNumberRef.current) {
        progressNumberRef.current.textContent = percent.toString().padStart(2, "0");
      }
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${percent}%`;
      }
      if (statusTextRef.current) {
        statusTextRef.current.textContent = status;
      }
    };

    const tl = gsap.timeline({
      onComplete: () => finishArrival(),
    });

    tl.to(warpState, {
      speed: 7.5,
      streakLength: 1.8,
      duration: 1.1,
      ease: "power2.in",
      onUpdate: () => {
        const val = Math.round(tl.progress() * 40);
        updateHud(val, "INITIALIZING DISTRIBUTED CLUSTER NODES // 60HZ NOMINAL");
      },
    })
      .to(warpState, {
        speed: 34,
        streakLength: 4.2,
        glowAlpha: 0.55,
        glowRadius: 12,
        chromaticAberration: 2.2,
        duration: 1.3,
        ease: "power3.inOut",
        onUpdate: () => {
          const val = Math.round(40 + (tl.progress() - 0.44) * 95);
          updateHud(Math.min(val, 94), "ORCHESTRATING RUNTIME & TERRAFORM STATE // AWS US-EAST-1");
        },
      })
      .to(warpState, {
        speed: 85,
        streakLength: 7.5,
        glowAlpha: 1.0,
        glowRadius: 28,
        chromaticAberration: 5.0,
        duration: 0.5,
        ease: "expo.in",
        onUpdate: () => {
          updateHud(100, "DISTRIBUTED MESH SYNCHRONIZED // ENTERPRISE SYSTEMS ONLINE");
        },
      });

    const render = () => {
      // CRT Phosphor Persistence trail (amber-tinted dark back-buffer)
      ctx.fillStyle = "rgba(4, 5, 8, 0.24)";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      ctx.save();
      if (warpState.glowRadius > 0) {
        ctx.shadowBlur = warpState.glowRadius;
        ctx.shadowColor = `rgba(245, 158, 11, ${warpState.glowAlpha})`;
      }

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.pz = p.z;
        p.z -= warpState.speed;

        if (p.z <= 0) {
          p.x = (Math.random() - 0.5) * width * 2.2;
          p.y = (Math.random() - 0.5) * height * 2.2;
          p.z = maxZ;
          p.pz = maxZ;
        }

        const k = fov / p.z;
        const px = p.x * k + cx;
        const py = p.y * k + cy;

        const pk = fov / p.pz;
        const prevPx = p.x * pk + cx;
        const prevPy = p.y * pk + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const depthRatio = 1 - p.z / maxZ;
          const alpha = Math.min(1, depthRatio * 1.4);

          // Phosphor core stroke
          ctx.beginPath();
          ctx.moveTo(prevPx, prevPy);
          ctx.lineTo(px, py);

          ctx.strokeStyle = `rgba(${Math.round(245 + p.hueOffset)}, ${Math.round(158 + p.hueOffset * 2)}, 11, ${alpha})`;
          ctx.lineWidth = Math.min(3.0, depthRatio * p.size * 2.4);
          ctx.lineCap = "round";
          ctx.stroke();

          // High-speed chromatic aberration fringing
          if (warpState.chromaticAberration > 1) {
            ctx.beginPath();
            ctx.moveTo(prevPx + warpState.chromaticAberration, prevPy);
            ctx.lineTo(px + warpState.chromaticAberration, py);
            ctx.strokeStyle = `rgba(217, 119, 6, ${alpha * 0.35})`;
            ctx.stroke();
          }
        }
      }

      ctx.restore();
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    const finishArrival = () => {
      if (hasFinishedRef.current) return;
      hasFinishedRef.current = true;

      cancelAnimationFrame(animationFrameRef.current);
      tl.kill();
      document.body.style.overflow = "";

      // Camera push & phosphor flash into hero - smooth GPU exit
      const tlExit = gsap.timeline({
        onComplete: () => onComplete(),
      });

      tlExit
        .to(containerRef.current, {
          backgroundColor: "#f59e0b",
          duration: 0.12,
          ease: "power4.in",
        })
        .to(containerRef.current, {
          scale: 1.12,
          opacity: 0,
          duration: 0.55,
          ease: "expo.out",
        });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.code === "Space") {
        finishArrival();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(animationFrameRef.current);
      document.body.style.overflow = "";
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{ transform: "translate3d(0,0,0)", willChange: "transform, opacity" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-[#030407] p-8 select-none overflow-hidden font-mono"
    >
      {/* CRT Scanline & Phosphor Vignette Layer */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px]" />
      <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(3,4,7,0.85)_100%)]" />

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none" />

      {/* Top Telemetry Header - Solid sleek dark without expensive backdrop-blur */}
      <div className="relative z-30 flex w-full max-w-6xl items-center justify-between border-b border-amber-950/60 bg-[#030407]/95 px-4 py-2.5 text-[11px]">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_#f59e0b]" />
          <span className="tracking-widest text-[#f59e0b] font-semibold">
            SYS-BOOT // ENTERPRISE CLOUD RUNTIME
          </span>
        </div>
        <div className="tracking-widest text-zinc-400 uppercase hidden sm:block">
          TOPOLOGY: AWS MULTI-REGION // VPC FABRIC
        </div>
      </div>

      {/* Center Kinetic HUD Cluster - Direct DOM refs for zero state thrashing */}
      <div className="relative z-30 flex flex-col items-center gap-3">
        <div className="relative">
          <div className="text-7xl sm:text-9xl font-black tracking-tighter text-[#fef3c7] drop-shadow-[0_0_20px_rgba(245,158,11,0.45)]">
            <span ref={progressNumberRef}>00</span>
            <span className="text-2xl sm:text-4xl text-amber-500 font-light ml-1">%</span>
          </div>
        </div>

        {/* Phosphor Fuel Bar */}
        <div className="h-[3px] w-56 bg-zinc-900 border border-amber-950 rounded-full overflow-hidden p-[1px]">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-amber-700 via-amber-500 to-amber-300 shadow-[0_0_12px_#f59e0b]"
            style={{ width: "0%" }}
          />
        </div>

        <div
          ref={statusTextRef}
          className="text-[11px] tracking-widest text-amber-400/90 uppercase mt-2 font-medium"
        >
          CALIBRATING CLUSTER TELEMETRY // 60HZ NOMINAL
        </div>
      </div>

      {/* Bottom Telemetry & Bypass - Solid sleek dark without expensive backdrop-blur */}
      <div className="relative z-30 flex w-full max-w-6xl items-center justify-between border-t border-amber-950/60 bg-[#030407]/95 px-4 py-2.5 text-[10px] text-zinc-400">
        <span className="text-zinc-500 font-mono">NODE: US-EAST-1A // COORD: 28.9845° N, 77.7064° E</span>
        <button
          onClick={() => {
            if (containerRef.current) {
              document.body.style.overflow = "";
              gsap.to(containerRef.current, {
                opacity: 0,
                duration: 0.35,
                ease: "power2.inOut",
                onComplete,
              });
            }
          }}
          className="group flex items-center gap-1.5 text-amber-500/80 hover:text-amber-400 transition-colors cursor-pointer"
        >
          <span className="tracking-wider">[SPACE / ESC] BYPASS SEQUENCE</span>
          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
        </button>
      </div>
    </div>
  );
}
