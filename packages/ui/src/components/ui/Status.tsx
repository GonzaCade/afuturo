import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { ICON_CLASS } from "../../lib/icon";

export type StatusState = "live" | "idle" | "off" | "busy";

const DOT: Record<StatusState, string> = {
  live: "bg-accent animate-pulse-dot",
  busy: "bg-accent",
  idle: "bg-ink-3",
  off: "bg-ink-4",
};
const TEXT: Record<StatusState, string> = { live: "En vivo", busy: "Activo", idle: "En espera", off: "Apagado" };

/** Punto de estado. Nunca comunica solo por color: `label` agrega texto (visible u oculto). */
export function StatusDot({ state = "live", label, showLabel, className }: { state?: StatusState; label?: string; showLabel?: boolean; className?: string }) {
  const text = label ?? TEXT[state];
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span aria-hidden className={cn("size-1.5 shrink-0 rounded-full", DOT[state])} />
      <span className={cn("text-[13px] font-medium", state === "off" ? "text-ink-3" : "text-ink-2", !showLabel && "sr-only")}>{text}</span>
    </span>
  );
}

export interface StatusPillProps extends HTMLAttributes<HTMLSpanElement> {
  state?: StatusState;
  icon?: ReactNode;
  variant?: "surface" | "glass" | "ink" | "accent" | "ghost";
  size?: "sm" | "md";
  children: ReactNode;
}

const V = {
  surface: "af-surface text-ink",
  glass: "af-glass text-ink",
  ink: "bg-ink text-white",
  accent: "bg-accent-50 text-accent border border-accent-100",
  ghost: "bg-transparent text-ink-2",
};

/** Pill de estado: punto + ícono + texto. Pensada para flotar sobre imágenes y superficies. */
export function StatusPill({ state, icon, variant = "surface", size = "md", className, children, ...rest }: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium tabular-nums whitespace-nowrap",
        size === "sm" ? "h-7 gap-1.5 px-2.5 text-[12px]" : "h-9 gap-2 px-3.5 text-[13px]",
        "[&_svg]:size-[16px] [&_svg]:shrink-0 [&_svg]:stroke-[1.6]",
        V[variant],
        className,
      )}
      {...rest}
    >
      {state && <span aria-hidden className={cn("size-1.5 rounded-full", DOT[state], variant === "ink" && state === "idle" && "bg-white/50")} />}
      {state && <span className="sr-only">{TEXT[state]}: </span>}
      {icon}
      {children}
    </span>
  );
}

/** Badge chico para tags (compat con bloques). */
export function Badge({ className, variant = "accent", children, ...rest }: HTMLAttributes<HTMLSpanElement> & { variant?: "accent" | "neutral" | "ink" | "outline" }) {
  const B = {
    accent: "bg-accent-50 text-accent",
    neutral: "bg-surface-3 text-ink-2",
    ink: "bg-ink text-white",
    outline: "border border-line-strong text-ink-2",
  };
  return (
    <span className={cn("inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-[11px] font-medium uppercase tracking-[0.08em]", ICON_CLASS, B[variant], className)} {...rest}>
      {children}
    </span>
  );
}
