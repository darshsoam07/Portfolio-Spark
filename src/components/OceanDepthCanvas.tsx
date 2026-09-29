import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Particle {
  x: number;
  y: number;
  size: number;
  baseSpeedY: number;
  speedX: number;
  alpha: number;
}

export default function OceanDepthCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particleCount = 75;
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.6,
      baseSpeedY: -(Math.random() * 0.35 + 0.1),
      speedX: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.45 + 0.15,
    }));

    let scrollProgress = 0;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        scrollProgress = self.progress;
      },
    });

    const zoneColors = [
      { stop: 0.0, r: 11, g: 15, b: 23 },   // Sunlight / Surface
      { stop: 0.25, r: 8, g: 12, b: 19 },   // Twilight
      { stop: 0.55, r: 5, g: 8, b: 14 },    // Midnight
      { stop: 0.8, r: 3, g: 5, b: 9 },      // Abyssal
      { stop: 1.0, r: 2, g: 3, b: 5 },      // Hadal (Void)
    ];

    const interpolateColor = (progress: number) => {
      let lower = zoneColors[0];
      let upper = zoneColors[zoneColors.length - 1];

      for (let i = 0; i < zoneColors.length - 1; i++) {
        if (progress >= zoneColors[i].stop && progress <= zoneColors[i + 1].stop) {
          lower = zoneColors[i];
          upper = zoneColors[i + 1];
          break;
        }
      }

      const range = upper.stop - lower.stop;
      const factor = range === 0 ? 0 : (progress - lower.stop) / range;

      const r = Math.round(lower.r + (upper.r - lower.r) * factor);
      const g = Math.round(lower.g + (upper.g - lower.g) * factor);
      const b = Math.round(lower.b + (upper.b - lower.b) * factor);

      return `rgb(${r}, ${g}, ${b})`;
    };

    const render = () => {
      const currentScrollY = window.scrollY;
      const rawVelocity = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Smooth velocity decay
      scrollVelocity += (rawVelocity - scrollVelocity) * 0.1;

      // Clear & fill background gradient
      ctx.fillStyle = interpolateColor(scrollProgress);
      ctx.fillRect(0, 0, width, height);

      // Render particulate
      particles.forEach((p) => {
        p.y += p.baseSpeedY - scrollVelocity * 0.2;
        p.x += p.speedX;

        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // Using brass accent palette rgba(201, 163, 95)
        ctx.fillStyle = `rgba(201, 163, 95, ${p.alpha * (1 - scrollProgress * 0.5)})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = "rgba(201, 163, 95, 0.4)";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      st.kill();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 h-full w-full"
    />
  );
}
