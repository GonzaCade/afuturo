import type React from "react";
import { motion, type HTMLMotionProps, type Variants } from "motion/react";
import { cn } from "../lib/cn";
import { fadeUp, blurIn, scaleIn, fadeLeft, fadeRight, riseIn, clipUp, fadeIn, VIEWPORT } from "./variants";

const PRESETS = { fadeUp, blurIn, scaleIn, fadeLeft, fadeRight, riseIn, clipUp, fadeIn } as const;
export type RevealPreset = keyof typeof PRESETS;

export interface RevealProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  /** Preset de entrada. Default: `fadeUp`. */
  preset?: RevealPreset;
  /** Variants propios (sobrescribe `preset`). */
  variants?: Variants;
  /** Retraso en segundos. */
  delay?: number;
  /** Animar una sola vez (default true). */
  once?: boolean;
  /** Fracción visible para disparar (0–1). Default 0.25. */
  amount?: number;
  /** Renderizar como otro elemento. */
  as?: "div" | "section" | "span" | "li" | "article" | "header" | "footer" | "p" | "h1" | "h2" | "h3";
}

/**
 * Wrapper de "aparece al hacer scroll". Todo bloque visible de una onepage debería
 * entrar con Reveal (o con un contenedor `stagger` + hijos `motion.*`).
 */
export function Reveal({ preset = "fadeUp", variants, delay = 0, once = true, amount = VIEWPORT.amount, as = "div", ...rest }: RevealProps) {
  const Comp = (motion as unknown as Record<string, typeof motion.div>)[as] ?? motion.div;
  const v = variants ?? PRESETS[preset];
  if (!variants && preset === "clipUp") {
    // Máscara: el wrapper (overflow-hidden) es el observado; el hijo se desplaza y hereda las variants.
    const { className, style, children, ...wrapRest } = rest;
    return (
      <Comp
        initial="hidden"
        whileInView="show"
        viewport={{ once, amount, margin: VIEWPORT.margin }}
        className={cn("overflow-hidden", className)}
        style={style}
        {...wrapRest}
      >
        <motion.div variants={v} transition={{ delay }} className="will-change-transform">{children as React.ReactNode}</motion.div>
      </Comp>
    );
  }
  return (
    <Comp
      variants={v}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin: VIEWPORT.margin }}
      transition={{ delay }}
      {...rest}
    />
  );
}

/** Contenedor que escalona a sus hijos `motion.*` con `variants` (p. ej. `fadeUp`). */
export function Stagger({ gap = 0.08, delay = 0.05, once = true, amount = 0.2, ...rest }: HTMLMotionProps<"div"> & { gap?: number; delay?: number; once?: boolean; amount?: number }) {
  return (
    <motion.div
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      {...rest}
    />
  );
}
