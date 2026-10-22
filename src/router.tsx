import { QueryClient } from "@tanstack/react-query";
import { createBrowserHistory, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();
  let firstScrollRender = true;
  // Native hash entries may have custom state but no router key. TanStack's
  // initial key creation replaces that state; merge it back before subscribing.
  const arrival = typeof window !== "undefined" ? window.__homepageArrival : undefined;
  const initialState = arrival?.fresh ? window.history.state : null;
  const history = arrival?.fresh ? createBrowserHistory() : undefined;
  if (history && initialState && typeof initialState === "object") {
    history.replace(history.location.href, { ...initialState, ...history.location.state });
    history.flush();
  }

  const router = createRouter({
    routeTree,
    history,
    context: { queryClient },
    scrollRestoration: () => {
      const arrival = typeof window !== "undefined" ? window.__homepageArrival : undefined;
      const initial = firstScrollRender;
      firstScrollRender = false;
      return !(arrival?.pending || (initial && (arrival?.fresh || arrival?.restore)));
    },
    defaultPreloadStaleTime: 0,
  });

  return router;
};
