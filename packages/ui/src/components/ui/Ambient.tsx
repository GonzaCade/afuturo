import { cn } from "../../lib/cn";

export interface OrbProps {
  className?: string;
  /** Color: primario (cian→azul) o ember. */
  tone?: "primary" | "ember" | "blue";
  size?: number | string;
  /** Intensidad 0–1. */
  intensity?: number;
  /** Animación flotante. */
  float?: boolean;
}

const TONE = {
  primary: "radial-gradient(circle, rgb(57 186 208 / VAR) 0%, rgb(0 84 162 / calc(VAR * 0.6)) 40%, transparent 70%)",
  blue: "radial-gradient(circle, rgb(0 84 162 / VAR) 0%, transparent 70%)",
  ember: "radial-gradient(circle, rgb(255 107 74 / VAR) 0%, transparent 70%)",
};

/**
 * Esfera de luz difusa para fondos (colocar dentro de un contenedor `relative overflow-hidden`).
 * Ej: <Orb className="-top-40 left-1/2 -translate-x-1/2" size={900} />
 */
export function Orb({ className, tone = "primary", size = 700, intensity = 0.45, float = true }: OrbProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full blur-3xl will-change-transform", float && "animate-float-slow", className)}
      style={{ width: size, height: size, background: TONE[tone].replaceAll("VAR", String(intensity)) }}
    />
  );
}

/** Fondo completo de sección: grid + viñeta + orbs. Poner como primer hijo de una sección `relative`. */
export function AmbientBackground({ grid = true, orbs = true, className }: { grid?: boolean; orbs?: boolean; className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-vignette" />
      {grid && <div className="absolute inset-0 bg-grid" />}
      {orbs && (
        <>
          <Orb className="-top-64 left-1/2 -translate-x-1/2" size={1100} intensity={0.35} />
          <Orb className="-bottom-40 -right-40" size={700} tone="blue" intensity={0.5} />
        </>
      )}
    </div>
  );
}

/** Línea divisoria con degradé al centro. */
export function Divider({ className }: { className?: string }) {
  return <div aria-hidden className={cn("h-px w-full bg-gradient-to-r from-transparent via-line-strong to-transparent", className)} />;
}
