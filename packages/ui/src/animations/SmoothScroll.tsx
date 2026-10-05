import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

/**
 * Scroll del sitio. Por defecto es **nativo** (como Pinterest): sin inercia artificial ni lag.
 * `smooth` activa Lenis solo para escenas cinemáticas que lo pidan. Respeta `prefers-reduced-motion`.
 */
export function SmoothScroll({ children, smooth = false, lerp = 0.12 }: { children: ReactNode; smooth?: boolean; lerp?: number }) {
  useEffect(() => {
    if (!smooth) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp, smoothWheel: true, wheelMultiplier: 1 });
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    const w = window as unknown as { __lenis?: Lenis };
    w.__lenis = lenis;
    return () => { cancelAnimationFrame(raf); lenis.destroy(); delete w.__lenis; };
  }, [smooth, lerp]);
  return <>{children}</>;
}

/** Scrollea a un ancla: Lenis si está activo, si no scroll nativo suave. */
export function scrollToId(id: string, offset = -80) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) { lenis.scrollTo(el, { offset }); return; }
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: "smooth" });
}
