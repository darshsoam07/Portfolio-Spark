import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ArrivalTunnelProps {
  onFinish?: () => void;
  onComplete?: () => void;
}

interface PhosphorParticle {
  x: number;
  y: number;
  z: number;
  pz: number;
  hueIndex: number;
  size: number;
}

// Precomputed strokeStyle lookup table to avoid dynamic string creation in RAF loop
const ALPHA_BUCKETS = 25;
const HUE_BUCKETS = 5;
const STROKE_PALETTE: string[][] = Array.from({ length: ALPHA_BUCKETS + 1 }, (_, a) => {
  const alpha = (a / ALPHA_BUCKETS).toFixed(2);
  return Array.from({ length: HUE_BUCKETS }, (_, h) => {
    const r = (245 + (h - 2) * 5) | 0;
    const g = (158 + (h - 2) * 8) | 0;
    return `rgba(${r},${g},11,${alpha})`;
  });
});

const FRINGE_PALETTE: string[] = Array.from({ length: ALPHA_BUCKETS + 1 }, (_, a) => {
  const alpha = ((a / ALPHA_BUCKETS) * 0.35).toFixed(2);
  return `rgba(217,119,6,${alpha})`;
});

export function ArrivalTunnel({ onFinish, onComplete }: ArrivalTunnelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Decoupled DOM refs: Zero React state thrashing
  const percentTextRef = useRef<HTMLSpanElement>(null);
  const statusTextRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const animationFrameRef = useRef<number>(0);
  const hasFinishedRef = useRef<boolean>(false);

  const finishIntro = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    cancelAnimationFrame(animationFrameRef.current);
    document.body.style.overflow = "";

    const notifyComplete = () => {
      onFinish?.();
      onComplete?.();
    };

    if (containerRef.current) {
      gsap.timeline({ onComplete: notifyComplete })
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
    } else {
      notifyComplete();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishIntro();
      return;
    }

    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Cap canvas pixel ratio at Math.min(window.devicePixelRatio || 1, 1.5)
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = (width * dpr) | 0;
      canvas.height = (height * dpr) | 0;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // 850 Phosphor Telemetry Particles
    const particleCount = 850;
    const fov = 320;
    const maxZ = 1600;
    const particles: PhosphorParticle[] = Array.from({ length: particleCount }, () => ({
      x: ((Math.random() - 0.5) * width * 2.2) | 0,
      y: ((Math.random() - 0.5) * height * 2.2) | 0,
      z: (Math.random() * maxZ) | 0,
      pz: maxZ,
      hueIndex: Math.floor(Math.random() * HUE_BUCKETS),
      size: Math.random() * 1.6 + 0.8,
    }));

    const warpState = {
      speed: 1.2,
      glowRadius: 0,
      glowAlpha: 0.15,
      streakLength: 1.0,
      chromaticAberration: 0,
    };

    // GSAP Timeline mutating DOM refs directly — ZERO React state re-renders
    const tl = gsap.timeline({
      onComplete: finishIntro,
    });

    tl.to(warpState, {
      speed: 7.5,
      streakLength: 1.8,
      duration: 1.1,
      ease: "power2.in",
      onUpdate: () => {
        const p = Math.round(tl.progress() * 40);
        if (percentTextRef.current) percentTextRef.current.textContent = p.toString().padStart(2, "0");
        if (progressBarRef.current) progressBarRef.current.style.width = `${p}%`;
        if (statusTextRef.current) statusTextRef.current.textContent = "INITIALIZING DISTRIBUTED CLUSTER NODES // 60HZ NOMINAL";
      },
    })
      .to(warpState, {
        speed: 35,
        streakLength: 4.2,
        glowAlpha: 0.55,
        glowRadius: 12,
        chromaticAberration: 2,
        duration: 1.2,
        ease: "power2.inOut",
        onUpdate: () => {
          const p = Math.round(40 + (tl.progress() - 0.44) * 95);
          const capped = Math.min(p, 94);
          if (percentTextRef.current) percentTextRef.current.textContent = capped.toString().padStart(2, "0");
          if (progressBarRef.current) progressBarRef.current.style.width = `${capped}%`;
          if (statusTextRef.current) statusTextRef.current.textContent = "ORCHESTRATING RUNTIME & TERRAFORM STATE // AWS US-EAST-1";
        },
      })
      .to(warpState, {
        speed: 85,
        streakLength: 7.5,
        glowAlpha: 1.0,
        glowRadius: 28,
        chromaticAberration: 5,
        duration: 0.5,
        ease: "expo.in",
        onUpdate: () => {
          if (percentTextRef.current) percentTextRef.current.textContent = "100";
          if (progressBarRef.current) progressBarRef.current.style.width = "100%";
          if (statusTextRef.current) statusTextRef.current.textContent = "DISTRIBUTED MESH SYNCHRONIZED // ENTERPRISE SYSTEMS ONLINE";
        },
      });

    const render = () => {
      ctx.fillStyle = "rgba(4, 5, 8, 0.24)";
      ctx.fillRect(0, 0, width, height);

      const cx = (width / 2) | 0;
      const cy = (height / 2) | 0;

      ctx.save();
      if (warpState.glowRadius > 0) {
        ctx.shadowBlur = warpState.glowRadius;
        ctx.shadowColor = `rgba(245, 158, 11, ${warpState.glowAlpha})`;
      }

      const aberration = warpState.chromaticAberration | 0;

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.pz = p.z;
        p.z -= warpState.speed;

        if (p.z <= 0) {
          p.x = ((Math.random() - 0.5) * width * 2.2) | 0;
          p.y = ((Math.random() - 0.5) * height * 2.2) | 0;
          p.z = maxZ;
          p.pz = maxZ;
        }

        const k = fov / p.z;
        const px = (p.x * k + cx) | 0;
        const py = (p.y * k + cy) | 0;

        const pk = fov / p.pz;
        const prevPx = (p.x * pk + cx) | 0;
        const prevPy = (p.y * pk + cy) | 0;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const depthRatio = 1 - p.z / maxZ;
          const alphaVal = depthRatio * 1.4;
          const bucket = alphaVal >= 1 ? ALPHA_BUCKETS : (alphaVal * ALPHA_BUCKETS) | 0;

          // Integer math & zero string allocation inside draw loop
          ctx.beginPath();
          ctx.moveTo(prevPx, prevPy);
          ctx.lineTo(px, py);
          ctx.strokeStyle = STROKE_PALETTE[bucket][p.hueIndex];
          ctx.lineWidth = Math.min(3, (depthRatio * p.size * 2.4) | 0 || 1);
          ctx.lineCap = "round";
          ctx.stroke();

          if (aberration > 1) {
            ctx.beginPath();
            ctx.moveTo(prevPx + aberration, prevPy);
            ctx.lineTo(px + aberration, py);
            ctx.strokeStyle = FRINGE_PALETTE[bucket];
            ctx.stroke();
          }
        }
      }

      ctx.restore();
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.code === "Space") {
        finishIntro();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(animationFrameRef.current);
      tl.kill();
      document.body.style.overflow = origOverflow;
    };
  }, []);

  return (
    <div
      id="arrival-tunnel"
      ref={containerRef}
      style={{ transform: "translate3d(0,0,0)", willChange: "transform, opacity" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-[#030407] p-8 select-none overflow-hidden font-mono"
    >
      {/* CRT Scanline & Phosphor Vignette Layer */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px]" />
      <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(3,4,7,0.85)_100%)]" />

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none" />

      {/* Top Telemetry Header — Clean solid styling without expensive backdrop-blur */}
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

      {/* Center Kinetic HUD Cluster — Direct DOM references: ZERO React state thrashing */}
      <div className="relative z-30 flex flex-col items-center gap-3">
        <div className="relative">
          <div className="text-7xl sm:text-9xl font-black tracking-tighter text-[#fef3c7] drop-shadow-[0_0_20px_rgba(245,158,11,0.45)]">
            <span ref={percentTextRef}>00</span>
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

      {/* Bottom Telemetry & Bypass — Clean solid styling */}
      <div className="relative z-30 flex w-full max-w-6xl items-center justify-between border-t border-amber-950/60 bg-[#030407]/95 px-4 py-2.5 text-[10px] text-zinc-400">
        <span className="text-zinc-500 font-mono">NODE: US-EAST-1A // COORD: 28.9845° N, 77.7064° E</span>
        <button
          onClick={finishIntro}
          className="group flex items-center gap-1.5 text-amber-500/80 hover:text-amber-400 transition-colors cursor-pointer"
        >
          <span className="tracking-wider">[SPACE / ESC] BYPASS SEQUENCE</span>
          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
        </button>
      </div>
    </div>
  );
}
