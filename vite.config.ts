// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
//
// Deploy target: intentionally no `nitro.preset` override here. The wrapper passes
// Nitro `defaultPreset: "cloudflare-module"` — a fallback, not a pin — so Nitro's
// own zero-config platform detection (NITRO_PRESET, or Vercel/Netlify/CF Pages CI
// env) wins whenever it fires. Connecting this repo to Vercel therefore builds for
// Vercel with no change to this file. The lone exception is a Lovable sandbox
// build, which hard-pins preset and output dirs to Cloudflare.
//
// Consequence worth knowing: platform-specific *header* config does not follow the
// switch. public/_headers is Cloudflare/Netlify-only and degrades into an inert
// static file at /_headers under the Vercel preset — verified by building with
// NITRO_PRESET=vercel. So the noindex protecting the phone number in
// public/resume.pdf lives in public/robots.txt, which is copied verbatim into the
// static output on every preset. Nitro routeRules would be the native alternative,
// but the wrapper forwards only preset/output/cloudflare.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
//import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/tanstack/vite";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    plugins: [],
  },
});
