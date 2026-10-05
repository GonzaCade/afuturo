import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { useTransform, useMotionValueEvent, type MotionValue } from "motion/react";
import { useSectionProgress } from "./Parallax";
import { cn } from "../lib/cn";

export interface PinnedStep {
  title: string;
  body?: string;
  /** Lo que se muestra en el panel fijo mientras este paso está activo. */
  visual?: ReactNode;
}

export interface PinnedSequenceProps {
  steps: PinnedStep[];
  /** Altura por paso, en vh. Más alto = más lento. */
  stepHeight?: number;
  className?: string;
  /** Contenido fijo detrás (p. ej. un <IPhone17ProMax />) que recibe el progreso 0–1. */
  render?: (progress: MotionValue<number>, activeIndex: MotionValue<number>) => ReactNode;
  /** Lado del texto. */
  side?: "left" | "right";
}

/**
 * Sección "pinned" estilo Apple: el visual queda fijo mientras el texto de cada paso
 * entra y sale con el scroll. Implementado con `position: sticky` + Motion (sin GSAP).
 */
export function PinnedSequence({ steps, stepHeight = 90, className, render, side = "left" }: PinnedSequenceProps) {
  const { ref, progress } = useSectionProgress();
  const active = useTransform(progress, (p) => Math.min(steps.length - 1, Math.floor(p * steps.length)));

  return (
    <section ref={ref} className={cn("relative", className)} style={{ height: `${steps.length * stepHeight + 100}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className={cn("mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2", side === "right" && "lg:[&>*:first-child]:order-2")}>
          {/* Texto */}
          <div className="relative min-h-[40vh]">
            {steps.map((s, i) => (
              <Step key={i} index={i} total={steps.length} progress={progress} title={s.title} body={s.body} />
            ))}
          </div>
          {/* Visual fijo */}
          <div className="relative flex min-h-[60vh] items-center justify-center">
            {render ? render(progress, active) : steps.map((s, i) => (
              <StepVisual key={i} index={i} total={steps.length} progress={progress}>{s.visual}</StepVisual>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Interpolación lineal por tramos (clamp en los extremos). */
function piecewise(p: number, xs: number[], ys: number[]) {
  if (p <= xs[0]) return ys[0];
  for (let i = 1; i < xs.length; i++) {
    if (p <= xs[i]) { const t = (p - xs[i - 1]) / (xs[i] - xs[i - 1] || 1); return ys[i - 1] + (ys[i] - ys[i - 1]) * t; }
  }
  return ys[ys.length - 1];
}

/**
 * Visibilidad 0–1 de un paso según el progreso. Se aplica imperativamente al elemento
 * (opacity + blur + translate) para evitar re-renders y garantizar que el estilo se escriba.
 */
function useStepVisibility(progress: MotionValue<number>, index: number, total: number, pad: number, ref: RefObject<HTMLDivElement | null>, translate: number, scale = false) {
  const start = index / total, end = (index + 1) / total;
  const xs = [start, start + pad, end - pad, end];
  const ys = index === 0 ? [1, 1, 1, 0] : index === total - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0];
  const dir = (p: number) => (p < (start + end) / 2 ? 1 : -1); // entra desde abajo, sale hacia arriba
  const apply = (p: number) => {
    const el = ref.current; if (!el) return;
    const o = piecewise(p, xs, ys);
    el.style.opacity = String(o);
    el.style.filter = `blur(${(1 - o) * 6}px)`;
    el.style.transform = scale ? `scale(${0.94 + o * 0.06})` : `translateY(calc(-50% + ${(1 - o) * translate * dir(p)}px))`;
    el.style.pointerEvents = o > 0.5 ? "auto" : "none";
  };
  useMotionValueEvent(progress, "change", apply);
  useEffect(() => { apply(progress.get()); }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

function Step({ index, total, progress, title, body }: { index: number; total: number; progress: MotionValue<number>; title: string; body?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useStepVisibility(progress, index, total, 0.35 / total, ref, 30);
  return (
    <div ref={ref} className="absolute inset-x-0 top-1/2 will-change-[opacity,transform,filter]" style={{ transform: "translateY(-50%)" }}>
      <span className="mb-4 block font-mono text-label uppercase tracking-[0.12em] text-accent">0{index + 1} / 0{total}</span>
      <h3 className="text-display-md font-medium">{title}</h3>
      {body && <p className="mt-5 max-w-md text-lg text-ink-2">{body}</p>}
    </div>
  );
}

function StepVisual({ index, total, progress, children }: { index: number; total: number; progress: MotionValue<number>; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useStepVisibility(progress, index, total, 0.3 / total, ref, 0, true);
  return <div ref={ref} className="absolute inset-0 flex items-center justify-center will-change-[opacity,transform,filter]">{children}</div>;
}
