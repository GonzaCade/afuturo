import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useMotionTemplate } from "motion/react";
import { cn } from "../lib/cn";

export interface SpotlightProps {
  children: ReactNode;
  className?: string;
  /** Color del halo. Default: cian de marca. */
  color?: string;
  size?: number;
}

/**
 * Halo que sigue al cursor sobre una tarjeta (borde iluminado). Combinar con `.glass`.
 */
export function Spotlight({ children, className, color = "rgb(57 186 208 / 0.25)", size = 320 }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };
  const bg = useMotionTemplate`radial-gradient(${size}px circle at ${mx}px ${my}px, ${color}, transparent 70%)`;
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => { mx.set(-1000); my.set(-1000); }} className={cn("group relative overflow-hidden", className)}>
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: bg }} />
      <div className="relative">{children}</div>
    </div>
  );
}
