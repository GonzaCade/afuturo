import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Reveal } from "../../animations/Reveal";
import { TextReveal } from "../../animations/TextReveal";
import { CountUp } from "../../animations/CountUp";

/** Label pequeño en mayúsculas con tracking amplio (eyebrows, headers de tabla, unidades). */
export function Label({ children, className, mono, ...rest }: HTMLAttributes<HTMLSpanElement> & { mono?: boolean }) {
  return (
    <span className={cn("inline-block text-label font-medium uppercase text-ink-3", mono ? "font-mono" : "font-sans", className)} {...rest}>
      {children}
    </span>
  );
}

/** Eyebrow sobre títulos: un label, sin adornos. */
export function Eyebrow({ children, className, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return <Label className={cn("block", className)} {...rest}>{children}</Label>;
}

/** Número grande como ancla visual (tabular, tracking negativo). */
export function BigNumber({ value, unit, prefix, decimals, className, size = "lg", countUp = true, accent }: {
  value: number | string; unit?: string; prefix?: string; decimals?: number; className?: string; size?: "md" | "lg" | "xl"; countUp?: boolean; accent?: boolean;
}) {
  const S = { md: "text-display-sm", lg: "text-display-md", xl: "text-display-xl" };
  return (
    <span className={cn("inline-flex items-baseline gap-1 font-display font-medium tabular-nums", S[size], accent && "text-accent", className)}>
      {typeof value === "number" && countUp ? <CountUp to={value} prefix={prefix} decimals={decimals} /> : <>{prefix}{value}</>}
      {unit && <span className="text-[0.4em] font-medium tracking-normal text-ink-3">{unit}</span>}
    </span>
  );
}

export interface SectionHeadingProps {
  eyebrow?: ReactNode;
  title: string;
  /** Parte del título a resaltar con el acento (debe estar contenida en `title`). */
  highlight?: string;
  subtitle?: ReactNode;
  align?: "left" | "center";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  as?: "h1" | "h2" | "h3";
}

const SIZE = { sm: "text-display-sm", md: "text-display-md", lg: "text-display-lg", xl: "text-display-xl" };

/** Encabezado de sección: eyebrow + título por palabra + subtítulo. */
export function SectionHeading({ eyebrow, title, highlight, subtitle, align = "left", size = "md", className, as = "h2" }: SectionHeadingProps) {
  const Tag = as;
  const content: ReactNode = <TextReveal as="span" className="block" highlight={highlight}>{title}</TextReveal>;
  return (
    <div className={cn("mb-12 max-w-2xl md:mb-16", align === "center" ? "mx-auto text-center" : "text-left", className)}>
      {eyebrow && <Reveal className="mb-5"><Eyebrow>{eyebrow}</Eyebrow></Reveal>}
      <Tag className={cn(SIZE[size], "font-medium text-ink")}>{content}</Tag>
      {subtitle && (
        <Reveal delay={0.2} as="p" className={cn("mt-5 text-base leading-relaxed text-ink-2 md:text-lg", align === "center" && "mx-auto max-w-xl")}>
          {subtitle}
        </Reveal>
      )}
    </div>
  );
}
