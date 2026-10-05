import type { ReactNode } from "react";
import type React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "../../lib/cn";
import { EASE, DURATION } from "../../animations/easings";

export type SurfaceVariant = "elevated" | "secondary" | "glass" | "outline" | "ink" | "accent" | "float";
export type SurfaceRadius = "sm" | "md" | "lg" | "xl" | "2xl";
export type SurfacePadding = "none" | "xs" | "sm" | "md" | "lg";

const VARIANT: Record<SurfaceVariant, string> = {
  elevated: "af-surface text-ink",
  float: "af-surface-float text-ink",
  secondary: "af-surface-2 text-ink",
  glass: "af-glass text-ink",
  outline: "border border-line bg-transparent text-ink",
  ink: "bg-ink text-white shadow-float",
  accent: "bg-accent text-white shadow-accent",
};
const RADIUS: Record<SurfaceRadius, string> = { sm: "rounded-sm", md: "rounded-md", lg: "rounded-lg", xl: "rounded-xl", "2xl": "rounded-2xl" };
const PADDING: Record<SurfacePadding, string> = { none: "", xs: "p-3", sm: "p-5", md: "p-6", lg: "p-7 md:p-8" };

export interface SurfaceProps extends Omit<HTMLMotionProps<"div">, "children"> {
  variant?: SurfaceVariant;
  radius?: SurfaceRadius;
  padding?: SurfacePadding;
  /** Sube 2–3 px al hover (objetos interactivos). */
  hover?: boolean;
  /** Estado seleccionado: borde apenas más fuerte + indicador de acento + más elevación. */
  selected?: boolean;
  /** Renderiza como botón accesible. */
  interactive?: boolean;
  children?: ReactNode;
}

/**
 * Superficie base: un objeto físico apoyado 2–5 mm sobre el fondo.
 * Toda card, panel o control contenedor se construye con esto.
 */
export function Surface({ variant = "elevated", radius = "xl", padding = "md", hover, selected, interactive, className, children, onClick, ...rest }: SurfaceProps) {
  // div con role="button" (no <button>) para poder anidar controles reales adentro.
  const a11y = interactive
    ? {
        role: "button",
        tabIndex: 0,
        onClick,
        onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.target !== e.currentTarget) return;
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); (onClick as unknown as (() => void) | undefined)?.(); }
        },
      }
    : { onClick };
  return (
    <motion.div
      {...a11y}
      className={cn(
        "relative transition-[box-shadow,border-color,background-color] duration-200",
        VARIANT[variant],
        RADIUS[radius],
        PADDING[padding],
        interactive && "af-focus cursor-pointer select-none",
        selected && "border-line-strong shadow-float",
        className,
      )}
      whileHover={hover || interactive ? { y: -2 } : undefined}
      whileTap={interactive ? { scale: 0.985 } : undefined}
      transition={{ duration: DURATION.base, ease: EASE.outQuart }}
      aria-pressed={interactive ? selected : undefined}
      {...(rest as object)}
    >
      {selected && <span aria-hidden className="absolute right-4 top-4 size-1.5 rounded-full bg-accent animate-pulse-dot" />}
      {children}
    </motion.div>
  );
}

/** Panel translúcido con blur: barras flotantes, overlays sobre imagen. */
export function GlassPanel({ className, ...rest }: Omit<SurfaceProps, "variant">) {
  return <Surface variant="glass" className={className} {...rest} />;
}

export interface HeroSurfaceProps extends Omit<SurfaceProps, "radius" | "padding"> {
  /** Imagen/visual de fondo a sangre (se recorta al radio). */
  media?: ReactNode;
  /** Altura mínima. */
  minHeight?: string | number;
  /** Alinear el contenido. */
  align?: "start" | "center" | "end";
}

/** Superficie hero (radio 32 px): un visual dominante + contenido que orbita. */
export function HeroSurface({ media, minHeight = "min(72vh, 720px)", align = "end", className, children, ...rest }: HeroSurfaceProps) {
  const ALIGN = { start: "justify-start", center: "justify-center", end: "justify-end" };
  return (
    <Surface variant="float" radius="2xl" padding="none" className={cn("af-studio-inner isolate flex flex-col overflow-hidden", ALIGN[align], className)} style={{ minHeight }} {...rest}>
      {media && <div aria-hidden className="absolute inset-0 -z-10 [&>img]:h-full [&>img]:w-full [&>img]:object-cover">{media}</div>}
      <div className="relative p-6 md:p-8 lg:p-10">{children}</div>
    </Surface>
  );
}

export interface ProductStageProps {
  children: ReactNode;
  className?: string;
  /** Ratio del escenario. */
  aspect?: string;
  /** Sombra de piso debajo del objeto. */
  floor?: boolean;
  /** Etiqueta pequeña arriba a la izquierda. */
  label?: ReactNode;
  /** Controles flotantes abajo. */
  controls?: ReactNode;
}

/** Escenario de producto: fondo de estudio con luz cenital y un objeto centrado. */
export function ProductStage({ children, className, aspect = "4 / 3", floor = true, label, controls }: ProductStageProps) {
  return (
    <div className={cn("af-surface-2 af-studio-inner relative isolate flex items-center justify-center overflow-hidden rounded-2xl", className)} style={{ aspectRatio: aspect }}>
      <div aria-hidden className="absolute inset-0 -z-10 bg-dots opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000,transparent_80%)]" />
      {label && <div className="absolute left-5 top-5">{label}</div>}
      <div className="relative flex items-center justify-center">
        {floor && <div aria-hidden className="absolute inset-x-[12%] bottom-[-6%] h-[22%] rounded-[50%] bg-ink/15 blur-2xl" />}
        <div className="relative">{children}</div>
      </div>
      {controls && <div className="absolute inset-x-0 bottom-5 flex justify-center">{controls}</div>}
    </div>
  );
}
