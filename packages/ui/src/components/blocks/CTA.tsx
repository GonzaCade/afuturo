import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Section } from "../layout/Section";
import { Button } from "../ui/Button";
import { TextReveal } from "../../animations/TextReveal";
import { Reveal } from "../../animations/Reveal";
import { Magnetic } from "../../animations/Magnetic";

export interface CTAProps {
  title: string;
  subtitle?: ReactNode;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  id?: string;
  /** `ink`: bloque oscuro (contraste puntual) · `surface`: superficie blanca elevada. */
  variant?: "ink" | "surface";
  /** Visual a la derecha (imagen, iPhone). */
  visual?: ReactNode;
  /** Contenido extra (input, QR). */
  children?: ReactNode;
}

/** Llamado a la acción final: gran superficie hero (radio 32) con una sola idea. */
export function CTA({ title, subtitle, primary, secondary, id, variant = "ink", visual, children }: CTAProps) {
  const ink = variant === "ink";
  return (
    <Section id={id} spacing="md">
      <Reveal preset="scaleIn">
        <div className={cn("relative isolate overflow-hidden rounded-2xl p-8 md:p-14", ink ? "bg-ink text-white shadow-float-lg" : "af-surface-float af-studio-inner text-ink", visual && "grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]")}>
          {ink && <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 size-[480px] rounded-full bg-white/[0.06] blur-3xl" />}
          <div className="relative">
            <TextReveal as="h2" className="text-display-lg font-medium">{title}</TextReveal>
            {subtitle && <Reveal delay={0.15} as="p" className={cn("mt-5 max-w-xl text-base leading-relaxed md:text-lg", ink ? "text-white/70" : "text-ink-2")}>{subtitle}</Reveal>}
            <Reveal delay={0.3} className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic><Button size="lg" variant={ink ? "primary" : "primary"} href={primary.href} arrow>{primary.label}</Button></Magnetic>
              {secondary && <Magnetic strength={0.12}><Button size="lg" variant={ink ? "ghost" : "secondary"} href={secondary.href} className={ink ? "text-white hover:bg-white/10 hover:text-white" : undefined}>{secondary.label}</Button></Magnetic>}
            </Reveal>
            {children && <Reveal delay={0.45} className="mt-8">{children}</Reveal>}
          </div>
          {visual && <Reveal preset="riseIn" delay={0.2} className="relative flex justify-center lg:justify-end">{visual}</Reveal>}
        </div>
      </Reveal>
    </Section>
  );
}
