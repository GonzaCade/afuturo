/**
 * Curvas de easing de la marca. Usar siempre estas — nunca `linear` ni `ease` por defecto.
 * Formato: arrays cubic-bezier compatibles con Motion y GSAP.
 */
export const EASE = {
  /** Salida rápida y frenado largo. Entradas de secciones. */
  outExpo: [0.16, 1, 0.3, 1] as const,
  /** Más suave que expo. Hovers y micro-interacciones. */
  outQuart: [0.25, 1, 0.5, 1] as const,
  /** Simétrico. Transiciones entre estados. */
  inOutSmooth: [0.65, 0, 0.35, 1] as const,
  /** Overshoot mínimo. Chips, indicadores, toggles. */
  spring: [0.22, 1.2, 0.36, 1] as const,
  /** Apple-like. Paneles y sheets. */
  apple: [0.32, 0.72, 0, 1] as const,
};

/** Duraciones en segundos. Interacciones 0.16–0.32; entradas 0.5–0.8. */
export const DURATION = {
  fast: 0.16,
  base: 0.24,
  slow: 0.32,
  enter: 0.6,
  cinematic: 0.9,
};

/** Springs físicos contenidos para Motion (`transition={SPRING.snappy}`). */
export const SPRING = {
  soft: { type: "spring", stiffness: 170, damping: 24, mass: 1 } as const,
  snappy: { type: "spring", stiffness: 480, damping: 34, mass: 0.8 } as const,
  gentle: { type: "spring", stiffness: 120, damping: 20, mass: 1 } as const,
  slow: { type: "spring", stiffness: 70, damping: 18, mass: 1.2 } as const,
};

/** Hover / press físico estándar para cualquier superficie interactiva. */
export const PRESS = {
  whileHover: { y: -2 },
  whileTap: { scale: 0.98 },
  transition: { duration: DURATION.base, ease: EASE.outQuart },
} as const;
