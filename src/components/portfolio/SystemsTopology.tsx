import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Activity,
  ArrowRight,
  Play,
  Workflow,
} from "lucide-react";
import { SYSTEM_NODES } from "@/data/portfolioData";
import { MOTION, SECTION_REVEAL, VIEWPORT_REVEAL } from "@/lib/motion";

export function SystemsTopology() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("cicd");
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(-1);

  const selectedNode =
    SYSTEM_NODES.find((node) => node.id === selectedNodeId) || SYSTEM_NODES[0];

  // Determine which node's connections to highlight (hover takes priority over selection)
  const activeConnections = hoveredNodeId
    ? SYSTEM_NODES.find((n) => n.id === hoveredNodeId)?.connectsTo ?? []
    : selectedNode.connectsTo;
  const activeNodeId = hoveredNodeId ?? selectedNodeId;

  const handleSimulate = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep(0);
    setSelectedNodeId(SYSTEM_NODES[0].id);

    const interval = setInterval(() => {
      setSimStep((prev) => {
        const next = prev + 1;
        if (next >= SYSTEM_NODES.length) {
          clearInterval(interval);
          setIsSimulating(false);
          return 0;
        }
        setSelectedNodeId(SYSTEM_NODES[next].id);
        return next;
      });
    }, 1200);
  };

  return (
    <motion.section
      id="systems"
      variants={SECTION_REVEAL}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_REVEAL}
      className="relative py-24 md:py-32 px-6 md:px-10 max-w-[1440px] mx-auto border-t border-[rgba(230,240,245,0.08)]"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#b7ff3c] mb-3">
            <Workflow className="w-3.5 h-3.5" />
            <span>Signature Architecture Map</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-[#f1f6f7] tracking-tight">
            SYSTEMS <span className="text-[#b7ff3c]">THAT MOVE.</span>
          </h2>
          <p className="text-[#b3c0c4] text-sm md:text-base max-w-2xl mt-4 font-sans leading-relaxed">
            Technologies are not isolated badges. They form an interconnected pipeline where code commits flow
            through automated testing, containerization, Infrastructure as Code, and resilient cloud orchestration.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded font-mono text-xs uppercase tracking-wider transition-all ${
              isSimulating
                ? "bg-[#b7ff3c]/20 border border-[#b7ff3c] text-[#b7ff3c] animate-pulse cursor-not-allowed"
                : "bg-[#b7ff3c] text-[#07090b] font-bold hover:bg-[#b7ff3c]/90 shadow-[0_0_15px_-3px_rgba(183,255,60,0.3)]"
            }`}
          >
            {isSimulating ? (
              <>
                <Activity className="w-3.5 h-3.5 animate-spin" />
                <span>Simulating Step {simStep + 1} / {SYSTEM_NODES.length}...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Simulate Flow</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Topology Canvas */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="p-4 sm:p-6 rounded-xl border border-[rgba(230,240,245,0.1)] bg-[#0e1317]/80 backdrop-blur-md">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-[#73848b] pb-4 mb-4 border-b border-[rgba(230,240,245,0.06)]">
              <span>Interactive Pipeline Topology</span>
              <span>Hover or click to inspect</span>
            </div>

            {/* Flow connection visualization */}
            <div className="relative mb-4 hidden sm:flex items-center justify-center gap-1 py-3">
              {SYSTEM_NODES.map((node, i) => {
                const isActive = activeNodeId === node.id;
                const isConnected = activeConnections.includes(node.id);
                const isSimActive = isSimulating && simStep === i;
                return (
                  <div key={node.id} className="flex items-center">
                    <div
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        isActive || isSimActive
                          ? "bg-[#b7ff3c] shadow-[0_0_8px_rgba(183,255,60,0.5)]"
                          : isConnected
                          ? "bg-[#38bdf8] shadow-[0_0_6px_rgba(56,189,248,0.4)]"
                          : "bg-[#1a2028] border border-[rgba(230,240,245,0.15)]"
                      }`}
                    />
                    {i < SYSTEM_NODES.length - 1 && (
                      <div
                        className={`w-6 lg:w-10 h-px transition-colors duration-300 ${
                          isSimulating && simStep >= i
                            ? "bg-[#b7ff3c]/60"
                            : isConnected || isActive
                            ? "bg-[#38bdf8]/30"
                            : "bg-[rgba(230,240,245,0.08)]"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Node Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SYSTEM_NODES.map((node, index) => {
                const isSelected = selectedNode.id === node.id;
                const isConnected = activeConnections.includes(node.id);
                const isHoverSource = hoveredNodeId === node.id;

                return (
                  <button
                    key={node.id}
                    onClick={() => { if (!isSimulating) setSelectedNodeId(node.id); }}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    className={`text-left p-4 rounded-lg border transition-all duration-200 relative group overflow-hidden ${
                      isSelected
                        ? "bg-[#151d23] border-[#b7ff3c] shadow-[0_0_20px_-5px_rgba(183,255,60,0.25)]"
                        : isConnected || isHoverSource
                        ? "bg-[#0e1317] border-[#38bdf8]/50 hover:border-[#38bdf8]"
                        : "bg-[#0b0f13] border-[rgba(230,240,245,0.08)] hover:border-[rgba(230,240,245,0.2)] hover:bg-[#0e1317]"
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#b7ff3c]" />
                    )}

                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#73848b]">
                        0{index + 1} // {node.categoryLabel}
                      </span>
                      {isSelected ? (
                        <span className="h-2 w-2 rounded-full bg-[#b7ff3c] animate-node-pulse" />
                      ) : isConnected ? (
                        <span className="font-mono text-[8px] text-[#38bdf8] uppercase">Connected</span>
                      ) : null}
                    </div>

                    <div className="font-display font-bold text-base text-[#f1f6f7] group-hover:text-[#b7ff3c] transition-colors">
                      {node.label}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {node.tools.slice(0, 3).map((tool) => (
                        <span
                          key={tool}
                          className="px-2 py-0.5 rounded font-mono text-[9px] bg-white/5 border border-white/5 text-[#b3c0c4]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Inspector Panel with animated content swap */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="p-6 rounded-xl border border-[#b7ff3c]/30 bg-[#0e1317] backdrop-blur-md shadow-2xl relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[rgba(230,240,245,0.08)]">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#b7ff3c]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b7ff3c]">
                  NODE INSPECTOR
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#73848b] uppercase tracking-wider">
                ID: {selectedNode.id.toUpperCase()}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: MOTION.interaction.duration }}
              >
                {/* Node Title */}
                <div className="mb-4">
                  <div className="font-mono text-xs text-[#38bdf8] uppercase tracking-widest mb-1">
                    {selectedNode.categoryLabel}
                  </div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#f1f6f7]">
                    {selectedNode.label}
                  </h3>
                </div>

                {/* Role */}
                <div className="mb-6 p-3.5 rounded bg-[#07090b] border border-[rgba(230,240,245,0.06)]">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-[#73848b] mb-1">SYSTEM ROLE</div>
                  <p className="text-sm text-[#cbd5e1] leading-relaxed font-sans">{selectedNode.role}</p>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#73848b] mb-2">IMPLEMENTATION SUMMARY</div>
                  <p className="text-sm text-[#b3c0c4] leading-relaxed font-sans">{selectedNode.description}</p>
                </div>

                {/* Tools */}
                <div className="mb-6">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#73848b] mb-2">CORE UTILITIES</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.tools.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded bg-[#b7ff3c]/10 border border-[#b7ff3c]/20 font-mono text-[10px] text-[#b7ff3c]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Connected Nodes */}
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#73848b] mb-2">DOWNSTREAM TARGETS</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.connectsTo.map((targetId) => {
                      const target = SYSTEM_NODES.find((n) => n.id === targetId);
                      return (
                        <button
                          key={targetId}
                          onClick={() => setSelectedNodeId(targetId)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#38bdf8]/10 border border-[#38bdf8]/30 font-mono text-[10px] text-[#38bdf8] hover:bg-[#38bdf8] hover:text-[#07090b] transition-colors"
                        >
                          <span>{target?.label || targetId}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
