/**
 * Canonical production origin, used for canonical URLs, og:url, and og:image.
 *
 * ⚠️ Set this to your real domain before deploying. Override at build time with
 * VITE_SITE_URL, or edit the fallback below. `public/robots.txt` and
 * `public/sitemap.xml` are static files and must be updated to match by hand.
 */
export const SITE_URL = (
  (import.meta.env.VITE_SITE_URL as string | undefined) ??
  "https://darshsoam07-portfolio-spark.workers.dev"
).replace(/\/$/, "");

/** Absolute URL for a path rooted at the site origin. */
export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/** Social share card — 1200x630, generated from the portrait. */
export const OG_IMAGE_PATH = "/og-image.jpg";
