import { useLayoutEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook para escenas GSAP con limpieza automática (gsap.context).
 * Para todo lo que Motion no resuelve bien: timelines largos, pin de varios elementos,
 * scrub sincronizado, secuencias de frames tipo Apple / capas tipo Rockstar.
 *
 *   const ref = useGsap((gsap, self) => {
 *     gsap.timeline({ scrollTrigger: { trigger: self, start: "top top", end: "+=200%", pin: true, scrub: 1 } })
 *       .to(".capa-1", { y: -200 }, 0)
 *       .to(".capa-2", { y: -400, scale: 1.2 }, 0)
 *       .from(".titulo", { opacity: 0, filter: "blur(20px)" }, 0.3);
 *   });
 *   return <section ref={ref}>…</section>
 */
export function useGsap<T extends HTMLElement = HTMLDivElement>(
  scene: (g: typeof gsap, root: T) => void,
  deps: unknown[] = [],
): RefObject<T | null> {
  const ref = useRef<T>(null);
  useLayoutEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => scene(gsap, ref.current as T), ref);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}

export { gsap, ScrollTrigger };

/** Sincroniza ScrollTrigger con Lenis (llamar una vez si usás ambos). */
export function syncLenisWithScrollTrigger() {
  const lenis = (window as unknown as { __lenis?: { on: (e: string, cb: () => void) => void } }).__lenis;
  lenis?.on("scroll", ScrollTrigger.update);
}
