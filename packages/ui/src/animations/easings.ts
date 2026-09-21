/**
 * Curvas de easing de la marca. Usar siempre estas — nunca `linear` ni `ease` por defecto.
 * Formato: arrays cubic-bezier compatibles con Motion y GSAP (`CustomEase` / `"power4.out"` equivalentes).
 */
export const EASE = {
  /** Salida explosiva y frenado largo. Para entradas de secciones y hero. */
  outExpo: [0.16, 1, 0.3, 1] as const,
  /** Más suave que expo. Para hovers y micro-interacciones. */
  outQuart: [0.25, 1, 0.5, 1] as const,
  /** Simétrico y sedoso. Para transiciones entre estados y gradientes. */
  inOutSmooth: [0.65, 0, 0.35, 1] as const,
  /** Overshoot leve. Para chips, badges, íconos que "aparecen". */
  spring: [0.34, 1.56, 0.64, 1] as const,
  /** Apple-like. Para desplazamientos de paneles. */
  apple: [0.32, 0.72, 0, 1] as const,
};

/** Duraciones estándar en segundos. */
export const DURATION = {
  fast: 0.25,
  base: 0.6,
  slow: 0.9,
  cinematic: 1.4,
};

/** Presets de spring físico para Motion (`transition={SPRING.soft}`). */
export const SPRING = {
  soft: { type: "spring", stiffness: 120, damping: 20, mass: 1 } as const,
  snappy: { type: "spring", stiffness: 400, damping: 30, mass: 0.8 } as const,
  bouncy: { type: "spring", stiffness: 300, damping: 14, mass: 0.9 } as const,
  slow: { type: "spring", stiffness: 60, damping: 18, mass: 1.2 } as const,
};
