import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "ember" | "outline" | "glass";
  /** Punto pulsante a la izquierda (estado "en vivo"). */
  dot?: boolean;
  icon?: ReactNode;
}

const V = {
  default: "bg-white/8 text-paper",
  primary: "bg-primary-400/15 text-primary-300 border border-primary-400/25",
  ember: "bg-ember-500/15 text-ember-400 border border-ember-500/25",
  outline: "border border-line-strong text-muted",
  glass: "glass text-paper",
};

/** Etiqueta pill pequeña (eyebrow sobre títulos, tags de features, estado). */
export function Badge({ variant = "primary", dot, icon, className, children, ...rest }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em]", V[variant], className)} {...rest}>
      {dot && (
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary-400 opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-primary-400" />
        </span>
      )}
      {icon}
      {children}
    </span>
  );
}
