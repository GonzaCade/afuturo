import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "motion/react";
import { cn } from "../lib/cn";

export interface ParallaxProps {
  children: ReactNode;
  /** Intensidad. Positivo = se mueve más lento que el scroll (queda "atrás"). Ej: 0.2 → 20% del recorrido. */
  speed?: number;
  /** Eje. */
  axis?: "y" | "x";
  className?: string;
  /** Escala extra al pasar (efecto Rockstar: capas que crecen). */
  scale?: [number, number];
  /** Opacidad extra. */
  opacity?: [number, number];
}

/**
 * Parallax por scroll basado en el propio elemento. Combinar varias capas con distintos
 * `speed` reproduce el efecto de "shards" del sitio de GTA VI.
 */
export function Parallax({ children, speed = 0.2, axis = "y", className, scale, opacity }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const range = 300 * speed;
  const raw = useTransform(scrollYProgress, [0, 1], [range, -range]);
  const smooth = useSpring(raw, { stiffness: 80, damping: 25, mass: 0.6 });
  const s = useTransform(scrollYProgress, [0, 1], scale ?? [1, 1]);
  const o = useTransform(scrollYProgress, [0, 0.5, 1], opacity ? [opacity[0], 1, opacity[1]] : [1, 1, 1]);

  const style: Record<string, MotionValue<number>> = { scale: s, opacity: o };
  style[axis] = smooth;

  return (
    <motion.div ref={ref} className={cn("will-change-transform", className)} style={style}>
      {children}
    </motion.div>
  );
}

/**
 * Progreso de scroll de una sección larga para animar lo que quieras
 * (usar dentro de una sección con altura ≥ 200vh y un hijo `sticky`).
 */
export function useSectionProgress(offset: [string, string] = ["start start", "end end"]) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: offset as never });
  return { ref, progress: scrollYProgress };
}
