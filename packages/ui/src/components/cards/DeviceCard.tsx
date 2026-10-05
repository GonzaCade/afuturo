import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { ICON_CLASS } from "../../lib/icon";
import { Surface } from "../ui/Surface";
import { StatusDot, type StatusState } from "../ui/Status";
import { Toggle } from "../controls/Toggle";

export interface DeviceCardProps {
  icon: ReactNode;
  name: string;
  /** Línea secundaria (ubicación, modelo). */
  meta?: string;
  state?: StatusState;
  /** Valor destacado (p. ej. "21°", "68%"). */
  value?: string;
  selected?: boolean;
  onSelect?: () => void;
  /** Toggle on/off embebido. */
  on?: boolean;
  onToggle?: (v: boolean) => void;
  className?: string;
}

/** Tarjeta de dispositivo: ícono, nombre, estado y un control. Selección = borde + punto de acento. */
export function DeviceCard({ icon, name, meta, state = "idle", value, selected, onSelect, on, onToggle, className }: DeviceCardProps) {
  return (
    <Surface radius="lg" padding="sm" interactive={!!onSelect} selected={selected} onClick={onSelect} className={cn("flex min-h-[132px] flex-col justify-between gap-4", className)}>
      <div className="flex items-start justify-between gap-3">
        <span className={cn("inline-flex size-10 items-center justify-center rounded-md", on || state === "live" ? "bg-accent-50 text-accent" : "bg-surface-3 text-ink-2", ICON_CLASS)}>{icon}</span>
        {onToggle !== undefined && <span onClick={(e) => e.stopPropagation()}><Toggle size="sm" checked={!!on} onChange={onToggle} /></span>}
      </div>
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-ink">{name}</div>
          <div className="mt-0.5 flex items-center gap-2 text-[13px] text-ink-2">
            <StatusDot state={state} showLabel />
            {meta && <span className="truncate text-ink-3">· {meta}</span>}
          </div>
        </div>
        {value && <span className="shrink-0 font-display text-xl font-medium tabular-nums tracking-[-0.02em] text-ink">{value}</span>}
      </div>
    </Surface>
  );
}
