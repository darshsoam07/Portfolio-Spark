import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import { Award, ChevronLeft, ChevronRight } from "lucide-react";

// [PLACEHOLDER] replace with your real certifications
const CERTS = [
  { name: "[Cert Name 1]", issuer: "[Issuer 1]", year: "[Year 1]" },
  { name: "[Cert Name 2]", issuer: "[Issuer 2]", year: "[Year 2]" },
  { name: "[Cert Name 3]", issuer: "[Issuer 3]", year: "[Year 3]" },
  { name: "[Cert Name 4]", issuer: "[Issuer 4]", year: "[Year 4]" },
];

export function Certifications({ label }: { label: React.ReactNode }) {
  const [emblaRef, embla] = useEmblaCarousel({ align: "start", loop: false, dragFree: false });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    setSnaps(embla.scrollSnapList());
    onSelect();
    embla.on("select", onSelect).on("reInit", onSelect);
  }, [embla]);

  const prev = useCallback(() => embla?.scrollPrev(), [embla]);
  const next = useCallback(() => embla?.scrollNext(), [embla]);

  return (
    <section id="certifications" className="relative py-24 md:py-32 px-6 md:px-12 border-t border-border bg-card/20">
      <div className="max-w-[1400px] mx-auto">
        {label}
        <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="font-display font-bold text-5xl md:text-6xl"
          >
            CERTIFI<span className="text-primary">CATIONS</span>
          </motion.h2>
          <div className="flex gap-2">
            <button
              onClick={prev}
              aria-label="Previous certification"
              className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              aria-label="Next certification"
              className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {CERTS.map((c, i) => (
              <div key={i} className="shrink-0 basis-[85%] sm:basis-[48%] lg:basis-[31%]">
                <div className="spotlight-card bg-card border border-border p-8 h-full min-h-[220px] flex flex-col">
                  <Award className="w-6 h-6 text-primary mb-6" />
                  <h3 className="font-display font-bold text-xl tracking-wide">{c.name}</h3>
                  <p className="font-mono text-[11px] text-muted-foreground mt-2">{c.issuer}</p>
                  <span className="mt-auto pt-6 font-mono text-[10px] tracking-[0.25em] text-primary uppercase">
                    {c.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 mt-8">
          {snaps.map((_, i) => (
            <button
              key={i}
              onClick={() => embla?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1 rounded-full transition-all ${
                selected === i ? "w-8 bg-primary" : "w-3 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
