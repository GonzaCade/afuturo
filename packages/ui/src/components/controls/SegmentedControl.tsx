import { useId, type ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/cn";
import { ICON_CLASS } from "../../lib/icon";
import { SPRING } from "../../animations/easings";

export interface SegmentOption<T extends string = string> { value: T; label: ReactNode; icon?: ReactNode; disabled?: boolean }

export interface SegmentedControlProps<T extends string = string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (v: T) => void;
  size?: "sm" | "md";
  /** Ocupa todo el ancho. */
  block?: boolean;
  className?: string;
  /** Nombre accesible del grupo. */
  label?: string;
}

/** Control segmentado con indicador deslizante (radio 14 px, pista 10 px). */
export function SegmentedControl<T extends string = string>({ options, value, onChange, size = "md", block, className, label }: SegmentedControlProps<T>) {
  const id = useId();
  return (
    <div role="radiogroup" aria-label={label} className={cn("af-inset inline-flex gap-1 rounded-md p-1", block && "flex w-full", className)}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            role="radio"
            aria-checked={active}
            disabled={o.disabled}
            onClick={() => onChange(o.value)}
            className={cn(
              "af-focus relative flex items-center justify-center gap-1.5 whitespace-nowrap rounded-sm font-medium transition-colors duration-200 disabled:opacity-40",
              size === "sm" ? "h-8 px-3 text-[13px]" : "h-9 px-4 text-sm",
              block && "flex-1",
              active ? "text-ink" : "text-ink-2 hover:text-ink",
              ICON_CLASS,
            )}
          >
            {active && (
              <motion.span
                layoutId={`seg-${id}`}
                aria-hidden
                className="absolute inset-0 rounded-sm bg-surface shadow-float-xs ring-1 ring-line"
                transition={SPRING.snappy}
              />
            )}
            <span className="relative flex items-center gap-1.5">{o.icon}{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}
