import type { ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "../../lib/cn";
import { CountUp } from "../../animations/CountUp";
import { Label } from "../ui/Typography";
import { Surface } from "../ui/Surface";

export interface MetricProps {
  label: ReactNode;
  value: number | string;
  unit?: string;
  prefix?: string;
  decimals?: number;
  /** Variación (p. ej. +12). Se muestra con flecha + texto, nunca solo color. */
  delta?: number;
  deltaLabel?: string;
  /** Valor "en vivo": se pinta con el acento. */
  live?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  /** Contenido extra abajo (sparkline, barra). */
  children?: ReactNode;
  icon?: ReactNode;
  className?: string;
  /** Sin superficie propia (dentro de otra card). */
  bare?: boolean;
  countUp?: boolean;
}

const SIZE = { sm: "text-xl", md: "text-3xl", lg: "text-display-sm", xl: "text-display-md" };

/** Métrica: el número es el ancla visual; label arriba, delta debajo. */
export function Metric({ label, value, unit, prefix, decimals, delta, deltaLabel, live, size = "md", children, icon, className, bare, countUp = true }: MetricProps) {
  const body = (
    <>
      <div className="flex items-center justify-between gap-3">
        <Label>{label}</Label>
        {icon && <span className="text-ink-3 [&_svg]:size-[16px] [&_svg]:stroke-[1.6]">{icon}</span>}
      </div>
      <div className={cn("mt-2 flex items-baseline gap-1 font-display font-medium tabular-nums tracking-[-0.03em]", SIZE[size], live ? "text-accent" : "text-ink")}>
        {typeof value === "number" && countUp ? <CountUp to={value} prefix={prefix} decimals={decimals} /> : <>{prefix}{value}</>}
        {unit && <span className="text-[0.45em] font-medium tracking-normal text-ink-3">{unit}</span>}
      </div>
      {delta !== undefined && (
        <div className="mt-1.5 flex items-center gap-1 text-[13px] text-ink-2">
          {delta >= 0 ? <ArrowUpRight size={14} strokeWidth={1.8} /> : <ArrowDownRight size={14} strokeWidth={1.8} />}
          <span className="font-medium tabular-nums text-ink">{delta > 0 ? "+" : ""}{delta}%</span>
          {deltaLabel && <span>{deltaLabel}</span>}
        </div>
      )}
      {children && <div className="mt-4">{children}</div>}
    </>
  );
  if (bare) return <div className={className}>{body}</div>;
  return <Surface padding="sm" radius="lg" className={cn("flex flex-col", className)}>{body}</Surface>;
}

export interface MetricGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

/** Grilla de métricas con gap 12. */
export function MetricGrid({ children, columns = 4, className }: MetricGridProps) {
  const C = { 2: "grid-cols-2", 3: "grid-cols-2 md:grid-cols-3", 4: "grid-cols-2 lg:grid-cols-4" };
  return <div className={cn("grid gap-3", C[columns], className)}>{children}</div>;
}
