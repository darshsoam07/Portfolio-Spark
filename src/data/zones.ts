export interface ZoneDef {
  id: string;
  meters: number;
  label: string;
  name: string;
  subsystem: string;
}

export const ZONES: ZoneDef[] = [
  { id: "surface", meters: 0, label: "Layer 00", name: "Gateway Ingress", subsystem: "EDGE // DNS" },
  { id: "sunlight", meters: 100, label: "Layer 01", name: "Compute Runtime", subsystem: "K8S // DOCKER" },
  { id: "twilight", meters: 200, label: "Layer 02", name: "Orchestration", subsystem: "TERRAFORM // CI" },
  { id: "midnight", meters: 300, label: "Layer 03", name: "Distributed Workloads", subsystem: "SERVICES" },
  { id: "abyssal", meters: 400, label: "Layer 04", name: "Security & Governance", subsystem: "IAM // POLICY" },
  { id: "hadal", meters: 500, label: "Layer 05", name: "Root Diagnostics", subsystem: "KERNEL" },
  { id: "ascent", meters: 600, label: "Layer 06", name: "Network Dispatch", subsystem: "EGRESS // API" },
];

export function formatMeters(m: number): string {
  const layerIndex = Math.min(6, Math.max(0, Math.floor(m / 100)));
  return `LAYER 0${layerIndex}`;
}
