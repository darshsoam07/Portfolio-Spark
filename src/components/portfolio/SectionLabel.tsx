export function SectionLabel({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <span className="font-mono text-xs tracking-[0.3em] text-primary">{num}</span>
      <span className="w-16 h-px bg-primary/60" />
      <span className="font-mono text-[10px] tracking-[0.35em] text-muted-foreground uppercase">/ {title}</span>
    </div>
  );
}
