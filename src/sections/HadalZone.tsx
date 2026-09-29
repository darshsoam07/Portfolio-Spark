import { Reveal } from "@/components/Reveal";
import { ZoneHeader } from "@/components/ZoneHeader";
import HadalBlackBox from "@/components/HadalBlackBox";

export function HadalZone() {
  return (
    <section id="hadal" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <ZoneHeader
          zoneId="hadal"
          title={
            <>
              The <span className="display-serif italic font-medium text-signal">Black Box</span>
            </>
          }
          blurb="Six thousand meters. If the expedition ever goes dark, this is what survives — every system, credential, and deployment, recoverable from the recorder."
        />

        <Reveal>
          <HadalBlackBox />
        </Reveal>
      </div>
    </section>
  );
}
