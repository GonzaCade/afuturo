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
  effect?: "up" | "blur";
  /** Pinta todo con el acento. */
  accent?: boolean;
  /** Subcadena de `children` a pintar con el acento (respeta puntuación pegada). */
  highlight?: string;
}

const EFFECTS = {
  up: { hidden: { opacity: 0, y: "0.5em" }, show: { opacity: 1, y: 0 } },
  blur: { hidden: { opacity: 0, filter: "blur(8px)", y: "0.15em" }, show: { opacity: 1, filter: "blur(0px)", y: 0 } },
};

/** Divide `text` en unidades con su posición absoluta para poder cruzarlas con el rango del highlight. */
function split(text: string, by: "word" | "char" | "line") {
  if (by === "char") return Array.from(text).map((u, i) => ({ u, start: i }));
  const sep = by === "line" ? "\n" : " ";
  const out: { u: string; start: number }[] = [];
  let pos = 0;
  for (const u of text.split(sep)) { out.push({ u, start: pos }); pos += u.length + 1; }
  return out;
}

/** Parte una unidad en [antes, acento, después] según el rango global del highlight. */
function paint(u: string, start: number, hs: number, he: number) {
  const end = start + u.length;
  if (hs < 0 || he <= start || hs >= end) return <>{u}</>;
  const a = Math.max(hs, start) - start, b = Math.min(he, end) - start;
  return (
    <>
      {u.slice(0, a)}
      <span className="text-accent">{u.slice(a, b)}</span>
      {u.slice(b)}
    </>
  );
}

/**
 * Título que aparece palabra por palabra (o letra por letra).
 * Ejemplo: <TextReveal as="h1" className="text-display-xl" highlight="solo">Software que trabaja solo.</TextReveal>
 */
export function TextReveal({ children, by = "word", className, stagger, delay = 0, once = true, as = "h2", effect = "up", accent, highlight }: TextRevealProps) {
  const Tag = motion[as];
  const units = split(children, by);
  const gap = stagger ?? (by === "char" ? 0.015 : by === "line" ? 0.12 : 0.045);
  const v = EFFECTS[effect];
  const hs = highlight ? children.indexOf(highlight) : -1;
  const he = hs >= 0 ? hs + (highlight as string).length : -1;

  return (
    <Tag
      className={cn("inline-block", accent && "text-accent", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.5 }}
      transition={{ staggerChildren: gap, delayChildren: delay }}
      aria-label={children}
    >
      {units.map(({ u, start }, i) => (
        <span key={i}>
          <span className={cn("inline-block overflow-hidden align-bottom", by === "line" && "block")} style={{ paddingBottom: "0.08em", marginBottom: "-0.08em" }}>
            <motion.span className="inline-block will-change-transform" variants={v} transition={{ duration: 0.7, ease: EASE.outExpo }}>
              {u === " " ? " " : paint(u, start, hs, he)}
            </motion.span>
          </span>
          {by === "word" && i < units.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
