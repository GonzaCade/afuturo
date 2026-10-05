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
  duration: DURATION.enter,
  ease: EASE.outExpo,
  ...extra,
});

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: base({}) },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: base({}) },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -14 },
  show: { opacity: 1, y: 0, transition: base({}) },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: base({}) },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: base({}) },
};

/** Entrada con desenfoque leve: la firma del sistema (silenciosa, no vistosa). */
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 10 },
  show: { opacity: 1, filter: "blur(0px)", y: 0, transition: base({ duration: DURATION.cinematic }) },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: base({}) },
};

/** Objetos que "se apoyan" en la superficie (mockups, superficies hero). */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: base({ duration: DURATION.cinematic }) },
};

/**
 * Revelado con máscara vertical: el hijo sube dentro de un wrapper `overflow-hidden`.
 * <Reveal preset="clipUp"> ya arma el wrapper (el observado es el wrapper, no el hijo clipeado).
 */
export const clipUp: Variants = {
  hidden: { y: "105%", opacity: 0.001 },
  show: { y: "0%", opacity: 1, transition: base({ duration: DURATION.cinematic }) },
};

/** Contenedor que escalona a sus hijos. */
export const stagger = (staggerChildren = 0.06, delayChildren = 0.04): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/** Para palabras/caracteres dentro de TextReveal. */
export const wordUp: Variants = {
  hidden: { opacity: 0, y: "0.5em" },
  show: { opacity: 1, y: 0, transition: base({ duration: 0.6 }) },
};

/** Hover físico estándar para tarjetas: 2–3 px arriba, sombra apenas más fuerte. */
export const cardHover = {
  rest: { y: 0 },
  hover: { y: -3, transition: { duration: DURATION.base, ease: EASE.outQuart } },
} satisfies Variants;

/** Transición de página / vista. */
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 8, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: base({}) },
  exit: { opacity: 0, y: -8, filter: "blur(4px)", transition: { duration: DURATION.slow } },
};
