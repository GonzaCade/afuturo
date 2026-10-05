import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { ICON_CLASS } from "../../lib/icon";
import { Surface, type SurfaceProps } from "./Surface";

export type CardVariant = "elevated" | "secondary" | "glass" | "outline" | "ink" | "accent";

export interface CardProps extends Omit<SurfaceProps, "variant"> {
  variant?: CardVariant;
}

/** Tarjeta estándar (radio 24 px, padding 24). Alias semántico de <Surface>. */
export function Card({ variant = "elevated", hover = false, ...rest }: CardProps) {
  return <Surface variant={variant} hover={hover} {...rest} />;
}

/** Ícono dentro de un cuadrado suave de 40 px. */
export function CardIcon({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-5 inline-flex size-10 items-center justify-center rounded-md bg-surface-3 text-ink", ICON_CLASS, className)} {...rest}>
      {children}
    </div>
  );
}
