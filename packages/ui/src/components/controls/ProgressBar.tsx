import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/cn";
import { EASE } from "../../animations/easings";

export interface ProgressBarProps {
  /** 0–100 */
  value: number;
  label?: ReactNode;
  /** Mostrar el valor a la derecha. */
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  /** Sobre fondo oscuro. */
  inverted?: boolean;
  className?: string;
  /** Animar desde 0 al entrar en viewport. */
  animate?: boolean;
}

const H = { sm: "h-1", md: "h-1.5", lg: "h-2.5" };

/** Barra de progreso: pista neutra, relleno de acento. */
export function ProgressBar({ value, label, showValue, size = "md", inverted, className, animate = true }: ProgressBarProps) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {(label || showValue) && (
        <div className="flex items-baseline justify-between text-[13px]">
          {label && <span className={cn("font-medium", inverted ? "text-white/80" : "text-ink-2")}>{label}</span>}
          {showValue && <span className={cn("font-mono tabular-nums", inverted ? "text-white" : "text-ink")}>{Math.round(v)}%</span>}
        </div>
      )}
      <div role="progressbar" aria-valuenow={Math.round(v)} aria-valuemin={0} aria-valuemax={100} className={cn("w-full overflow-hidden rounded-full", H[size], inverted ? "bg-white/15" : "af-inset")}>
        <motion.div
          className={cn("h-full rounded-full", inverted ? "bg-white" : "bg-accent")}
          initial={animate ? { width: 0 } : false}
          whileInView={{ width: `${v}%` }}
          animate={animate ? undefined : { width: `${v}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE.outExpo }}
        />
      </div>
    </div>
  );
}
