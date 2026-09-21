import type { ReactNode } from "react";
import { Section } from "../layout/Section";
import { Button } from "../ui/Button";
import { Orb } from "../ui/Ambient";
import { TextReveal } from "../../animations/TextReveal";
import { Reveal } from "../../animations/Reveal";
import { Magnetic } from "../../animations/Magnetic";

export interface CTAProps {
  title: string;
  subtitle?: ReactNode;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  id?: string;
  /** Tarjeta con gradiente lleno (default) o glass. */
  variant?: "gradient" | "glass";
  /** Contenido extra (QR, inputs, etc). */
  children?: ReactNode;
}

/** Llamado a la acción final: gran tarjeta con gradiente animado y orbs. */
export function CTA({ title, subtitle, primary, secondary, id, variant = "gradient", children }: CTAProps) {
  const grad = variant === "gradient";
  return (
    <Section id={id} spacing="md">
      <Reveal preset="scaleIn">
        <div className={grad ? "relative overflow-hidden rounded-3xl af-gradient p-10 text-center text-white md:rounded-4xl md:p-20" : "glass relative overflow-hidden rounded-3xl p-10 text-center md:rounded-4xl md:p-20"}>
          {!grad && <Orb className="-top-40 left-1/2 -translate-x-1/2" size={700} />}
          {grad && <div className="absolute inset-0 bg-noise" />}
          {grad && <div aria-hidden className="absolute -right-24 -top-24 size-96 rounded-full bg-white/15 blur-3xl animate-pulse-glow" />}
          <div className="relative">
            <TextReveal as="h2" className="text-display-lg font-semibold" effect="blur">{title}</TextReveal>
            {subtitle && <Reveal delay={0.2} as="p" className={grad ? "mx-auto mt-6 max-w-2xl text-lg text-white/80 md:text-xl" : "mx-auto mt-6 max-w-2xl text-lg text-muted md:text-xl"}>{subtitle}</Reveal>}
            <Reveal delay={0.35} className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Magnetic><Button size="lg" variant={grad ? "secondary" : "primary"} href={primary.href} arrow>{primary.label}</Button></Magnetic>
              {secondary && <Magnetic strength={0.2}><Button size="lg" variant={grad ? "ghost" : "glass"} href={secondary.href} className={grad ? "text-white hover:bg-white/15" : undefined}>{secondary.label}</Button></Magnetic>}
            </Reveal>
            {children && <Reveal delay={0.5} className="mt-10">{children}</Reveal>}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
