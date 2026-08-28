import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#07090b] px-4 text-[#f1f6f7]">
      <div className="max-w-md text-center">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-[#b7ff3c] mb-2">[ 404 / NOT FOUND ]</div>
        <h1 className="text-7xl font-bold font-display tracking-tight">404</h1>
        <h2 className="mt-3 text-lg font-mono text-[#b3c0c4]">System node does not exist.</h2>
        <p className="mt-2 text-sm text-[#7c8c92] font-body">
          The requested route was not found in the infrastructure registry.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center border border-[#b7ff3c]/40 bg-[#b7ff3c]/10 px-5 py-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#b7ff3c] transition-all hover:bg-[#b7ff3c] hover:text-[#07090b]"
          >
            Return to Signal
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#07090b] px-4 text-[#f1f6f7]">
      <div className="max-w-md text-center">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-[#ff5a5f] mb-2">[ ERROR / EXCEPTION ]</div>
        <h1 className="text-xl font-bold font-display text-[#f1f6f7]">
          Execution Halted
        </h1>
        <p className="mt-2 text-sm text-[#7c8c92] font-body">
          An unhandled error occurred during runtime rendering.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center border border-[#b7ff3c] bg-[#b7ff3c] px-4 py-2 text-xs font-mono uppercase tracking-[0.2em] text-[#07090b] transition-all hover:bg-[#b7ff3c]/90"
          >
            Re-execute
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center border border-[#253038] px-4 py-2 text-xs font-mono uppercase tracking-[0.2em] text-[#b3c0c4] transition-all hover:border-[#b7ff3c] hover:text-[#f1f6f7]"
          >
            Reset Signal
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Darsh Soam — Cloud & DevOps Engineer | Infrastructure, Automation & AI" },
      {
        name: "description",
        content:
          "Portfolio of Darsh Soam: Cloud & DevOps Engineer specializing in AWS, Kubernetes, Docker, Terraform, CI/CD, and Agentic AI applications.",
      },
      { name: "author", content: "Darsh Soam" },
      { property: "og:title", content: "Darsh Soam — Cloud & DevOps Engineer" },
      {
        property: "og:description",
        content: "Engineering the systems behind the experience. AWS, Kubernetes, Terraform, CI/CD, and AI systems.",
      },
      { property: "og:type", content: "website" },
      { name: "theme-color", content: "#07090b" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (!sessionStorage.getItem('portfolioIntroPlayed') && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                  document.documentElement.classList.add('intro-pending');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="bg-[#07090b] text-[#f1f6f7] antialiased overflow-x-hidden selection:bg-[#b7ff3c] selection:text-[#07090b]">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
