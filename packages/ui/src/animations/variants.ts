import type { Variants } from "motion/react";
import { EASE, DURATION } from "./easings";

/**
 * Variants reutilizables para Motion. Uso típico:
 *
 *   <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={VIEWPORT} />
 *
 * Para listas: contenedor con `stagger()` y cada hijo con `fadeUp`.
 */

export const VIEWPORT = { once: true, amount: 0.25, margin: "0px 0px -10% 0px" } as const;

const base = (extra: Record<string, unknown>) => ({
  duration: DURATION.slow,
  ease: EASE.outExpo,
  ...extra,
});

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: base({}) },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: base({}) },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  show: { opacity: 1, y: 0, transition: base({}) },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: base({}) },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: base({}) },
};

/** Entrada con desenfoque — la firma "Black Mirror" del sistema. */
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(16px)", y: 16 },
  show: { opacity: 1, filter: "blur(0px)", y: 0, transition: base({ duration: DURATION.cinematic }) },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: base({}) },
};

/** Para elementos que "emergen" del suelo (mockups, tarjetas grandes). */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 80, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: base({ duration: DURATION.cinematic }) },
};

/**
 * Revelado con máscara vertical (tipo cortina): el hijo sube desde abajo dentro de un wrapper
 * `overflow-hidden`. <Reveal preset="clipUp"> ya arma el wrapper. Si lo usás a mano, poné
 * `whileInView` en el wrapper (no en el hijo desplazado): IntersectionObserver no ve elementos
 * clipeados por overflow/clip-path.
 */
export const clipUp: Variants = {
  hidden: { y: "105%", opacity: 0.001 },
  show: { y: "0%", opacity: 1, transition: base({ duration: DURATION.cinematic }) },
};

/** Contenedor que escalona a sus hijos. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0.05): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/** Para palabras/caracteres dentro de TextReveal. */
export const wordUp: Variants = {
  hidden: { opacity: 0, y: "0.6em", rotateX: -30 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: base({ duration: 0.7 }) },
};

/** Hover estándar para tarjetas. */
export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: { y: -6, scale: 1.01, transition: { duration: 0.35, ease: EASE.outQuart } },
} satisfies Variants;

/** Transición de página / sección completa. */
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: base({}) },
  exit: { opacity: 0, y: -12, filter: "blur(8px)", transition: { duration: DURATION.fast } },
};
