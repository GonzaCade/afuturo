import { useEffect, useRef, type CSSProperties } from "react";
import { cn } from "../../lib/cn";

export interface LensGlareProps {
  /** Tamaño natural de la foto de fondo (para reproducir la geometría de `object-cover`). */
  image: { width: number; height: number };
  /** Rectángulo del lente dentro de la foto, en fracciones 0–1. */
  rect: { x: number; y: number; w: number; h: number };
  /** PNG con alpha = silueta del lente (se estira al rectángulo). */
  mask: string;
  /** `object-position` de la foto, en fracciones. Default centro. */
  objectPosition?: { x: number; y: number };
  /** Escala de la flecha (1 = cursor del sistema a 100 %, ~12×19 px). */
  cursorScale?: number;
  /** Desplazamiento del cuerpo de la sombra respecto del cursor, en px. La punta queda siempre en la punta del cursor. */
  offset?: { x: number; y: number };
  /** Desenfoque de la sombra en px. */
  blur?: number;
  /** Diámetro de la luz que rodea a la sombra del cursor. */
  glow?: number;
  /** Diámetro de la sombra del dedo en px (touch). */
  touchSize?: number;
  /** Distancia (en anchos de lente) a la que la sombra empieza a aparecer. */
  reach?: number;
  className?: string;
}

/** Silueta de la flecha del cursor del sistema, punta en (0,0), ~12×19 px. */
const ARROW = "M0 0 L0 15.6 L4.1 12 L6.9 18.2 L9.9 16.9 L7.2 10.8 L12.4 10.8 Z";

/**
 * Sombra del cursor apoyado sobre un lente/vidrio de una foto de fondo: en desktop tiene la forma
 * de la flecha (la punta de la sombra coincide con la punta del cursor) con una luz chica detrás;
 * en touch es la sombra redonda del dedo. Colocar como hermano del `<img>` dentro del mismo
 * contenedor `object-cover`.
 *
 * La posición se escribe directo en el DOM dentro del evento (sin frame loop de Motion ni springs):
 * la sombra tiene que estar pegada al cursor, sin un frame de retraso.
 */
export function LensGlare({
  image, rect, mask, objectPosition = { x: 0.5, y: 0.5 },
  cursorScale = 1, offset = { x: 0, y: 0 }, blur = 3, glow = 140, touchSize = 150, reach = 0.6, className,
}: LensGlareProps) {
  const host = useRef<HTMLDivElement>(null);
  const lens = useRef<HTMLDivElement>(null);
  const arrow = useRef<HTMLDivElement>(null);
  const finger = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = host.current, l = lens.current, a = arrow.current, f = finger.current;
    if (!h || !l || !a || !f) return;
    const place = () => {
      const cw = h.clientWidth, ch = h.clientHeight;
      const s = Math.max(cw / image.width, ch / image.height);
      const rw = image.width * s, rh = image.height * s;
      const ox = (cw - rw) * objectPosition.x, oy = (ch - rh) * objectPosition.y;
      l.style.left = `${ox + rect.x * rw}px`;
      l.style.top = `${oy + rect.y * rh}px`;
      l.style.width = `${rect.w * rw}px`;
      l.style.height = `${rect.h * rh}px`;
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(h);

    const track = (cx: number, cy: number, kind: "mouse" | "touch") => {
      const r = l.getBoundingClientRect();
      const px = cx - r.left, py = cy - r.top;
      if (kind === "mouse") {
        a.style.transform = `translate3d(${px}px, ${py}px, 0)`;
        a.style.opacity = "1"; f.style.opacity = "0";
      } else {
        f.style.setProperty("--fx", `${px}px`); f.style.setProperty("--fy", `${py}px`);
        f.style.opacity = "1"; a.style.opacity = "0";
      }
      const dx = Math.max(0, -px, px - r.width) / r.width, dy = Math.max(0, -py, py - r.height) / r.height;
      const dist = Math.hypot(dx, dy);
      l.style.opacity = String(dist >= reach ? 0 : 1 - dist / reach);
    };
    const onPointer = (e: PointerEvent) => { if (e.pointerType === "mouse") track(e.clientX, e.clientY, "mouse"); };
    const onTouch = (e: TouchEvent) => { const t = e.touches[0]; if (t) track(t.clientX, t.clientY, "touch"); };
    const hide = () => { l.style.opacity = "0"; };
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", hide, { passive: true });
    window.addEventListener("touchcancel", hide, { passive: true });
    document.addEventListener("pointerleave", hide);
    return () => {
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", hide);
      window.removeEventListener("touchcancel", hide);
      document.removeEventListener("pointerleave", hide);
    };
  }, [image.width, image.height, rect.x, rect.y, rect.w, rect.h, objectPosition.x, objectPosition.y, reach]);

  const maskStyle: CSSProperties = {
    maskImage: `url(${mask})`, WebkitMaskImage: `url(${mask})`,
    maskSize: "100% 100%", WebkitMaskSize: "100% 100%",
    maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat",
  };
  const pad = blur * 4;
  const aw = 12.4 * cursorScale, ah = 18.2 * cursorScale;
  // centro aproximado de la flecha (para la luz que la rodea)
  const cx = aw * 0.45 + offset.x, cy = ah * 0.55 + offset.y;

  return (
    <div ref={host} aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div ref={lens} className="absolute transition-opacity duration-200 ease-out" style={{ ...maskStyle, opacity: 0 }}>
        {/* touch: sombra redonda del dedo */}
        <div
          ref={finger}
          className="absolute inset-0 mix-blend-multiply transition-opacity duration-150"
          style={{ opacity: 0, background: `radial-gradient(${touchSize}px circle at var(--fx, -9999px) var(--fy, -9999px), rgb(21 23 26 / 0.4) 0%, rgb(21 23 26 / 0.26) 30%, rgb(21 23 26 / 0.09) 55%, rgb(21 23 26 / 0) 72%)` }}
        />
        {/* mouse: luz suave + sombra con forma de flecha; el origen (0,0) es la punta del cursor */}
        <div ref={arrow} className="absolute left-0 top-0 transition-opacity duration-150 will-change-transform" style={{ opacity: 0, transform: "translate3d(-9999px,-9999px,0)" }}>
          <div
            className="absolute rounded-full mix-blend-screen"
            style={{ width: glow, height: glow, left: cx - glow / 2, top: cy - glow / 2, background: "radial-gradient(circle, rgb(255 255 255 / 0.5) 0%, rgb(255 255 255 / 0.2) 40%, rgb(255 255 255 / 0) 70%)" }}
          />
          <svg
            width={aw + pad * 2} height={ah + pad * 2} viewBox={`${-pad / cursorScale} ${-pad / cursorScale} ${12.4 + (pad * 2) / cursorScale} ${18.2 + (pad * 2) / cursorScale}`}
            className="absolute overflow-visible mix-blend-multiply"
            style={{ left: offset.x - pad, top: offset.y - pad, filter: `blur(${blur}px)` }}
          >
            <path d={ARROW} fill="rgb(21 23 26 / 0.55)" />
          </svg>
        </div>
      </div>
    </div>
  );
}
