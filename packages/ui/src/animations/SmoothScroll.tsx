import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

/**
 * Scroll suave con Lenis (inercia tipo Apple/Rockstar). Envolver toda la app.
 * Respeta `prefers-reduced-motion`.
 */
export function SmoothScroll({ children, lerp = 0.09 }: { children: ReactNode; lerp?: number }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp, smoothWheel: true, wheelMultiplier: 0.95 });
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, [lerp]);
  return <>{children}</>;
}

/** Scrollea a un ancla con Lenis si está activo; si no, usa scrollIntoView. */
export function scrollToId(id: string, offset = -80) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) lenis.scrollTo(el, { offset });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
}
