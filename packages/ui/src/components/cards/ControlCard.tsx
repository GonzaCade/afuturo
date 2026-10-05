import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { ICON_CLASS } from "../../lib/icon";
import { Surface } from "../ui/Surface";
import { Label } from "../ui/Typography";

export interface ControlCardProps {
  title: ReactNode;
  icon?: ReactNode;
  /** Valor grande a la derecha del título. */
  value?: ReactNode;
  /** Acción arriba a la derecha (IconButton, Toggle). */
  action?: ReactNode;
  /** Controles (Slider, SegmentedControl, Toggle…). */
  children: ReactNode;
  className?: string;
  padding?: "sm" | "md";
}

/** Tarjeta de control: título + valor + un grupo de controles. */
export function ControlCard({ title, icon, value, action, children, className, padding = "md" }: ControlCardProps) {
  return (
    <Surface radius="xl" padding={padding} className={cn("flex flex-col gap-5", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {icon && <span className={cn("inline-flex size-9 items-center justify-center rounded-sm bg-surface-3 text-ink-2", ICON_CLASS)}>{icon}</span>}
          <div className="flex flex-col">
            <Label>{title}</Label>
            {value && <span className="mt-1 font-display text-2xl font-medium tabular-nums tracking-[-0.03em] text-ink">{value}</span>}
          </div>
        </div>
        {action}
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </Surface>
  );
}
