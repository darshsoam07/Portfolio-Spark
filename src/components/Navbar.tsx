import { ArrowUp } from "lucide-react";

export function Navbar() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const links = [
    { id: "surface", label: "Surface" },
    { id: "twilight", label: "Twilight" },
    { id: "midnight", label: "Midnight" },
    { id: "abyssal", label: "Abyssal" },
    { id: "hadal", label: "Hadal" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-40 hidden lg:block">
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#04070d]/70 px-8 py-5 backdrop-blur-md">
        <button
          onClick={() => go("surface")}
          className="font-mono text-xs font-semibold tracking-[0.25em] text-paper"
        >
          DS <span className="text-brass-400">◈</span>{" "}
          <span className="text-fog">DESCENT LOG</span>
        </button>
        <nav className="flex items-center gap-7">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog transition-colors hover:text-brass-300"
            >
              {l.label}
            </button>
          ))}
        </nav>
        <button
          onClick={() => go("ascent")}
          className="group flex items-center gap-2 rounded-full border border-brass-400/30 bg-brass-400/[0.07] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-brass-200 transition-all hover:border-brass-300/60 hover:text-brass-200"
        >
          Transmit
          <ArrowUp className="h-3 w-3 transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>
    </header>
  );
}
