import { useId, type ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/cn";
import { SPRING } from "../../animations/easings";

export interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
  size?: "sm" | "md";
  className?: string;
}

/** Switch físico: pista 10 px de radio, perilla con sombra; acento solo cuando está activo. */
export function Toggle({ checked, onChange, label, description, disabled, size = "md", className }: ToggleProps) {
  const id = useId();
  const dims = size === "sm" ? { w: 36, h: 22, k: 16 } : { w: 44, h: 26, k: 20 };
  const pad = (dims.h - dims.k) / 2;
  const control = (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "af-focus relative shrink-0 rounded-full transition-colors duration-200 disabled:opacity-40",
        checked ? "bg-accent" : "af-inset",
      )}
      style={{ width: dims.w, height: dims.h }}
    >
      <motion.span
        aria-hidden
        className="absolute top-0 block rounded-full bg-white shadow-[0_1px_3px_rgb(21_23_26_/_0.25),inset_0_1px_0_#fff]"
        style={{ width: dims.k, height: dims.k, marginTop: pad }}
        animate={{ x: checked ? dims.w - dims.k - pad : pad }}
        transition={SPRING.snappy}
      />
    </button>
  );
  if (!label) return <span className={className}>{control}</span>;
  return (
    <label htmlFor={id} className={cn("flex min-h-10 cursor-pointer items-center justify-between gap-4", disabled && "cursor-not-allowed", className)}>
      <span className="flex flex-col">
        <span className="text-sm font-medium text-ink">{label}</span>
        {description && <span className="text-[13px] text-ink-2">{description}</span>}
      </span>
      {control}
    </label>
  );
}
