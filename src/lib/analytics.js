// Minimal analytics shim. Works with zero configuration — every call is a
// safe no-op unless window.gtag / window.plausible / a future provider is
// present. Swap in a real provider later without touching call sites.
export function track(eventName, payload = {}) {
  try {
    if (typeof window === 'undefined') return;

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, payload);
    }
    if (typeof window.plausible === 'function') {
      window.plausible(eventName, { props: payload });
    }
    if (import.meta.env.DEV) {
      // Visible in the browser console during local development only.
      // eslint-disable-next-line no-console
      console.debug('[analytics]', eventName, payload);
    }
  } catch {
    // Analytics must never break the page.
  }
}
