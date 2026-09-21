import type { HTMLAttributes, ReactNode } from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "../../lib/cn";
import { Spotlight } from "../../animations/Spotlight";
import { EASE } from "../../animations/easings";

export type CardVariant = "surface" | "glass" | "gradient-border" | "light" | "gradient";

const V: Record<CardVariant, string> = {
  surface: "bg-surface-2 border border-line shadow-card",
  glass: "glass shadow-card",
  "gradient-border": "bg-surface-2 border-gradient shadow-card",
  light: "bg-light-1 text-ink border border-line-light shadow-card-light",
  gradient: "af-gradient text-white shadow-glow",
};

export interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  variant?: CardVariant;
  /** Padding. */
  padding?: "none" | "sm" | "md" | "lg";
  /** Halo que sigue al cursor. */
  spotlight?: boolean;
  /** Elevación al hover. */
  hover?: boolean;
  children?: ReactNode;
}

const P = { none: "", sm: "p-5", md: "p-7 md:p-8", lg: "p-8 md:p-12" };

/** Tarjeta base con radio grande. Todos los bloques (features, pricing, testimonials) la usan. */
export function Card({ variant = "surface", padding = "md", spotlight, hover = true, className, children, ...rest }: CardProps) {
  const inner = (
    <motion.div
      className={cn("relative overflow-hidden rounded-2xl md:rounded-3xl", V[variant], P[padding], className)}
      whileHover={hover ? { y: -6 } : undefined}
      transition={{ duration: 0.45, ease: EASE.outQuart }}
      {...rest}
    >
      {children}
    </motion.div>
  );
  return spotlight ? <Spotlight className="rounded-2xl md:rounded-3xl">{inner}</Spotlight> : inner;
}

/** Ícono dentro de un cuadrado con gradiente suave. */
export function CardIcon({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-6 inline-flex size-12 items-center justify-center rounded-xl border border-primary-400/25 bg-primary-400/10 text-primary-300 [&>svg]:size-5", className)} {...rest}>
      {children}
    </div>
  );
}
