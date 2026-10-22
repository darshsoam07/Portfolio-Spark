# Reference fidelity audit

Date: 22 October 2026. Workspace: existing `codex/reference-portfolio` checkout; prior uncommitted work preserved. No deployment or push.

## Evidence and scope

Actual reference: https://samaymaurya.com/. Directory: https://www.wallofportfolios.in/portfolios/samay/ (verified iframe points to the actual reference). Existing identity/content reference: https://darshsoam.vercel.app/. The live portfolio still has its older introduction; it is not the implementation baseline.

Baseline: local editorial redesign at http://127.0.0.1:8082/. Full-name correction is retained. Evidence is in ignored `artifacts/fidelity/`: before/after viewport and section PNGs, desktop 10% scroll samples, browser videos and computed-style JSON. Videos are observation recordings, not frame-accurate timing measurements. Full-page screenshots alone do not represent pinned content; use section/scroll captures.

## Priority audit

| Section              | Verified reference / current baseline                                                                                                                           | Difference and priority                                                                         | Required modification                                                                                                         | Confidence / verification                                 | Status                                                    |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| Navigation           | 1440px: x79.2, width1281.6, height77; centered inline navigation, right contact; local same geometry                                                            | Hover treatment needs detailed comparison, P2                                                   | Preserve geometry and inline mobile navigation; keyboard-visible equivalent                                                   | High geometry; browser measurements and hover captures    | Inline navigation retained; hover/keyboard checks passed  |
| Hero                 | DM Sans bold oversized name, Instrument Serif italic greeting, three tilted white prints; local uses same families and full name on two lines                   | Local collage ~50px lower and experience strip ~63px lower at1440; greeting72 rather than80, P0 | Rebalance name/greeting/collage vertically without losing surname or card separation                                          | High; paired1440x900 screenshots                          | Implemented; see verification below                       |
| Experience strip     | Horizontal ruled strip with employer marks; local learning/education/open-source strip                                                                          | Personal-content adaptation, not missing employers                                              | Keep verified student content                                                                                                 | High                                                      | Retain                                                    |
| Work entrance        | Reference centered 3D headset rotates/scales through pinned paper transition; local static braces/server icon                                                   | Missing scroll-linked transition, P0                                                            | Animate existing original systems motif in same centered paper-to-dark sequence; retain skip link and reduced-motion fallback | High motion observed; exact easing unverified             | Implemented; see verification below                       |
| Featured projects    | Dark pinned horizontal gallery; neighboring cards perspective-distorted/softened, serif section label, large rounded visual panels                              | Local flat gallery, left-weighted first card, heading label scrolls away; P0/P1                 | Center first/last cards and retain section label during pin; restrained perspective progression                               | High screenshots; precise WebGL distortion not replicated | Implemented; see verification below                       |
| More work            | Compact text links after gallery                                                                                                                                | Local equivalent already present                                                                | Preserve links and typographic contrast                                                                                       | High                                                      | Retain                                                    |
| Toolkit              | Reference has UI-snippet thumbnails and pill category filters; local skills use same filter pattern                                                             | Technical content cannot truthfully become mobile UI screenshots                                | Retain skills, compact readable sheets and categories; avoid invented shipped UI                                              | High                                                      | Intentional adaptation                                    |
| About                | Large two-line serif heading, coral italic underline, handwritten note alongside heading; inset browser frame with dark tabs/address bar; bold sans name inside | Local note below heading, browser too low/fullwidth, name serif, P0                             | Position note beside heading on desktop; inset frame; compact chrome and bold sans identity                                   | High; paired section screenshots                          | Implemented; see verification below                       |
| About behavior       | Reference pins browser and advances personal tabs with scroll; local direct manual tabs                                                                         | Interaction differs, P1                                                                         | Investigate safe scroll sequencing; preserve direct keyboard/manual access                                                    | High observed; avoid forcibly changing focused content    | Implemented with manual/focus override and viewport guard |
| Contact/footer       | Mountain line drawing then two-column headline/contact, serif underlined email, dark resume pill                                                                | Shared structure already present; local personalized headline wraps into two lines              | Preserve authentic contact text and email request (no resume file available)                                                  | High                                                      | Intentional adaptation                                    |
| Motion/accessibility | Coral initial wipe, hover print lift, pinned gallery, progress pencil; local wipe/lift/gallery/progress rail                                                    | No audio/custom cursor/pencil or exact3D assets                                                 | Preserve accessible controls and reduced-motion; do not copy reference personal assets                                        | Verified patterns, exact timings estimated                | Adapted                                                   |

## Non-negotiable adaptations

Darsh Soam remains title case on two lines, with coral dot. No reference portrait, employer logos, claims, travel biography, or project imagery is copied. Three authentic engineering projects replace six design case studies. Skills replace UI snippets. Resume remains an explicitly labelled email request because there is no verified downloadable resume. Emails, usernames, URLs and technical identifiers remain intact.

## Capture and iteration log

Initial comparison: hero's vertical balance, work gallery framing, and About browser composition are the three largest actionable layout differences. Reference3D model/curved gallery rendering is not an exact match target without corresponding original assets; reproduce the observed spatial rhythm with existing code-native artwork.

Further measured specifications, implementation outcomes and executed checks follow after verification.

## Measured reference specification

Computed values below are browser observations, rounded to one decimal for readability. Rectangles include transforms at the sampled initial state, so pinned browser dimensions can change during scroll. Full raw typography, spacing, borders, shadows and transitions are retained in `artifacts/fidelity/reference-details.json`. Transparent backgrounds inherit the paper field.

### 1440 × 900

| Element            | x / width / height (px) | Font size / line height | Padding             | Radius |
| ------------------ | ----------------------- | ----------------------- | ------------------- | ------ |
| .hero-nav          | 79.2 / 1281.6 / 77.0    | 15px / 23.25px          | 22px 0px            | 0px    |
| .hero-stage        | 79.2 / 1281.6 / 432.0   | 16px / 24.8px           | 22px 0px 0px        | 0px    |
| .hero-intro        | 79.2 / 212.3 / 80.6     | 80.64px / 80.64px       | 0px                 | 0px    |
| .hero-name         | 69.7 / 757.4 / 190.1    | 237.6px / 190.08px      | 0px                 | 0px    |
| .hero-pinboard     | 885.6 / 475.2 / 279.5   | 16px / 24.8px           | 0px                 | 0px    |
| .hero-polaroid     | 871.3 / 223.1 / 269.0   | 16px / 24.8px           | 10px 10px 14px      | 0px    |
| .hero-foot         | 79.2 / 1281.6 / 125.5   | 16px / 24.8px           | 10px 0px 36px       | 0px    |
| .hero-context      | 79.2 / 1281.6 / 105.0   | 16px / 24.8px           | 36px 0px            | 0px    |
| .intro             | 0.0 / 1440.0 / 2412.0   | 16px / 24.8px           | 0px                 | 0px    |
| .intro-stage       | 0.0 / 1440.0 / 900.0    | 16px / 24.8px           | 0px                 | 0px    |
| .work-stage        | 0.0 / 1440.0 / 900.0    | 16px / 24.8px           | 0px                 | 0px    |
| .work-card         | 208.8 / 1022.4 / 630.1  | 16px / 24.8px           | 0px                 | 14.4px |
| .work-card-media   | 208.8 / 1022.4 / 511.2  | 16px / 24.8px           | 0px                 | 14.4px |
| .summit-inner      | 80.0 / 1280.0 / 1470.5  | 16px / 24.8px           | 56px 0px 0px        | 0px    |
| .editorial-heading | 80.0 / 1280.0 / 146.9   | 72px / 73.44px          | 0px                 | 0px    |
| .summit-lanes      | 80.0 / 1280.0 / 32.0    | 16px / 24.8px           | 0px                 | 0px    |
| .browser-section   | 0.0 / 1440.0 / 4738.4   | 16px / 24.8px           | 28.8px 79.2px 110px | 0px    |
| .about-head        | 80.0 / 1280.0 / 338.7   | 16px / 24.8px           | 57.6px 0px 0px      | 0px    |
| .about-note        | 553.8 / 397.1 / 88.9    | 31.68px / 31.68px       | 0px                 | 0px    |
| .browser           | 115.5 / 1209.0 / 799.5  | 16px / 24.8px           | 0px                 | 12px   |
| .browser-tabs      | 115.5 / 1209.0 / 42.9   | 16px / 24.8px           | 0px 10px 0px 16px   | 0px    |
| .browser-toolbar   | 115.5 / 1209.0 / 40.9   | 16px / 24.8px           | 0px 12px            | 0px    |
| .page-about-photo  | 157.2 / 405.3 / 521.8   | 16px / 24.8px           | 10px 10px 44px      | 0px    |
| .page-about-copy   | 605.8 / 664.1 / 400.2   | 16px / 24.8px           | 0px                 | 0px    |
| .footer-inner      | 130.0 / 1180.0 / 254.1  | 16px / 24.8px           | 0px                 | 0px    |
| .footer-title      | 130.0 / 581.7 / 76.4    | 74.88px / 76.3776px     | 0px                 | 0px    |
| .footer-email      | 783.7 / 341.8 / 39.6    | 36px / 39.6px           | 0px                 | 0px    |

### 1920 × 1080

| Element            | x / width / height (px) | Font size / line height | Padding           | Radius |
| ------------------ | ----------------------- | ----------------------- | ----------------- | ------ |
| .hero-nav          | 105.6 / 1708.8 / 77.0   | 15px / 23.25px          | 22px 0px          | 0px    |
| .hero-stage        | 105.6 / 1708.8 / 510.0  | 16px / 24.8px           | 22px 0px 0px      | 0px    |
| .hero-intro        | 105.6 / 263.2 / 100.0   | 100px / 100px           | 0px               | 0px    |
| .hero-name         | 93.6 / 956.4 / 240.0    | 300px / 240px           | 0px               | 0px    |
| .hero-pinboard     | 1234.4 / 580.0 / 341.2  | 16px / 24.8px           | 0px               | 0px    |
| .hero-polaroid     | 1217.6 / 271.7 / 317.6  | 16px / 24.8px           | 10px 10px 14px    | 0px    |
| .hero-foot         | 105.6 / 1708.8 / 131.2  | 16px / 24.8px           | 10px 0px 36px     | 0px    |
| .hero-context      | 105.6 / 1708.8 / 105.0  | 16px / 24.8px           | 36px 0px          | 0px    |
| .intro             | 0.0 / 1920.0 / 2894.4   | 16px / 24.8px           | 0px               | 0px    |
| .intro-stage       | 0.0 / 1920.0 / 1080.0   | 16px / 24.8px           | 0px               | 0px    |
| .work-stage        | 0.0 / 1920.0 / 1080.0   | 16px / 24.8px           | 0px               | 0px    |
| .work-card         | 340.0 / 1240.0 / 758.9  | 16px / 24.8px           | 0px               | 14.4px |
| .work-card-media   | 340.0 / 1240.0 / 640.0  | 16px / 24.8px           | 0px               | 14.4px |
| .summit-inner      | 320.0 / 1280.0 / 1732.6 | 16px / 24.8px           | 56px 0px 0px      | 0px    |
| .editorial-heading | 320.0 / 1280.0 / 155.0  | 76px / 77.52px          | 0px               | 0px    |
| .summit-lanes      | 320.0 / 1280.0 / 32.0   | 16px / 24.8px           | 0px               | 0px    |
| .browser-section   | 0.0 / 1920.0 / 5633.5   | 16px / 24.8px           | 32px 96px 110px   | 0px    |
| .about-head        | 320.0 / 1280.0 / 381.2  | 16px / 24.8px           | 60px 0px 0px      | 0px    |
| .about-note        | 898.6 / 421.3 / 91.5    | 34px / 34px             | 0px               | 0px    |
| .browser           | 355.5 / 1209.0 / 799.5  | 16px / 24.8px           | 0px               | 12px   |
| .browser-tabs      | 355.5 / 1209.0 / 42.9   | 16px / 24.8px           | 0px 10px 0px 16px | 0px    |
| .browser-toolbar   | 355.5 / 1209.0 / 40.9   | 16px / 24.8px           | 0px 12px          | 0px    |
| .page-about-photo  | 397.3 / 402.9 / 518.9   | 16px / 24.8px           | 10px 10px 44px    | 0px    |
| .page-about-copy   | 849.7 / 660.2 / 408.6   | 16px / 24.8px           | 0px               | 0px    |
| .footer-inner      | 370.0 / 1180.0 / 417.1  | 16px / 24.8px           | 0px               | 0px    |
| .footer-title      | 370.0 / 579.6 / 77.5    | 76px / 77.52px          | 0px               | 0px    |
| .footer-email      | 1025.6 / 341.8 / 39.6   | 36px / 39.6px           | 0px               | 0px    |

### 768 × 1024

| Element            | x / width / height (px) | Font size / line height | Padding         | Radius |
| ------------------ | ----------------------- | ----------------------- | --------------- | ------ |
| .hero-nav          | 24.0 / 720.0 / 69.0     | 14px / 21.7px           | 18px 0px        | 0px    |
| .hero-stage        | 24.0 / 720.0 / 519.9    | 16px / 24.8px           | 18px 0px 0px    | 0px    |
| .hero-intro        | 24.0 / 142.1 / 54.0     | 54px / 54px             | 0px             | 0px    |
| .hero-name         | 18.4 / 446.3 / 112.0    | 140px / 112px           | 0px             | 0px    |
| .hero-pinboard     | 44.0 / 680.0 / 289.1    | 16px / 24.8px           | 0px 0px 44px    | 0px    |
| .hero-polaroid     | 29.9 / 245.6 / 269.8    | 16px / 24.8px           | 6px 6px 8px     | 0px    |
| .hero-foot         | 24.0 / 720.0 / 194.3    | 16px / 24.8px           | 32px 0px        | 0px    |
| .hero-context      | 24.0 / 720.0 / 125.0    | 16px / 24.8px           | 28px 0px        | 0px    |
| .intro             | 0.0 / 768.0 / 2744.3    | 16px / 24.8px           | 0px             | 0px    |
| .intro-stage       | 0.0 / 768.0 / 1024.0    | 16px / 24.8px           | 0px             | 0px    |
| .work-card         | 26.1 / 715.8 / 471.4    | 16px / 24.8px           | 0px             | 14.4px |
| .work-card-media   | 26.1 / 715.8 / 357.9    | 16px / 24.8px           | 0px             | 14.4px |
| .summit-inner      | 38.4 / 691.2 / 1495.7   | 16px / 24.8px           | 30.72px 0px 0px | 0px    |
| .editorial-heading | 38.4 / 691.2 / 78.3     | 38.4px / 39.168px       | 0px             | 0px    |
| .summit-lanes      | 38.4 / 691.2 / 32.0     | 16px / 24.8px           | 0px             | 0px    |
| .browser-section   | 0.0 / 768.0 / 1368.9    | 16px / 24.8px           | 16px 12px 110px | 0px    |
| .about-head        | 12.0 / 744.0 / 222.5    | 16px / 24.8px           | 32px 0px 0px    | 0px    |
| .about-note        | 11.9 / 744.2 / 62.9     | 24px / 24px             | 0px             | 0px    |
| .browser           | 21.3 / 725.4 / 949.0    | 16px / 24.8px           | 0px             | 16px   |
| .browser-tabs      | 21.3 / 725.4 / 48.8     | 16px / 24.8px           | 0px 6px         | 0px    |
| .browser-toolbar   | 21.3 / 725.4 / 42.9     | 16px / 24.8px           | 0px 12px        | 0px    |
| .page-about-photo  | 29.4 / 292.0 / 383.3    | 16px / 24.8px           | 10px 10px 44px  | 0px    |
| .page-about-copy   | 38.8 / 690.3 / 348.7    | 16px / 24.8px           | 0px             | 0px    |
| .footer-inner      | 38.4 / 691.2 / 380.0    | 16px / 24.8px           | 0px             | 0px    |
| .footer-title      | 38.4 / 691.2 / 40.8     | 40px / 40.8px           | 0px             | 0px    |
| .footer-email      | 38.4 / 218.3 / 25.3     | 23px / 25.3px           | 0px             | 0px    |

### 390 × 844

| Element            | x / width / height (px) | Font size / line height | Padding         | Radius |
| ------------------ | ----------------------- | ----------------------- | --------------- | ------ |
| .hero-nav          | 24.0 / 342.0 / 69.0     | 14px / 21.7px           | 18px 0px        | 0px    |
| .hero-stage        | 24.0 / 342.0 / 399.3    | 16px / 24.8px           | 18px 0px 0px    | 0px    |
| .hero-intro        | 24.0 / 142.1 / 54.0     | 54px / 54px             | 0px             | 0px    |
| .hero-name         | 20.0 / 323.2 / 81.1     | 101.4px / 81.12px       | 0px             | 0px    |
| .hero-pinboard     | 24.0 / 342.0 / 204.0    | 16px / 24.8px           | 0px 0px 44px    | 0px    |
| .hero-polaroid     | 14.6 / 123.4 / 171.6    | 16px / 24.8px           | 6px 6px 8px     | 0px    |
| .hero-foot         | 24.0 / 342.0 / 194.3    | 16px / 24.8px           | 32px 0px        | 0px    |
| .hero-context      | 24.0 / 342.0 / 171.0    | 16px / 24.8px           | 28px 0px        | 0px    |
| .intro             | 0.0 / 390.0 / 2261.9    | 16px / 24.8px           | 0px             | 0px    |
| .intro-stage       | 0.0 / 390.0 / 844.0     | 16px / 24.8px           | 0px             | 0px    |
| .work-card         | 16.0 / 358.0 / 330.5    | 16px / 24.8px           | 0px             | 14.4px |
| .work-card-media   | 16.0 / 358.0 / 179.0    | 16px / 24.8px           | 0px             | 14.4px |
| .summit-inner      | 19.5 / 351.0 / 1309.2   | 16px / 24.8px           | 28px 0px 0px    | 0px    |
| .editorial-heading | 19.5 / 351.0 / 63.6     | 31.2px / 31.824px       | 0px             | 0px    |
| .summit-lanes      | 19.5 / 351.0 / 70.0     | 16px / 24.8px           | 0px             | 0px    |
| .browser-section   | 0.0 / 390.0 / 1536.2    | 16px / 24.8px           | 16px 12px 110px | 0px    |
| .about-head        | 12.0 / 366.0 / 220.8    | 16px / 24.8px           | 32px 0px 0px    | 0px    |
| .about-note        | 11.6 / 366.8 / 43.1     | 24px / 24px             | 0px             | 0px    |
| .browser           | 16.6 / 356.8 / 1113.8   | 16px / 24.8px           | 0px             | 16px   |
| .browser-tabs      | 16.6 / 356.8 / 48.8     | 16px / 24.8px           | 0px 6px         | 0px    |
| .browser-toolbar   | 16.6 / 356.8 / 42.9     | 16px / 24.8px           | 0px 12px        | 0px    |
| .page-about-photo  | 24.6 / 292.0 / 383.3    | 16px / 24.8px           | 10px 10px 44px  | 0px    |
| .page-about-copy   | 34.1 / 321.8 / 516.1    | 16px / 24.8px           | 0px             | 0px    |
| .footer-inner      | 24.0 / 342.0 / 404.7    | 16px / 24.8px           | 0px             | 0px    |
| .footer-title      | 24.0 / 342.0 / 40.8     | 40px / 40.8px           | 0px             | 0px    |
| .footer-email      | 24.0 / 218.3 / 25.3     | 23px / 25.3px           | 0px             | 0px    |

## Section structure, surface and interaction specification

Order: navigation/hero → experience strip → centered immersive work entrance → featured work → more work → snippets (adapted to toolkit) → About browser → mountain/contact/footer. The reference also includes a daylight/mountain transition before snippets, visible in the desktop scroll samples; the local version keeps a shorter paper transition to useful skills content.

- **Navigation:** static rather than sticky; DM Sans 15px desktop, 14px mobile; 32px approximate item gap. Reference has inline navigation at all four widths, no menu button was found. Hover observed; local uses coral/underline with equivalent focus ring. No fictitious menu was introduced.
- **Hero:** paper field, near-black sans name, coral punctuation, italic serif greeting and drawn underline. Three square-corner white prints overlap each other, not the name. Reference pinboard is right-aligned on desktop and below the wordmark on tablet/mobile. Reference first print padding10/10/14px desktop,6/6/8px mobile; transformed measured sizes are in the table. Local prints retain Darsh's own photo and original cloud/terminal illustrations. Desktop greeting now scales80px at1440 to100px at1920; full-name size deliberately differs from a single-word reference. Hero intro/experience rows now return close to the reference's first-viewport balance. The two-line full name necessarily makes mobile hero taller.
- **Experience:** thin horizontal rules, serif organization labels and small coral pill. Authentic education/open-source content replaces employment brands. No employer claims added.
- **Work entrance:** reference sticky full-viewport paper stage, centered3D object with rotation/zoom; exact model shader/easing unverified. Local existing server/braces motif now rotates/scales and transitions paper→dark with scroll. Desktop pin lasts one viewport; reference intro height at1440 is2412px (longer). Local uses GSAP scrub0.6; this is an implementation value, not a measured reference duration. Skip link always available. Mobile and reduced-motion remain unpinned.
- **Featured work:** reference dark#141212, 71vw card width capped1240px; art roughly2:1 with14.4px corners, top-left serif label and bottom-right skip. Local matches71vw/cap1240/14px corners, centered track and persistent label; title23px, technical serif metadata23px. Three distinct code-native project illustrations retain their current colors. Local adds direct repository links and visible exploration buttons. Subtle ±7° CSS perspective follows scroll; it does not claim to reproduce the reference's curved WebGL surface or blur. Flat, vertical presentation remains on small screens/reduced motion. Hover artwork subtly scales and CTA becomes coral. Native dialog/Escape/focus restore preserved.
- **More work:** ruled compact rows, serif heading, muted secondary metadata and arrow links. Existing authentic Java practice/profile links retained.
- **Toolkit/snippets:** reference capped1280px area, Instrument Serif heading72px at1440/76px at1920/38.4px tablet/31.2px mobile; pill categories, dense image grid. Local heading now follows5vw with31–76px bounds and1280px max content. Existing five skills categories remain; two-column compact sheets collapse to one column on mobile. Category counts and keyboard arrows/Home/End remain. Replacing these with imitation UI screenshots would invent work, so this is an intentional content adaptation.
- **About:** reference heading106.56px at1440 with coral italic line and wave underline; note beside heading, inset dark browser. Local matches heading rhythm, side note and wave; capped1280px section,40px total browser inset,14px corners, compact tabs/address bar, own white-framed portrait and bold sans full name. Local dark chrome colors retained. Reference includes dummy tabs/personal apps; no fake applications added. Desktop browser now pins and advances four real tabs; direct tab/keyboard interaction suspends automatic selection. Pinning is enabled only above1024px width/850px height and when the actual frame fits with110px clearance. Mobile, small-height and reduced-motion use normal flow/manual tabs.
- **Contact/footer:** full-width original line-art ridge, capped1180px content, two columns desktop and one below800px. Reference desktop serif title~75px/email36px; mobile title40px/email23px. Local title40px mobile/email26px accommodates the longer authentic address. Dark resume pill, underlined email, social row and bottom rule preserved. Local two-line invitation replaces personal K2 aspirations and statistics. Footer is normal document flow.
- **Motion:** initial coral wipe and hero stagger are retained; desktop intro/gallery/About scroll motion is conditional. Videos in the evidence directories capture initial loads, scrolls and hovers. Wipe1.3s, hero0.85s/stagger0.1s/power3.out, hover250ms, and scrub0.6 are local timings, not claims of exact reference timing. Reference cursor/audio settings and pencil progress decoration remain intentionally unreplicated. Local progress rail remains. All animations/transitions and pinning disable for reduced motion; links, content and controls remain available.

## Reusable design tokens

Existing palette preserved: paper`#f1f0ea`, ink`#252820`, coral`#e75b35`, rule`#d3d2c9`, work`#141212`. Reference paper measured`#f1f0eb`; the one-channel difference is retained to honor the palette constraint. Typography: DM Sans for UI/name; Instrument Serif for editorial titles; Caveat for notes. Containers:89% hero/nav,1800px safety cap;1280px toolkit/About;1180px contact; gallery`min(71vw,1240px)`. Mobile hero/nav24px gutters. Added CSS tokens:`--content-max`, `--motion-hover`, `--browser-radius`, `--print-shadow`; existing`--paper`, `--ink`, `--orange`, `--line` remain authoritative.

## Comparison loop and outcomes

1. **Before:** four requested viewport pairs, full-page/section captures and desktop0–100% scroll samples. Three largest actionable discrepancies: hero vertical balance, gallery framing, About composition.
2. **Iteration1:** production build passed; captures saved in`artifacts/fidelity/iteration-1`. Centered gallery, persistent label, original scroll entrance, About side note/chrome/sans identity and guarded scroll tabs implemented. Comparison showed remaining wide-screen width differences, an overwide pinned browser, and tablet/mobile type/column differences.
3. **Iteration2:** capped gallery1240px, toolkit/About1280px, footer1180px; explicit browser width fixed inset; responsive title scaling and single-column tablet contact. Production build passed; screenshots in`after`. Review caught an initial-render label positioning flash and mobile caption/note crowding.
4. **Final:** scoped initial gallery chrome and gave its stage a positioning context; added mobile collage breathing room. Production build passed again. Final captures in`final` wait for hydration before taking the settled view. Before screenshots are preserved. Largest remaining differences are deliberate: two-line full name/own imagery, three engineering projects/skills instead of design cases/snippets, and an original simplified server transition instead of the3D headset/WebGL warp.

No resemblance percentage or pixel equality is asserted. Layout measurements and paired screenshots are more useful than image-difference scores for different text and pictures. The comparison HTML presents unaltered source screenshots side by side; it does not modify reference geometry or colors.

## Remaining limitations

- Exact reference shader, cursor/audio behavior, loading-percentage semantics and frame-accurate easing are not reproduced or claimed as matched.
- Reference has a longer daylight/mountain interlude before snippets; local retains the established shorter transition to engineering skills. Extending it would add substantial scrolling without additional authentic content.
- Own portrait, code-native artwork, full name, learning strip, skills and contact biography intentionally remain different. All prior personal qualifications/technical details are preserved, not newly independently certified in this pass.
- Resume is an email request, not a download. LinkedIn returnsHTTP999 to automated requests; destination string is preserved, but profile availability cannot be confirmed from that response. Five GitHub destinations return200.
- Browser checks use Chromium. Safari/Firefox and physical-device rendering are unverified.

## Files changed in this fidelity pass

- `src/components/editorial/EditorialPortfolio.tsx`: scroll entrance, centered gallery motion/label placement, guarded About sequencing with manual and focus override.
- `src/styles.css`: measured geometry, wide-screen caps, typography, underline, browser chrome, responsive contact/collage and initial-render containment.
- `scripts/verify-portfolio.mjs`: exact requested viewport pairs plus1024px; hydration, touch context, settled filter screenshots.
- `scripts/capture-fidelity.mjs`: before/iteration/final viewport, section, scroll and video capture; computed geometry.
- `scripts/measure-reference.mjs`: reference section measurements and supplemental captures.
- `scripts/reference-dom.mjs`: read-only reference DOM inspection.
- `scripts/check-content-references.mjs`: read-only directory/live portfolio context.
- `scripts/verify-fidelity.mjs`: hover video/screenshots, About scroll/manual override, resume destinations and mobile touch checks.
- `docs/REFERENCE_FIDELITY_AUDIT.md`: this audit/specification and verification record.

Other existing modified/untracked files predate this pass and were preserved. No dependencies added, no Git reset/checkout/commit/push, no deployment.

## Executed verification and local review

Commands run from the workspace:

```powershell
npm run typecheck
npm run lint
npm run build
$env:PLAYWRIGHT_BROWSERS_PATH='C:/Users/daksh/AppData/Local/ms-playwright'
node scripts/capture-fidelity.mjs before
node scripts/measure-reference.mjs
node scripts/reference-dom.mjs
node scripts/check-content-references.mjs
node scripts/capture-fidelity.mjs iteration-1
node scripts/capture-fidelity.mjs after
node scripts/capture-fidelity.mjs final
node scripts/verify-portfolio.mjs
node scripts/verify-fidelity.mjs
node scripts/check-links.mjs
git diff --check
```

TypeScript passed. Production builds passed. ESLint passed with0errors and two pre-existing warnings in unused legacy`ArrivalTunnel.tsx` and`SystemsTopology.tsx`. An initial audit-script formatting failure was fixed before the passing lint run. Whitespace check passed (Git emitted existing LF/CRLF conversion notices).

Browser suite passed at1440×900,1920×1080,1024×900,768×1024,390×844: full name/collage separation, no page horizontal overflow, direct repository/contact URLs, image loading, anchor targets, project dialog/Escape/focus containment, keyboard access to offscreen projects, category arrows, About tabs and certificates. Reduced-motion checks passed: no pins/loader, visible content, keyboard skip and all project dialogs. Six local favicon/certificate resources returned200. No browser console/runtime errors captured. Additional motion/touch suite passed: scroll changes About tabs, manual selection persists, browser remains pinned where appropriate, all three resume URLs are correct, mobile taps work, no mobile pin spacers.

Open http://127.0.0.1:8082/ (left running and opened in the in-app browser). If stopped, run`npm run dev -- --host 127.0.0.1 --port 8082`. Review full-name hero, scroll through work, use direct repo links or project dialogs, then try both scrolling and clicking About tabs. Use OS/browser reduced-motion mode to review the normal-flow alternative. Screenshot evidence is local and ignored by Git.

Additional delivered files: `scripts/verify-static-render.mjs` tests the no-JavaScript label regression; `scripts/create-fidelity-comparison.mjs` generates `artifacts/fidelity/comparison.html`; `scripts/capture-comparison.mjs` renders the comparison. Commands `node scripts/verify-static-render.mjs`, `node scripts/create-fidelity-comparison.mjs`, and `node scripts/capture-comparison.mjs` were also executed. The no-JavaScript check passed: hero remains visible and the work label stays below it. Final responsive suite rerun passed after the mobile caption spacing fix.

Review artifacts: [side-by-side comparison](../artifacts/fidelity/comparison.html), [desktop hero](../artifacts/fidelity/final/local-1440-hero.png), [mobile hero](../artifacts/fidelity/final/local-390-hero.png), [browser results](../artifacts/refinement/browser-results.json), [motion results](../artifacts/fidelity/motion-results.json).
