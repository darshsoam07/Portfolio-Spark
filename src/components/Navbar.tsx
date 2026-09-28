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
      <div className="flex items-center justify-between bg-gradient-to-b from-[#010409]/80 to-transparent px-8 py-5">
        <button
          onClick={() => go("surface")}
          className="font-mono text-xs font-semibold tracking-[0.25em] text-slate-100"
        >
          DS <span className="text-cyan-300">◈</span>{" "}
          <span className="text-slate-400">DESCENT LOG</span>
        </button>
        <nav className="flex items-center gap-7">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400 transition-colors hover:text-cyan-200"
            >
              {l.label}
            </button>
          ))}
        </nav>
        <button
          onClick={() => go("ascent")}
          className="group flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-100 transition-all hover:border-cyan-200 hover:shadow-[0_0_18px_rgba(34,211,238,0.35)]"
        >
          Transmit
          <ArrowUp className="h-3 w-3 transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>
    </header>
  );
}
