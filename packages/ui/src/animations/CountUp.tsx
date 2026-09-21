import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, useTransform, motion } from "motion/react";

export interface CountUpProps {
  to: number;
  from?: number;
  /** Decimales. */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  /** Locale para separadores de miles. */
  locale?: string;
  duration?: number;
}

/** Número que cuenta hacia arriba al entrar en viewport (stats, métricas). */
export function CountUp({ to, from = 0, decimals = 0, prefix = "", suffix = "", className, locale = "es-AR", duration = 1.8 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const mv = useMotionValue(from);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });
  const text = useTransform(spring, (v) => `${prefix}${v.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`);

  useEffect(() => { if (inView) mv.set(to); }, [inView, to, mv]);

  return <motion.span ref={ref} className={className}>{text}</motion.span>;
}
