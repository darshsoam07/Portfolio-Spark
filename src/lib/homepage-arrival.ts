declare global {
  interface Window {
    __homepageArrival?: {
      pending: boolean;
      fresh: boolean;
      finish: () => void;
      restore?: { x: number; y: number };
    };
  }
}

// Runs before body parsing, hash targeting and router hydration. Never interpolates user data.
export const homepageArrivalScript = `(() => {
  if (location.pathname !== '/') return;
  const replaceState = history.replaceState.bind(history);
  addEventListener('pagehide', () => {
    if (location.pathname === '/') replaceState({ ...history.state, __portfolioScroll: { x: scrollX, y: scrollY } }, '', location.href);
  });
  const navigation = performance.getEntriesByType('navigation')[0];
  if (navigation && navigation.type === 'back_forward') {
    const saved = history.state?.__portfolioScroll;
    window.__homepageArrival = { pending: false, fresh: false, finish: () => {},
      restore: saved && Number.isFinite(saved.x) && Number.isFinite(saved.y) ? saved : undefined };
    return;
  }
  history.scrollRestoration = 'manual';
  if (location.hash) history.replaceState(history.state, '', location.pathname + location.search);
  const root = document.documentElement;
  const top = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  top();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let timer;
  const finish = () => {
    if (!window.__homepageArrival.pending) return;
    window.__homepageArrival.pending = false;
    clearTimeout(timer);
    root.dataset.arrival = 'done';
    document.querySelectorAll('[data-arrival-inert]').forEach(el => { el.inert = false; el.removeAttribute('data-arrival-inert'); });
    top();
    document.dispatchEvent(new Event('homepage-arrival-done'));
    document.removeEventListener('click', skip, true);
    document.removeEventListener('keydown', escape, true);
    document.removeEventListener('animationend', ended, true);
    reduced.removeEventListener('change', change);
  };
  const skip = event => { if (event.target.closest?.('[data-skip-arrival]')) finish(); };
  const escape = event => { if (event.key === 'Escape') finish(); };
  const change = event => { if (event.matches) finish(); };
  const ended = event => { if (event.animationName === 'arrival-exit') finish(); };
  window.__homepageArrival = { pending: !reduced.matches, fresh: true, finish };
  root.dataset.arrival = reduced.matches ? 'done' : 'pending';
  if (!reduced.matches) {
    document.addEventListener('click', skip, true);
    document.addEventListener('keydown', escape, true);
    document.addEventListener('animationend', ended, true);
    reduced.addEventListener('change', change);
    timer = setTimeout(finish, 4000);
  }
})();`;
