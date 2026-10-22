interface Stop {
  top: string;
  mid: string;
  bot: string;
}

// One gradient stop per zone, in ZONES order:
// surface → sunlight → twilight → midnight → abyssal → hadal → ascent.
// Deliberately dark throughout: the surface is a moonlit sea, not midday.
// Light lives in the god-rays and the brass accents, never in the wash.
const STOPS: Stop[] = [
  { top: "#101c33", mid: "#0a1322", bot: "#060d1a" },
  { top: "#0a1322", mid: "#060d1a", bot: "#040a15" },
  { top: "#040a15", mid: "#030812", bot: "#02060d" },
  { top: "#02060d", mid: "#010409", bot: "#010307" },
  { top: "#010307", mid: "#010204", bot: "#000102" },
  { top: "#000102", mid: "#0b0603", bot: "#140b04" },
  { top: "#0a1120", mid: "#101c33", bot: "#16263f" },
];

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function mix(a: string, b: string, t: number): string {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  const c = ca.map((v, i) => Math.round(v + (cb[i] - v) * t));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

interface OceanBackgroundProps {
  zoneIndex: number;
  zoneBlend: number;
}

export function OceanBackground({ zoneIndex, zoneBlend }: OceanBackgroundProps) {
  const i = Math.max(0, Math.min(STOPS.length - 2, zoneIndex));
  const t = Math.max(0, Math.min(1, zoneBlend));
  const s0 = STOPS[i];
  const s1 = STOPS[i + 1];

  const top = mix(s0.top, s1.top, t);
  const mid = mix(s0.mid, s1.mid, t);
  const bot = mix(s0.bot, s1.bot, t);

  // Pale moonlight shafts — restrained, they carry the "surface" reading now.
  let rays = 0;
  if (i === 0) rays = 0.5 - t * 0.42;
  else if (i === 1) rays = 0.14 * (1 - t);
  else if (i === 5) rays = 0.06 * t;
  else if (i === 6) rays = 0.06 + 0.44 * t;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Depth gradient */}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(180deg, ${top} 0%, ${mid} 52%, ${bot} 100%)` }}
      />
      {/* God rays from the surface */}
      <div
        className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[140%] h-[70%] transition-opacity duration-500"
        style={{ opacity: rays }}
      >
        {[0, 1, 2, 3].map((n) => (
          <div
            key={n}
            className="absolute top-0 h-full animate-godray"
            style={{
              left: `${18 + n * 20}%`,
              width: `${7 + (n % 2) * 5}%`,
              background:
                "linear-gradient(180deg, rgba(214,226,240,0.32) 0%, rgba(214,226,240,0.08) 55%, transparent 100%)",
              transform: "skewX(-12deg)",
              filter: "blur(6px)",
              animationDelay: `${n * 1.7}s`,
            }}
          />
        ))}
      </div>
      {/* Surface shimmer glow */}
      <div
        className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[45%] rounded-full transition-opacity duration-500"
        style={{
          opacity: rays * 0.8,
          background: "radial-gradient(ellipse, rgba(190,205,225,0.28) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />
      {/* Vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </div>
  );
}
