import { motion } from "motion/react";
import { cn } from "../lib/cn";
import { EASE } from "./easings";

export interface TextRevealProps {
  children: string;
  /** Granularidad del stagger. */
  by?: "word" | "char" | "line";
  className?: string;
  /** Segundos entre unidades. */
  stagger?: number;
  delay?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  /** Efecto de entrada. */
  effect?: "up" | "blur" | "flip";
  /** Pinta cada palabra con el gradiente de marca (va en el span interno: background-clip:text no atraviesa hijos con transform). */
  gradient?: boolean;
}

const EFFECTS = {
  up: { hidden: { opacity: 0, y: "0.7em" }, show: { opacity: 1, y: 0 } },
  blur: { hidden: { opacity: 0, filter: "blur(12px)", y: "0.2em" }, show: { opacity: 1, filter: "blur(0px)", y: 0 } },
  flip: { hidden: { opacity: 0, rotateX: -80, y: "0.4em" }, show: { opacity: 1, rotateX: 0, y: 0 } },
};

/**
 * Título que aparece palabra por palabra (o letra por letra), estilo Apple.
 * Ejemplo: <TextReveal as="h1" className="text-display-xl">Software que se adelanta</TextReveal>
 */
export function TextReveal({ children, by = "word", className, stagger, delay = 0, once = true, as = "h2", effect = "up", gradient }: TextRevealProps) {
  const Tag = motion[as];
  const units = by === "char" ? Array.from(children) : by === "line" ? children.split("\n") : children.split(" ");
  const gap = stagger ?? (by === "char" ? 0.02 : by === "line" ? 0.15 : 0.06);
  const v = EFFECTS[effect];

  return (
    <Tag
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.5 }}
      transition={{ staggerChildren: gap, delayChildren: delay }}
      aria-label={children}
      style={{ perspective: 600 }}
    >
      {units.map((u, i) => (
        <span key={i} className={cn("inline-block overflow-hidden align-bottom", by === "line" && "block")} style={{ paddingBottom: "0.08em", marginBottom: "-0.08em" }}>
          <motion.span
            className={cn("inline-block will-change-transform", gradient && "text-gradient")}
            variants={v}
            transition={{ duration: 0.8, ease: EASE.outExpo }}
            style={{ transformOrigin: "bottom center" }}
          >
            {u === " " ? " " : u}
            {by === "word" && i < units.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
