import { motion } from "motion/react";
import { SectionLabel } from "@/components/portfolio/SectionLabel";

export function GithubActivity() {
  return (
    <section id="github" className="relative py-24 md:py-32 px-6 md:px-12 border-t border-border">
      <div className="max-w-[1400px] mx-auto">
        <SectionLabel num="003" title="GitHub" />
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="font-display font-bold text-5xl md:text-6xl mb-4"
        >
          GITHUB <span className="text-primary">ACTIVITY</span>
        </motion.h2>
        <p className="text-sm text-muted-foreground max-w-md mb-12">
          Commits, streaks and language mix — straight from the source.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="bg-card border border-border p-5 flex items-center justify-center"
          >
            <img
              src="https://github-readme-stats.vercel.app/api?username=[YOUR_GITHUB_USERNAME]&show_icons=true&theme=radical&bg_color=0A0A0A&hide_border=true"
              alt="GitHub stats"
              loading="lazy"
              className="w-full max-w-[500px]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card border border-border p-5 flex items-center justify-center"
          >
            <img
              src="https://streak-stats.demolab.com?user=[YOUR_GITHUB_USERNAME]&theme=radical&background=0A0A0A&border=0A0A0A"
              alt="GitHub contribution streak"
              loading="lazy"
              className="w-full max-w-[500px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
