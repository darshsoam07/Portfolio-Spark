export interface ZoneDef {
  id: string;
  meters: number;
  label: string;
  name: string;
}

export const ZONES: ZoneDef[] = [
  { id: "surface", meters: 0, label: "Zone 00", name: "Surface" },
  { id: "sunlight", meters: 200, label: "Zone 01", name: "Sunlight" },
  { id: "twilight", meters: 500, label: "Zone 02", name: "Twilight" },
  { id: "midnight", meters: 1000, label: "Zone 03", name: "Midnight" },
  { id: "abyssal", meters: 4000, label: "Zone 04", name: "Abyssal" },
  { id: "hadal", meters: 6000, label: "Zone 05", name: "Hadal" },
  { id: "ascent", meters: 0, label: "Ascent", name: "Surface Transmission" },
];

export function formatMeters(m: number): string {
  return `${m.toLocaleString("en-IN")} M`;
}
