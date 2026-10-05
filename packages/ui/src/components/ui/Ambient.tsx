import { cn } from "../../lib/cn";

/** Luz difusa de estudio para fondos (dentro de un contenedor `relative overflow-hidden`). */
export function StudioLight({ className, tone = "white", size = 700, intensity = 0.8 }: { className?: string; tone?: "white" | "accent" | "shade"; size?: number | string; intensity?: number }) {
  const T = {
    white: `radial-gradient(circle, rgb(255 255 255 / ${intensity}) 0%, transparent 70%)`,
    accent: `radial-gradient(circle, rgb(23 107 255 / ${intensity * 0.12}) 0%, transparent 70%)`,
    shade: `radial-gradient(circle, rgb(21 23 26 / ${intensity * 0.08}) 0%, transparent 70%)`,
  };
  return <div aria-hidden className={cn("pointer-events-none absolute rounded-full blur-3xl", className)} style={{ width: size, height: size, background: T[tone] }} />;
}

/** Fondo de sección: estudio + grid sutil opcional. Primer hijo de una sección `relative`. */
export function StudioBackground({ grid = false, className }: { grid?: boolean; className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute inset-0 af-studio" />
      {grid && <div className="absolute inset-0 bg-grid" />}
    </div>
  );
}

/** Línea divisoria. */
export function Divider({ className, vertical }: { className?: string; vertical?: boolean }) {
  return <div aria-hidden className={cn(vertical ? "w-px self-stretch bg-line" : "h-px w-full bg-line", className)} />;
}
