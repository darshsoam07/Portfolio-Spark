import { ArrowUp } from "lucide-react";

export function Navbar() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const links = [
    { id: "surface", label: "Gateway" },
    { id: "sunlight", label: "Compute" },
    { id: "twilight", label: "Architecture" },
    { id: "midnight", label: "Workloads" },
    { id: "abyssal", label: "Security" },
    { id: "hadal", label: "Console" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-40 hidden lg:block">
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#04070d]/95 px-8 py-5 shadow-lg">
        <button
          onClick={() => go("surface")}
          className="font-mono text-xs font-semibold tracking-[0.25em] text-paper cursor-pointer"
        >
          DS <span className="text-brass-400">◈</span>{" "}
          <span className="text-fog">CLOUD & SYSTEMS</span>
        </button>
        <nav className="flex items-center gap-7">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog transition-colors hover:text-brass-300 cursor-pointer"
            >
              {l.label}
            </button>
          ))}
        </nav>
        <button
          onClick={() => go("ascent")}
          className="group flex items-center gap-2 rounded-full border border-brass-400/30 bg-brass-400/[0.07] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-brass-200 transition-all hover:border-brass-300/60 hover:text-brass-200 cursor-pointer"
        >
          Dispatch
          <ArrowUp className="h-3 w-3 transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>
    </header>
  );
}
