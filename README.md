# Portfolio Spark

Build me a modern, interactive personal portfolio website.     https://dennissnellenberg.com/ https://www.wallofportfolios.in/portfolios/sahor-debbarma/ https://www.wallofportfolios.in/portfolios/prerna/https://www.wallofportfolios.in/portfolios/gurjot-singh-ahluwalia/ I have listed you with some amazing portfolio designs use them as an inspiration so it catches the eye of a recruiter and industry relevant whenever posted on linkedin. 

Here are all my project documents — use them as the single source of truth.

---

## DOCUMENT 01 — PRD

**App Name:** [YOUR NAME] Portfolio

**Tagline:** [YOUR TAGLINE]

**Problem:** Recruiters and hiring managers spend less than 10 seconds scanning a portfolio. This site must grab attention immediately and communicate skills, personality, and work quality without friction.

**Target User:** Tech recruiters, hiring managers, and industry peers discovering me via LinkedIn or Google.

**Core Features (Must Have):**

- Hero section with animated intro and name

- About section with photo and bio

- Skills/stack section with visual icons or badges

- Projects section with cards (image, title, description, live link, GitHub link)

- Contact section with email + social links

- Smooth scroll navigation with sticky header

- LinkedIn-share-worthy OG meta tags

**Nice to Have:**

- Dark/light mode toggle

- Cursor custom animation

- Scroll-triggered section animations

- Subtle particle or gradient background on hero

**Out of Scope:** Blog, CMS, login/auth, backend

**Success Metrics:** Looks impressive when shared as a link on LinkedIn. Loads in under 2 seconds.

---

## DOCUMENT 02 — TRD

**Frontend:** React + Vite + TypeScript + Tailwind CSS

**Backend:** None — static site only

**Hosting:** Will deploy via Lovable's built-in hosting

**Key Libraries:** 

- Framer Motion for animations

- Lucide React for icons

- React Scroll for smooth navigation

**Constraints:** 

- Fully static, no API calls

- Must be mobile responsive

- No heavy dependencies

---

## DOCUMENT 03 — APP FLOW

**Pages:** Single page application (SPA) — all sections on one scrollable page

**Navigation:** Sticky top navbar with anchor links → Hero / About / Skills / Projects / Contact

**First Screen:** Hero section — full viewport, animated name + tagline + CTA button ("View My Work")

**Core User Journey:** 

1. Visitor lands on Hero → reads name + tagline

2. Scrolls down → About section (photo + bio)

3. Scrolls → Skills (icon grid or badge list)

4. Scrolls → Projects (cards with hover effects)

5. Scrolls → Contact (links + email)

**Empty States:** Not applicable

**Mobile:** Hamburger menu on mobile, stacked sections

---

## DOCUMENT 04 — UI/UX DESIGN BRIEF

**Aesthetic:** Highly modern, bold, recruiter-stopping. Think: dark glassmorphism meets editorial design. Inspired by: Dennis Snellenberg (dramatic typography, strong white space), Sahor Debbarma (clean product feel), Prerna's portfolio (warm personality + visual hierarchy), Gurjot Singh (confident and structured layout).

**Color Palette:**

- Background: #0A0A0A (near black)

- Primary text: #F5F5F5

- Accent / CTA: #6C47FF (electric indigo) OR [USER'S PREFERRED COLOR]

- Card backgrounds: rgba(255,255,255,0.05) — glassmorphism

- Borders: rgba(255,255,255,0.1)

**Typography:**

- Headings: "Space Grotesk" or "DM Sans" — bold, large, dramatic

- Body: "Inter" — clean and readable

- Hero name should be MASSIVE — think 80–120px

**Component Style:**

- Rounded corners: 12–16px

- Subtle glow effects on hover

- Frosted glass cards for projects

- Gradient text on the hero name or tagline

**Animations:**

- Hero text fades in with staggered delay on load

- Section elements slide up on scroll (Framer Motion)

- Project cards scale up slightly on hover

- Smooth scroll throughout

**Mobile:** Fully responsive, same visual quality on phone

---

## DOCUMENT 05 — BACKEND SCHEMA

Not applicable — this is a static portfolio. No database, no auth, no backend.

---

## DOCUMENT 06 — IMPLEMENTATION PLAN

**Phase 1:** Project setup — Vite + React + Tailwind + Framer Motion installed, folder structure clean

**Phase 2:** Layout shell — Navbar + all section containers + smooth scroll working

**Phase 3:** Hero section — animated name, tagline, CTA button, background effect

**Phase 4:** About section — photo placeholder + bio text

**Phase 5:** Skills section — icon/badge grid

**Phase 6:** Projects section — card grid with hover animations

**Phase 7:** Contact section — social links + email

**Phase 8:** Polish — mobile responsiveness, meta tags, performance

**Done Criteria:** All sections render beautifully on desktop and mobile. Looks like a top 1% portfolio. Ready to share on LinkedIn.

---

## CONTENT TO USE

**Name:** [YOUR FULL NAME]

**Role:** [YOUR ROLE — e.g. "Frontend Developer"]

**Tagline:** [YOUR TAGLINE]

**Bio:** [2–3 sentence bio — who you are, what you love building, where you're based]

**Skills:** [LIST YOUR SKILLS/TECH]

**Projects:**

1. [Project Name] — [1-line description] — [live link] — [github link]

2. [Project Name] — [1-line description] — [live link] — [github link]

3. [Project Name] — [1-line description] — [live link] — [github link]

**Contact:**

- Email: [your email]

- LinkedIn: [your URL]

- GitHub: [your URL]

---

Build the full portfolio in one go. Make it visually stunning — the kind of site that stops a recruiter mid-scroll on LinkedIn. Prioritize dramatic typography, smooth animations, and a dark modern aesthetic. Do not use generic bootstrap-looking templates.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c704cf9f-dd19-40a6-97f1-ca0e624b4607).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
