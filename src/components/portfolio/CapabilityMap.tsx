import { useMemo, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { CAPABILITY_MAP, type Capability, type TechNode } from "@/data/capabilities";

function findTech(capId: string, techId: string) {
  const cap = CAPABILITY_MAP.find((c) => c.id === capId);
  return cap?.technologies.find((t) => t.id === techId);
}

export function CapabilityMap() {
  const [activeId, setActiveId] = useState(CAPABILITY_MAP[0].id);
  const [selectedTech, setSelectedTech] = useState<TechNode | null>(null);
  const reduceMotion = useReducedMotion();
  const active = useMemo(() => CAPABILITY_MAP.find((c) => c.id === activeId)!, [activeId]);

  function selectCapability(id: string) {
    setActiveId(id);
    setSelectedTech(null);
  }

  return (
    <div className="grid md:grid-cols-[220px_1fr] gap-10 md:gap-14">
      <nav
        aria-label="Capability categories"
        className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0"
      >
        {CAPABILITY_MAP.map((c) => (
          <button
            key={c.id}
            onClick={() => selectCapability(c.id)}
            aria-current={c.id === activeId ? "true" : undefined}
            className={`text-left px-3 py-2 border-l-2 font-mono text-[11px] tracking-[0.12em] uppercase whitespace-nowrap transition-colors ${
              c.id === activeId
                ? "border-primary text-primary"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
            }`}
          >
            {c.label}
          </button>
        ))}
      </nav>

      <div>
        <p className="text-sm text-foreground/70 mb-8 max-w-lg">{active.description}</p>

        {active.technologies.length === 0 ? (
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-[0.1em]">
            {active.description}
          </p>
        ) : (
          <>
            <CapabilityCluster
              capability={active}
              selectedTechId={selectedTech?.id ?? null}
              onSelect={(t) => setSelectedTech(t)}
              reduceMotion={!!reduceMotion}
            />
            <AnimatePresence mode="wait">
              {selectedTech && (
                <motion.div
                  key={selectedTech.id}
                  initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.25 }}
                  className="mt-8 border border-border p-6 max-w-lg"
                >
                  <div className="font-display font-bold text-xl mb-2">{selectedTech.label}</div>
                  {selectedTech.tools && selectedTech.tools.length > 0 && (
                    <p className="text-xs text-muted-foreground mb-3">
                      {selectedTech.tools.join(" · ")}
                    </p>
                  )}
                  {selectedTech.projects && selectedTech.projects.length > 0 ? (
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase mb-2">
                        Applied In
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedTech.projects.map((p) => (
                          <span key={p} className="tech-tag">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground italic">
                      No project evidence recorded for this yet.
                    </p>
                  )}

                  {active.crossLinks.filter((l) => l.techId === selectedTech.id).length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase mb-2">
                        Also Connects To
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {active.crossLinks
                          .filter((l) => l.techId === selectedTech.id)
                          .map((l) => (
                            <button
                              key={`${l.techId}-${l.targetTechId}`}
                              onClick={() => selectCapability(l.targetCapabilityId)}
                              className="text-[11px] font-mono text-muted-foreground hover:text-primary underline underline-offset-4 transition-colors"
                            >
                              {l.label} → {findTech(l.targetCapabilityId, l.targetTechId)?.label}
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}

function CapabilityCluster({
  capability,
  selectedTechId,
  onSelect,
  reduceMotion,
}: {
  capability: Capability;
  selectedTechId: string | null;
  onSelect: (t: TechNode) => void;
  reduceMotion: boolean;
}) {
  const nodeWidth = 140;
  const gap = 24;
  const width =
    capability.technologies.length * nodeWidth + (capability.technologies.length - 1) * gap;
  const centerX = width / 2;

  return (
    <>
      <div className="hidden sm:block overflow-x-auto">
        <svg width={Math.max(width, 200)} height={160} className="overflow-visible">
          {capability.technologies.map((t, i) => {
            const x = i * (nodeWidth + gap) + nodeWidth / 2;
            return (
              <line
                key={`stem-${t.id}`}
                x1={centerX}
                y1={20}
                x2={x}
                y2={70}
                stroke="var(--border)"
                strokeWidth={1}
              />
            );
          })}
          <text
            x={centerX}
            y={12}
            textAnchor="middle"
            className="fill-primary font-mono text-[10px] uppercase tracking-[0.15em]"
          >
            {capability.label}
          </text>

          {capability.edges.map((e) => {
            const fromIdx = capability.technologies.findIndex((t) => t.id === e.from);
            const toIdx = capability.technologies.findIndex((t) => t.id === e.to);
            if (fromIdx === -1 || toIdx === -1) return null;
            const x1 = fromIdx * (nodeWidth + gap) + nodeWidth / 2;
            const x2 = toIdx * (nodeWidth + gap) + nodeWidth / 2;
            return (
              <g key={`${e.from}-${e.to}`}>
                <line
                  x1={x1}
                  y1={100}
                  x2={x2}
                  y2={100}
                  stroke="var(--primary)"
                  strokeOpacity={0.4}
                  strokeWidth={1}
                />
                <text
                  x={(x1 + x2) / 2}
                  y={94}
                  textAnchor="middle"
                  className="fill-muted-foreground font-mono text-[9px] uppercase tracking-[0.1em]"
                >
                  {e.label}
                </text>
              </g>
            );
          })}

          {capability.technologies.map((t, i) => {
            const x = i * (nodeWidth + gap);
            const isSelected = t.id === selectedTechId;
            return (
              <g key={t.id}>
                <motion.rect
                  x={x}
                  y={100}
                  width={nodeWidth}
                  height={40}
                  fill={isSelected ? "var(--primary)" : "transparent"}
                  stroke="var(--primary)"
                  strokeOpacity={isSelected ? 1 : 0.4}
                  strokeWidth={1}
                  className="cursor-pointer"
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  aria-label={`${t.label} — view details`}
                  onClick={() => onSelect(t)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") onSelect(t);
                  }}
                  initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                />
                <text
                  x={x + nodeWidth / 2}
                  y={124}
                  textAnchor="middle"
                  className={`font-mono text-[11px] uppercase tracking-[0.08em] pointer-events-none ${isSelected ? "fill-background" : "fill-foreground"}`}
                >
                  {t.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="sm:hidden flex flex-col gap-2">
        {capability.technologies.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t)}
            aria-pressed={t.id === selectedTechId}
            className={`text-left px-4 py-3 border font-mono text-xs uppercase tracking-[0.08em] transition-colors ${
              t.id === selectedTechId
                ? "border-primary text-primary bg-primary/5"
                : "border-border text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </>
  );
}
