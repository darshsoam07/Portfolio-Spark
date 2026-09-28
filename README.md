# The Descent — Darsh Soam's Portfolio

A scroll-driven dive through the stack: from the sunlit surface (0M) down through
the Twilight, Midnight, and Abyssal zones to the Black Box at 6,000M — then an
ascent back to the surface to transmit a signal.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

Requires Node 18+.

## Deploy to Vercel

Framework preset: **Vite**. Build command `npm run build`, output directory `dist`.
No environment variables needed — it's a fully static site.

## What's inside

- `src/App.tsx` — composition: intro → ocean layers → zones
- `src/sections/` — SurfaceHero, SunlightZone, TwilightZone, MidnightZone,
  AbyssalZone, HadalZone, AscentContact (one file per depth zone)
- `src/components/` — OceanBackground (scroll-morphed gradient), OceanCanvas
  (marine snow + plankton particle field), DepthGauge (click-to-dive rail +
  sonar ping), SubmersionIntro, Navbar, ZoneHeader, Reveal
- `src/hooks/useDepth.ts` — scroll → { progress, zoneIndex, zoneBlend, meters }
- `src/data/portfolio.ts` — all content (projects, skills, certs, experience)
- `src/data/zones.ts` — the seven depth zones

## Notes

- Portrait: `src/assets-portrait.jpg` — replace to update.
- Certificate images: `public/certificates/` — filenames referenced in
  `src/data/portfolio.ts`.
- Content edits (projects, skills, experience) all live in
  `src/data/portfolio.ts`; the dive narrative in `src/data/zones.ts`.
- Respects `prefers-reduced-motion` (intro skipped, canvas static, reveals instant).
