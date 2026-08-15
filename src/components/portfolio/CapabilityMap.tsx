import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { CAPABILITY_MAP, type TechNode } from "@/data/capabilities";
import { MOTION } from "@/lib/motion";

type Point = { x: number; y: number };

function positionsFor(count: number): Point[] {
  if (count === 1) return [{ x: 50, y: 50 }];
  return Array.from({ length: count }, (_, index) => {
    const angle = -Math.PI / 2 + (index / count) * Math.PI * 2;
    const radiusX = count > 4 ? 36 : 29;
    const radiusY = count > 4 ? 33 : 27;
    return { x: 50 + Math.cos(angle) * radiusX, y: 50 + Math.sin(angle) * radiusY };
  });
}

export function CapabilityMap() {
  const [activeId, setActiveId] = useState(CAPABILITY_MAP[0].id);
  const [selectedTechId, setSelectedTechId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const active = useMemo(
    () => CAPABILITY_MAP.find((capability) => capability.id === activeId) ?? CAPABILITY_MAP[0],
    [activeId],
  );
  const selected = active.technologies.find((tech) => tech.id === selectedTechId) ?? null;
  const points = useMemo(() => positionsFor(active.technologies.length), [active.technologies.length]);
  const pointById = useMemo(
    () => Object.fromEntries(active.technologies.map((tech, index) => [tech.id, points[index]])),
    [active.technologies, points],
  );

  const relatedNodeIds = useMemo(() => {
    if (!selected) return new Set<string>();
    return new Set(
      active.edges
        .filter((edge) => edge.from === selected.id || edge.to === selected.id)
        .flatMap((edge) => [edge.from, edge.to]),
    );
  }, [active.edges, selected]);

  const chooseCategory = (id: string) => {
    setActiveId(id);
    setSelectedTechId(null);
  };

  const chooseTechnology = (technology: TechNode) => {
    setSelectedTechId((current) => (current === technology.id ? null : technology.id));
  };

  return (
    <div className="topology-shell">
      <div className="topology-heading">
        <p className="system-eyebrow">SYSTEMS / TOPOLOGY</p>
        <p className="topology-description">{active.description}</p>
      </div>

      <div className="topology-categories" role="tablist" aria-label="Capability domains">
        {CAPABILITY_MAP.map((capability, index) => (
          <button
            key={capability.id}
            type="button"
            role="tab"
            aria-selected={capability.id === active.id}
            onClick={() => chooseCategory(capability.id)}
            className={capability.id === active.id ? "is-active" : ""}
          >
            <span>0{index + 1}</span>
            {capability.label}
          </button>
        ))}
      </div>

      <div className="topology-stage" aria-label={`${active.label} technology topology`}>
        <div className="topology-grid" />
        <div className="topology-hub" aria-hidden="true">
          <span>{active.label}</span>
          <i />
        </div>
        <svg viewBox="0 0 100 100" className="topology-lines" aria-hidden="true" preserveAspectRatio="none">
          {active.technologies.map((technology, index) => {
            const point = points[index];
            const isRelated = selected ? relatedNodeIds.has(technology.id) : true;
            return (
              <motion.line
                key={`root-${technology.id}`}
                x1="50"
                y1="50"
                x2={point.x}
                y2={point.y}
                initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: isRelated ? 0.65 : 0.12 }}
                transition={{ ...MOTION.cinematic, delay: index * 0.05 }}
                className={selected?.id === technology.id ? "is-selected" : ""}
              />
            );
          })}
          {active.edges.map((edge, index) => {
            const from = pointById[edge.from] as Point | undefined;
            const to = pointById[edge.to] as Point | undefined;
            if (!from || !to) return null;
            const illuminated = selected && (edge.from === selected.id || edge.to === selected.id);
            return (
              <motion.line
                key={`${edge.from}-${edge.to}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: illuminated ? 1 : selected ? 0.08 : 0.28 }}
                transition={{ ...MOTION.standard, delay: 0.25 + index * 0.08 }}
                className={illuminated ? "is-illuminated" : ""}
              />
            );
          })}
        </svg>

        {active.technologies.map((technology, index) => {
          const point = points[index];
          const focused = selected?.id === technology.id;
          const related = selected ? relatedNodeIds.has(technology.id) : true;
          return (
            <motion.button
              key={technology.id}
              type="button"
              className={`topology-node ${focused ? "is-focused" : ""} ${related ? "is-related" : "is-recessed"}`}
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              onClick={() => chooseTechnology(technology)}
              aria-pressed={focused}
              initial={reduceMotion ? undefined : { opacity: 0, scale: 0.82 }}
              animate={{ opacity: related ? 1 : 0.38, scale: focused ? 1.12 : 1 }}
              transition={{ ...MOTION.standard, delay: index * 0.06 }}
            >
              <span className="topology-node__point" />
              <span>{technology.label}</span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected?.id ?? "instruction"}
          initial={reduceMotion ? undefined : { opacity: 0, y: 10, clipPath: "inset(0 100% 0 0)" }}
          animate={{ opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)" }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -8, clipPath: "inset(0 0 0 100%)" }}
          transition={MOTION.standard}
          className="topology-evidence"
          aria-live="polite"
        >
          {selected ? (
            <>
              <div>
                <p className="system-eyebrow">FOCUS / {selected.label}</p>
                <p>{selected.tools?.length ? selected.tools.join(" · ") : "Capability detail recorded in mission log."}</p>
              </div>
              <div>
                <p className="system-eyebrow">APPLIED EVIDENCE</p>
                <p>{selected.projects?.length ? selected.projects.join(" / ") : "No project evidence recorded yet."}</p>
              </div>
            </>
          ) : (
            <p>Select a system node to illuminate dependencies and applied project evidence.</p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
