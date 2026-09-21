import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export interface MarqueeProps {
  children: ReactNode;
  /** Segundos por vuelta. */
  duration?: number;
  reverse?: boolean;
  /** Pausar al pasar el mouse. */
  pauseOnHover?: boolean;
  className?: string;
  /** Desvanecer bordes. */
  fade?: boolean;
  gap?: string;
}

/** Cinta infinita (logos de clientes, tags, testimonios). Duplica el contenido para el loop. */
export function Marquee({ children, duration = 40, reverse, pauseOnHover = true, className, fade = true, gap = "3rem" }: MarqueeProps) {
  return (
    <div
      className={cn("group relative flex w-full overflow-hidden", className)}
      style={fade ? { maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)" } : undefined}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className={cn("flex shrink-0 items-center animate-marquee", pauseOnHover && "group-hover:[animation-play-state:paused]")}
          style={{ gap, paddingRight: gap, animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
