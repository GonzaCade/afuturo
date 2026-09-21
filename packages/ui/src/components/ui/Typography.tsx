import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Badge } from "./Badge";
import { Reveal } from "../../animations/Reveal";
import { TextReveal } from "../../animations/TextReveal";

/** Texto con el gradiente de marca (inline). */
export function GradientText({ children, className, horizontal, ...rest }: HTMLAttributes<HTMLSpanElement> & { horizontal?: boolean }) {
  return <span className={cn(horizontal ? "text-gradient-h" : "text-gradient", className)} {...rest}>{children}</span>;
}

export interface SectionHeadingProps {
  /** Eyebrow (badge chiquito arriba del título). */
  eyebrow?: ReactNode;
  title: string;
  /** Parte del título a resaltar con gradiente (debe estar contenido en `title`). */
  highlight?: string;
  subtitle?: ReactNode;
  align?: "left" | "center";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  as?: "h1" | "h2" | "h3";
}

const SIZE = { sm: "text-display-sm", md: "text-display-md", lg: "text-display-lg", xl: "text-display-xl" };

/**
 * Encabezado de sección estándar: eyebrow + título con reveal por palabra + subtítulo.
 * `highlight` pinta una parte del título con gradiente.
 */
export function SectionHeading({ eyebrow, title, highlight, subtitle, align = "center", size = "md", className, as = "h2" }: SectionHeadingProps) {
  const Tag = as;
  let content: ReactNode = <TextReveal as="span" className="block" effect="blur">{title}</TextReveal>;
  if (highlight && title.includes(highlight)) {
    const [a, b] = title.split(highlight);
    content = (
      <>
        {a && <TextReveal as="span" effect="blur">{a.trimEnd()}</TextReveal>}{a ? " " : ""}
        <TextReveal as="span" effect="blur" delay={0.15} gradient>{highlight}</TextReveal>
        {b && <>{" "}<TextReveal as="span" effect="blur" delay={0.3}>{b.trimStart()}</TextReveal></>}
      </>
    );
  }
  return (
    <div className={cn("mb-14 max-w-3xl md:mb-20", align === "center" ? "mx-auto text-center" : "text-left", className)}>
      {eyebrow && <Reveal className="mb-5"><Badge dot>{eyebrow}</Badge></Reveal>}
      <Tag className={cn(SIZE[size], "font-semibold")}>{content}</Tag>
      {subtitle && (
        <Reveal delay={0.25} as="p" className={cn("mt-6 text-lg leading-relaxed text-muted md:text-xl", align === "center" && "mx-auto max-w-2xl")}>
          {subtitle}
        </Reveal>
      )}
    </div>
  );
}

/** Texto en mono, uppercase y tracking amplio (labels HUD). */
export function Mono({ children, className, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("font-mono text-xs uppercase tracking-[0.2em] text-muted", className)} {...rest}>{children}</span>;
}
