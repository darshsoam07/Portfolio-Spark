interface Stop {
  top: string;
  mid: string;
  bot: string;
}

// One gradient stop per zone, in ZONES order:
// surface → sunlight → twilight → midnight → abyssal → hadal → ascent
const STOPS: Stop[] = [
  { top: "#8fd4f7", mid: "#0e8ac9", bot: "#075985" },
  { top: "#0e8ac9", mid: "#075985", bot: "#0c4a6e" },
  { top: "#0c4a6e", mid: "#0a1e3c", bot: "#0b1030" },
  { top: "#0b1030", mid: "#060a18", bot: "#02040a" },
  { top: "#02040a", mid: "#010409", bot: "#000000" },
  { top: "#000000", mid: "#060302", bot: "#0f0805" },
  { top: "#0d1b2a", mid: "#0e8ac9", bot: "#8fd4f7" },
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

  // Sunlight shafts are strong at the surface, faint in sunlight,
  // and return as dawn light during the ascent.
  let rays = 0;
  if (i === 0) rays = 1 - t * 0.85;
  else if (i === 1) rays = 0.28 * (1 - t);
  else if (i === 5) rays = 0.12 * t;
  else if (i === 6) rays = 0.12 + 0.88 * t;

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
                "linear-gradient(180deg, rgba(224,242,254,0.5) 0%, rgba(224,242,254,0.12) 55%, transparent 100%)",
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
          background: "radial-gradient(ellipse, rgba(186,230,253,0.55) 0%, transparent 70%)",
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
