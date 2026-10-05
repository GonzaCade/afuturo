import { useId, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface SliderProps {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: ReactNode;
  /** Unidad mostrada junto al valor. */
  unit?: string;
  /** Formatear el valor visible. */
  format?: (v: number) => string;
  disabled?: boolean;
  className?: string;
}

/** Slider: pista neutra, relleno de acento, perilla blanca con sombra. Target 40 px. */
export function Slider({ value, onChange, min = 0, max = 100, step = 1, label, unit, format, disabled, className }: SliderProps) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;
  const shown = format ? format(value) : `${value}${unit ?? ""}`;
  return (
    <div className={cn("flex flex-col gap-1", disabled && "opacity-40", className)}>
      {(label || unit || format) && (
        <div className="flex items-baseline justify-between">
          {label && <label htmlFor={id} className="text-sm font-medium text-ink">{label}</label>}
          <output htmlFor={id} className="font-mono text-[13px] tabular-nums text-ink-2">{shown}</output>
        </div>
      )}
      <div className="relative flex h-10 items-center">
        <div aria-hidden className="af-inset absolute inset-x-0 h-1 rounded-full">
          <div className="h-full rounded-full bg-accent transition-[width] duration-100" style={{ width: `${pct}%` }} />
        </div>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
          className="af-range relative"
          aria-valuetext={shown}
        />
      </div>
    </div>
  );
}
