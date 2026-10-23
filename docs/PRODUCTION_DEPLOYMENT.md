# Production deployment — 23 October 2026

Status: **deployed and verified on the public production URL**.

## Identity and source

- Live URL: https://darshsoam.vercel.app/
- Existing Vercel project: `darsh-beac/portfolio-spark`
- Project ID: `prj_8HPOAlzIO9L56Jaga64PSfEbL7sf`
- Deployment ID: `dpl_4eAtHAKkodbu3jSFYR1q2DtdAK6F`
- Deployment URL: https://portfolio-spark-781o8i4id-darsh-beac.vercel.app/
- Inspector: https://vercel.com/darsh-beac/portfolio-spark/4eAtHAKkodbu3jSFYR1q2DtdAK6F
- Repository: https://github.com/darshsoam07/Portfolio-Spark
- Local source: `C:\Users\daksh\Downloads\Portfolio Spark`
- Branch: `codex/reference-portfolio`
- Application commit: `08f80e6657ba4ef89488c9a22ccdf346ccf57887` (`portfolio redesign`)
- Working tree was clean before deployment preparation. This commit already contained the name, editorial layout, project, credential and arrival-navigation changes.

## Deployment workflow

Authenticated through Vercel's official device login. Verified the account and existing domain-to-project mapping before linking. Linked by the existing project ID, pulled its production settings, ran `vercel build --prod --yes --scope darsh-beac`, then `vercel deploy --prebuilt --prod --yes --scope darsh-beac` with Vercel CLI 65.1.0. The build output explicitly targeted production. Vercel returned READY and aliased the new deployment to darshsoam.vercel.app; a subsequent inspect confirmed that the domain resolves to the new deployment ID.

No duplicate project, domain change, project deletion, environment-variable modification, Git-integration change, Git commit or Git push was performed. Existing TanStack Start and Node 24 project settings were retained. The application source was not changed. The CLI added `.vercel` and `.env*` ignore rules to `.gitignore`; downloaded credentials/settings remain ignored. This report is the other new repository file.

## Readiness verification

- `npm ls --depth=0`: installed dependencies verified.
- `npm run typecheck`: passed.
- `npm run lint`: passed, with two existing warnings in legacy ArrivalTunnel and SystemsTopology files.
- `npm run build`: passed.
- `vercel build --prod --yes --scope darsh-beac`: passed using existing production configuration.
- `npm run test:browser` locally: passed at 1440, 1920, 1024, 768 and 390 px, including reduced motion.
- `node scripts/verify-arrival.mjs`: passed four viewport sizes, fresh/stale-hash landing, refresh from Credentials, intentional navigation, skip, Escape, history, reduced motion and fallback checks.
- `node scripts/verify-credentials.mjs`: all nine achievements, modal behavior, five manifest-backed achievements and nine image assets passed at four viewport sizes; public-safe legacy alias verified.
- `node scripts/check-links.mjs`: five GitHub URLs returned 200. LinkedIn returned 999, its automated-request restriction; the intended URL is retained.

## Live production verification

`node artifacts/deployment/verify-live.mjs` passed on the unchanged public domain at 1440×900 and 390×844:

- HTTP 200 and the editorial redesign mounted.
- Full title-case Darsh Soam hero, three project showcases and nine achievements.
- Arrival completion and scrollY = 0 after fresh stale-hash navigation and refresh from Certifications.
- Intentional Certifications navigation and certificate modal.
- Skills filter behavior, all principal sections, images and loaded DM Sans/Instrument Serif fonts.
- Correct email/contact actions; all nine supplied certificate/badge assets returned 200.
- No horizontal overflow, runtime exceptions or console errors.

The full existing interaction suite was then run with `PREVIEW_URL=https://darshsoam.vercel.app` and passed at 1440, 1920, 1024, 768 and 390 px, plus reduced-motion checks. It covers project dialogs, Escape, focus containment, keyboard filters, About tabs, links, collage separation, images and anchor targets. Errors: none.

The live website was also opened in the in-app browser and observed transitioning from the welcome overlay to the hero at page progress 0. Before deployment the live baseline had no `.editorial-site` or credential cards; the deployed public URL now has the new redesign. The previous portfolio is no longer the current version at the requested production URL.

## Evidence and remaining limitations

- `artifacts/deployment/production-before.json` and `production-before.png`
- `artifacts/deployment/live-results.json`
- `artifacts/deployment/live-hero-1440.png`
- `artifacts/deployment/live-refresh-390.png`
- `artifacts/deployment/live-credentials-1440.png`
- `artifacts/deployment/live-credentials-390.png`

No deployment-blocking issues remain. Non-blocking pre-existing lint/build advisories remain. LinkedIn automated availability could not be verified because of HTTP 999. Browser tests used Chromium and emulated mobile sizes; they do not represent physical-device or all-browser coverage. Email actions were checked without sending email.

## Arrival update deployment — 23 October 2026, 18:53 IST

Status: deployed and verified on https://darshsoam.vercel.app/.

- Existing project: darsh-beac/portfolio-spark, prj_8HPOAlzIO9L56Jaga64PSfEbL7sf.
- New deployment: dpl_Ag1ZqmsfDzJewD4cBdUuWer3hCLG.
- Deployment URL: https://portfolio-spark-5tre9xrh2-darsh-beac.vercel.app/.
- Source: current local working tree on codex/reference-portfolio, base commit f34dde40a756978564b24323e6a65afd71bcfe61 plus the uncommitted SVG node/dot transform corrections. No commit or push was performed.
- Existing uncommitted documentation and loading-test work was preserved.
- Previous deployment retained for rollback: dpl_4eAtHAKkodbu3jSFYR1q2DtdAK6F, https://portfolio-spark-781o8i4id-darsh-beac.vercel.app/.

Verified project/domain identity with Vercel inspect, pulled existing production configuration, then ran vercel build --prod --yes --scope darsh-beac and vercel deploy --prebuilt --prod --yes --scope darsh-beac. The build used the local working tree. A subsequent inspect confirmed the public domain aliases the new deployment. No remote environment variables, domain configuration, Git integration or project settings were changed. No deployments were deleted.

Checks: npm run typecheck passed; npm run lint had zero errors and two existing warnings in legacy ArrivalTunnel and SystemsTopology. The Vercel production build (including npm run build) passed.

Production browser verification passed at 1440 and 390 pixels: the new identity-animation phase, completion, Skip, Escape, reduced motion, stale-hash arrival, refresh from Certifications, hero at scrollY zero, full name, three project showcases, nine achievements, and no horizontal overflow. Content checks also verified skills interaction, credential modal, images/fonts, contact links and all nine manifest certificate/badge asset URLs. No page or console errors were reported. The initial phase assertion missed the short phase when waiting for DOMContentLoaded; the test was corrected to observe from navigation commit and tolerate the document's initial parsing state, then passed. No application changes were needed during deployment.

Evidence: artifacts/deployment-arrival/results.json, intro-1440.png, intro-390.png, hero-1440.png, hero-390.png and videos/. Additional content checks: artifacts/deployment/live-results.json. Production was opened in the in-app browser and the full-name hero verified.

Remaining limitations: two pre-existing lint warnings; browser coverage is Chromium with mobile emulation, not physical iOS/Safari. No deployment-blocking issues remain.
