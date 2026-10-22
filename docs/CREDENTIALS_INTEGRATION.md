# Credentials integration

The existing editorial redesign now includes **Proof of progress.** after About and before Contact. The About credentials tab links to this collection.

## Inventory and evidence

The supplied `src/data/credentials.json` is the source for five achievements. Oracle and EduSkills replace the corresponding existing records while keeping their existing technical IDs. Three AWS training records are new. Four other existing records remain, for **nine unique achievements** total. Badge and certificate pairs are one record, never separate achievements.

| Achievement                                 | Evidence                        | Classification                                                          |
| ------------------------------------------- | ------------------------------- | ----------------------------------------------------------------------- |
| Oracle Agentic AI Foundations Associate     | Badge + recognition certificate | Oracle certification; 9 August 2026                                     |
| AWS Cloud Quest: Solutions Architect        | Badge + completion certificate  | Training completion; 10 October 2026                                    |
| AWS Cloud Quest: Cloud Practitioner         | Badge + completion certificate  | Training completion; 17 September 2026                                  |
| AWS Academy Cloud Foundations               | Badge + completion certificate  | Training completion; 20 hours; 9 September 2026                         |
| EduSkills / AICTE AI-Powered Cloud Engineer | Public-safe certificate         | Eight-week virtual internship; June–August 2026; AWS Educate curriculum |

The remaining Deloitte simulation and three OpenAI Academy learning entries were preserved from the existing portfolio. The existing **AI Foundations** entry has no certificate image; its detail dialog explicitly says so. No new verification URLs were invented, and no image-backed record is labelled externally verified. AWS training is not labelled as an AWS certification exam; the internship is not described as AWS employment.

All nine supplied images were inspected. Original aspect ratios are preserved. The internship's QR and internal identifiers are concealed in the supplied public-safe image. The old `public/certificates/eduskills-cloud-engineer.jpg` now contains the same safe bytes, preventing that legacy public URL from serving the original image. The supplied ZIP itself is unchanged.

## Implementation

- Prominent Oracle certificate and original badge, curated AWS badge row, separate internship feature, and compact additional-learning rows.
- Existing cream/charcoal/coral tokens and serif/handwritten typography reused. No dependencies added.
- Native responsive detail dialog with title, issuer, date, category, description, paired imagery and local **View certificate** actions.
- Escape, close button and backdrop dismissal; explicit Tab/Shift+Tab wrapping; focus restored to the activating card. Each opening resets the preview to its top.
- Subtle GSAP entry reveals and CSS hover feedback, disabled for reduced motion. Below-fold collection imagery is lazy-loaded. Dialog images load only when opened.

## Files added/modified in this task

- `src/components/editorial/CredentialsSection.tsx` — new section and accessible detail dialog.
- `src/components/editorial/CredentialsSection.css` — scoped editorial/responsive styles.
- `src/components/editorial/EditorialPortfolio.tsx` — mount section and link from About credentials tab.
- `src/data/credentials.json` — supplied manifest, retained as source data.
- `src/data/portfolioData.ts` — merged inventory, stable legacy IDs, badge/type/verification metadata.
- `public/certifications/oracle-agentic-ai-badge.jpg`
- `public/certifications/oracle-agentic-ai-certificate.jpg`
- `public/certifications/aws-cloud-quest-solutions-architect-badge.png`
- `public/certifications/aws-cloud-quest-solutions-architect-certificate.jpg`
- `public/certifications/aws-cloud-quest-cloud-practitioner-badge.png`
- `public/certifications/aws-cloud-quest-cloud-practitioner-certificate.jpg`
- `public/certifications/aws-academy-cloud-foundations-badge.png`
- `public/certifications/aws-academy-cloud-foundations-certificate.jpg`
- `public/certifications/eduskills-ai-cloud-engineer-internship-certificate-public.jpg`
- `public/certificates/eduskills-cloud-engineer.jpg` — safe legacy alias.
- `scripts/verify-credentials.mjs` — asset, modal, responsive, focus and reduced-motion checks.
- `scripts/verify-portfolio.mjs` — update intentional About navigation change; scope project-dialog assertions now that a second dialog exists.
- `docs/CREDENTIALS_INTEGRATION.md` — this report.

Other uncommitted changes predate this task and were preserved. Nothing pushed or deployed.

## Verification

Executed commands:

```powershell
npm run typecheck
npm run build
npm run lint
$env:PLAYWRIGHT_BROWSERS_PATH='C:/Users/daksh/AppData/Local/ms-playwright'
node scripts/verify-credentials.mjs
node scripts/verify-portfolio.mjs
```

Credential suite passed at 1440×900, 1024×900, 768×1024 and 390×844: nine unique cards, all five supplied records, every modal, correct badge/certificate pairing and dates, original image ratios, HTTP200 local proof links, keyboard focus containment/restoration, Escape/close/backdrop, no horizontal overflow, mobile taps and reduced motion. All nine supplied assets returned200. Legacy internship alias is byte-identical to the safe version. No console/runtime errors captured.

Portfolio regression passed at 1440,1920,1024,768 and390 widths, plus reduced-motion mode. Hero name/collage, project dialogs, keyboard gallery access, navigation, filters, About tabs and image loading remain functional. Initial tests caught the image-free dialog's Tab behavior, which was fixed; a test selector also needed narrowing from all dialogs to project dialogs after adding the credential dialog.

TypeScript and production build pass. Lint has no errors and the two pre-existing unused legacy-component warnings (ArrivalTunnel hook dependency and SystemsTopology Fast Refresh export).

Review at http://127.0.0.1:8082/#credentials. Evidence: `artifacts/credentials/results.json`, `feature-{1440,1024,768,390}.png`, `training-*.png`, `internship-*.png`, `collection-*.png`, and modal screenshots.

Remaining limitations: the preserved AI Foundations entry has no image; external credential verification is not claimed; testing uses Chromium rather than physical devices or every browser engine.

Final targeted check also passed: opening a different credential resets dialog scroll to zero; both the served legacy internship URL and production-build alias match the public-safe image byte-for-byte. Command: node artifacts/credentials/final-check.mjs. git diff --check passed (existing LF/CRLF notices only).
