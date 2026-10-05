import { useId } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/cn";
import { EASE } from "../../animations/easings";

function scale(data: number[], w: number, h: number, pad = 2) {
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const step = data.length > 1 ? w / (data.length - 1) : 0;
  return data.map((v, i) => [i * step, pad + (h - pad * 2) * (1 - (v - min) / range)] as const);
}

function smoothPath(pts: readonly (readonly [number, number])[]) {
  if (pts.length < 2) return "";
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
    const cx = (x0 + x1) / 2;
    d += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  return d;
}

export interface MiniChartProps {
  data: number[];
  type?: "line" | "area" | "bars";
  height?: number;
  /** Trazo neutro (ink-3) en vez de acento. */
  neutral?: boolean;
  /** Marca el último punto. */
  endDot?: boolean;
  className?: string;
}

/** Sparkline minimalista: una serie, sin ejes ni grilla. */
export function MiniChart({ data, type = "line", height = 40, neutral, endDot = true, className }: MiniChartProps) {
  const id = useId();
  const w = 160, h = height;
  const color = neutral ? "var(--color-ink-3)" : "var(--color-accent)";
  const pts = scale(data, w, h, 3);
  const path = smoothPath(pts);
  const last = pts[pts.length - 1];

  if (type === "bars") {
    const max = Math.max(...data) || 1;
    const bw = w / data.length;
    return (
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={cn("block w-full", className)} style={{ height }} aria-hidden>
        {data.map((v, i) => {
          const bh = (v / max) * (h - 2);
          const lastBar = i === data.length - 1;
          return <motion.rect key={i} x={i * bw + bw * 0.2} width={bw * 0.6} rx={bw * 0.3} initial={{ y: h, height: 0 }} whileInView={{ y: h - bh, height: bh }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.03, ease: EASE.outExpo }} fill={lastBar && !neutral ? "var(--color-accent)" : "var(--color-ink-4)"} />;
        })}
      </svg>
    );
  }

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={cn("block w-full overflow-visible", className)} style={{ height }} aria-hidden>
      {type === "area" && (
        <>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.18} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <motion.path d={`${path} L${w},${h} L0,${h} Z`} fill={`url(#${id})`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} />
        </>
      )}
      <motion.path d={path} fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: EASE.outExpo }} />
      {endDot && last && (
        <motion.circle cx={last[0]} cy={last[1]} r={3} fill={color} stroke="#fff" strokeWidth={1.5} vectorEffect="non-scaling-stroke" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1, duration: 0.3 }} style={{ transformOrigin: `${last[0]}px ${last[1]}px` }} />
      )}
    </svg>
  );
}

export interface StatusGraphProps {
  data: number[];
  /** Etiquetas del eje X (misma longitud que data, o menos: se distribuyen). */
  labels?: string[];
  height?: number;
  /** Índice resaltado (default: último). */
  highlight?: number;
  /** Formato del valor del tooltip/etiqueta. */
  format?: (v: number) => string;
  type?: "bars" | "line";
  className?: string;
}

/** Gráfico de estado: líneas finas, una serie de acento, etiquetas chicas, mucho aire. */
export function StatusGraph({ data, labels, height = 160, highlight, format = (v) => String(v), type = "bars", className }: StatusGraphProps) {
  const hi = highlight ?? data.length - 1;
  const max = Math.max(...data) || 1;
  const w = 600, h = height;
  const pts = scale(data, w, h, 10);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="relative" style={{ height }}>
        {/* dos líneas guía apenas visibles */}
        <div aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-line" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-line-strong" />
        {type === "bars" ? (
          <div className="absolute inset-0 flex items-end gap-[6px]">
            {data.map((v, i) => {
              const active = i === hi;
              return (
                <div key={i} className="group relative flex h-full flex-1 items-end justify-center">
                  <motion.div
                    className={cn("w-full max-w-[14px] rounded-full", active ? "bg-accent" : "bg-ink-4 group-hover:bg-ink-3")}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${(v / max) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.03, ease: EASE.outExpo }}
                  />
                  {active && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-ink px-2 py-1 font-mono text-[11px] tabular-nums text-white">{format(v)}</span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
            <motion.path d={smoothPath(pts)} fill="none" stroke="var(--color-accent)" strokeWidth={1.6} vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: EASE.outExpo }} />
            {pts[hi] && <circle cx={pts[hi][0]} cy={pts[hi][1]} r={4} fill="var(--color-accent)" stroke="#fff" strokeWidth={2} vectorEffect="non-scaling-stroke" />}
          </svg>
        )}
      </div>
      {labels && (
        <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">
          {labels.map((l, i) => <span key={i}>{l}</span>)}
        </div>
      )}
    </div>
  );
}
