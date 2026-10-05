import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { StudioBackground } from "../ui/Ambient";

export function Container({ className, size = "lg", ...rest }: HTMLAttributes<HTMLDivElement> & { size?: "sm" | "md" | "lg" | "xl" | "full" }) {
  const S = { sm: "max-w-3xl", md: "max-w-5xl", lg: "max-w-7xl", xl: "max-w-[92rem]", full: "max-w-none" };
  return <div className={cn("mx-auto w-full px-5 sm:px-8", S[size], className)} {...rest} />;
}

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Fondo de estudio animado. */
  studio?: boolean;
  /** Tono: canvas (default), surface (blanco) o ink (bloque oscuro puntual). */
  tone?: "canvas" | "surface" | "ink";
  /** Espaciado vertical: 48 → 80 px entre secciones. */
  spacing?: "sm" | "md" | "lg" | "none";
  size?: "sm" | "md" | "lg" | "xl" | "full";
  children?: ReactNode;
}

const SP = { none: "", sm: "py-12 md:py-16", md: "py-16 md:py-20", lg: "py-20 md:py-28" };
const TONE = { canvas: "bg-canvas text-ink", surface: "bg-surface text-ink", ink: "bg-ink text-white" };

/** Sección de página. Las onepages se arman apilando <Section>. */
export function Section({ studio, tone = "canvas", spacing = "md", size = "lg", className, children, ...rest }: SectionProps) {
  return (
    <section className={cn("relative", TONE[tone], SP[spacing], className)} {...rest}>
      {studio && <StudioBackground />}
      <Container size={size} className="relative">{children}</Container>
    </section>
  );
}
