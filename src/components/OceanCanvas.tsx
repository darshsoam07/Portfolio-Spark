import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  phase: number;
  speed: number;
  kind: 0 | 1; // 0 = marine snow, 1 = plankton
}

/**
 * Fixed full-viewport canvas: drifting marine snow + bioluminescent plankton.
 * Plankton glow intensifies with depth; both react gently to the cursor.
 */
export function OceanCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = 0;
    let h = 0;
    let raf = 0;
    let t = Math.random() * 100;
    const mouse = { x: -9999, y: -9999 };
    let parts: Particle[] = [];

    // Pre-rendered glow sprite for cheap bioluminescence
    const sprite = document.createElement("canvas");
    sprite.width = 64;
    sprite.height = 64;
    const sctx = sprite.getContext("2d")!;
    const grad = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(125,249,255,1)");
    grad.addColorStop(0.25, "rgba(34,211,238,0.65)");
    grad.addColorStop(0.6, "rgba(34,211,238,0.18)");
    grad.addColorStop(1, "rgba(34,211,238,0)");
    sctx.fillStyle = grad;
    sctx.fillRect(0, 0, 64, 64);

    const seed = () => {
      parts = [];
      const snow = Math.round((w * h) / 16000);
      const plankton = Math.round((w * h) / 26000);
      for (let i = 0; i < snow; i++) {
        parts.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.6 + Math.random() * 1.6,
          vx: (Math.random() - 0.5) * 0.12,
          vy: 0.12 + Math.random() * 0.4,
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 0.8,
          kind: 0,
        });
      }
      for (let i = 0; i < plankton; i++) {
        parts.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 1 + Math.random() * 1.8,
          vx: (Math.random() - 0.5) * 0.1,
          vy: -(0.08 + Math.random() * 0.3),
          phase: Math.random() * Math.PI * 2,
          speed: 0.8 + Math.random() * 1.6,
          kind: 1,
        });
      }
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const frame = () => {
      t += 0.016;
      const doc = document.documentElement.scrollHeight - window.innerHeight;
      const p = doc > 0 ? Math.min(1, Math.max(0, window.scrollY / doc)) : 0;
      ctx.clearRect(0, 0, w, h);

      for (const pt of parts) {
        pt.x += pt.vx + Math.sin(t * pt.speed + pt.phase) * 0.16;
        pt.y += pt.vy;

        const dx = pt.x - mouse.x;
        const dy = pt.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 19600 && d2 > 1) {
          const d = Math.sqrt(d2);
          const f = ((140 - d) / 140) * 1.4;
          pt.x += (dx / d) * f;
          pt.y += (dy / d) * f;
        }

        if (pt.y > h + 12) { pt.y = -12; pt.x = Math.random() * w; }
        if (pt.y < -12) { pt.y = h + 12; pt.x = Math.random() * w; }
        if (pt.x > w + 12) pt.x = -12;
        if (pt.x < -12) pt.x = w + 12;

        if (pt.kind === 0) {
          const tw = 0.5 + 0.5 * Math.sin(t * pt.speed + pt.phase);
          const a = (0.1 + 0.28 * tw) * (1 - p * 0.55);
          ctx.fillStyle = `rgba(186,230,253,${a.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.r, 0, 6.2832);
          ctx.fill();
        } else {
          const tw = 0.5 + 0.5 * Math.sin(t * pt.speed * 2 + pt.phase);
          const a = (0.2 + 0.6 * tw) * (0.3 + 0.7 * p);
          const s = pt.r * 7;
          ctx.globalAlpha = Math.min(1, a);
          ctx.drawImage(sprite, pt.x - s / 2, pt.y - s / 2, s, s);
          ctx.globalAlpha = 1;
        }
      }

      if (!reduced) raf = requestAnimationFrame(frame);
    };

    resize();
    frame();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5]"
    />
  );
}
