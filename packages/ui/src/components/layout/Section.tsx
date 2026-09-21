import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { AmbientBackground } from "../ui/Ambient";

export function Container({ className, size = "lg", ...rest }: HTMLAttributes<HTMLDivElement> & { size?: "sm" | "md" | "lg" | "xl" | "full" }) {
  const S = { sm: "max-w-3xl", md: "max-w-5xl", lg: "max-w-7xl", xl: "max-w-[90rem]", full: "max-w-none" };
  return <div className={cn("mx-auto w-full px-5 sm:px-8", S[size], className)} {...rest} />;
}

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Fondo ambiental (grid + orbs). */
  ambient?: boolean;
  /** Tono: dark (default) o light (invierte a fondo #FAFAFA). */
  tone?: "dark" | "light" | "surface";
  /** Espaciado vertical. */
  spacing?: "sm" | "md" | "lg" | "none";
  /** Ancho del contenedor interno. */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  children?: ReactNode;
}

const SP = { none: "", sm: "py-16 md:py-24", md: "py-24 md:py-32", lg: "py-32 md:py-44" };
const TONE = { dark: "bg-ink text-paper", surface: "bg-surface-1 text-paper", light: "bg-light-1 text-ink" };

/** Sección de página. Todas las onepages se arman apilando <Section>. */
export function Section({ ambient, tone = "dark", spacing = "md", size = "lg", className, children, ...rest }: SectionProps) {
  return (
    <section className={cn("relative overflow-hidden", TONE[tone], SP[spacing], className)} {...rest}>
      {ambient && <AmbientBackground />}
      <Container size={size} className="relative">{children}</Container>
    </section>
  );
}
