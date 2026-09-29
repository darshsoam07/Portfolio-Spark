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
              Root Diagnostics & <span className="display-serif italic font-medium text-signal">Console</span>
            </>
          }
          blurb="Live interactive cluster terminal providing real-time infrastructure queries, Kubernetes pod monitoring, and cloud pipeline simulations."
        />

        <Reveal>
          <HadalBlackBox />
        </Reveal>
      </div>
    </section>
  );
}
