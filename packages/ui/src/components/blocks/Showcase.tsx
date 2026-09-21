import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "../../lib/cn";
import { Section } from "../layout/Section";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Reveal, Stagger } from "../../animations/Reveal";
import { TextReveal } from "../../animations/TextReveal";
import { Parallax } from "../../animations/Parallax";
import { motion } from "motion/react";
import { fadeUp } from "../../animations/variants";

export interface ShowcaseItem {
  eyebrow?: string;
  title: string;
  body: ReactNode;
  bullets?: string[];
  cta?: { label: string; href: string };
  /** Mockup / imagen / iPhone. */
  visual: ReactNode;
}

export interface ShowcaseProps {
  items: ShowcaseItem[];
  id?: string;
  tone?: "dark" | "light" | "surface";
  /** Parallax suave del visual. */
  parallax?: boolean;
}

/**
 * Secciones alternadas texto/visual (Pulso feature deep-dives, Apple feature sections).
 * Cada item alterna el lado del visual automáticamente.
 */
export function Showcase({ items, id, tone = "dark", parallax = true }: ShowcaseProps) {
  const light = tone === "light";
  return (
    <Section id={id} tone={tone} spacing="lg" className="space-y-32 md:space-y-44">
      {items.map((it, i) => {
        const flip = i % 2 === 1;
        return (
          <div key={i} className={cn("grid items-center gap-12 lg:grid-cols-2 lg:gap-20", flip && "lg:[&>*:first-child]:order-2")}>
            <div>
              {it.eyebrow && <Reveal className="mb-5"><Badge>{it.eyebrow}</Badge></Reveal>}
              <TextReveal as="h3" className="text-display-md font-semibold" effect="blur">{it.title}</TextReveal>
              <Reveal delay={0.2} as="p" className={cn("mt-6 text-lg leading-relaxed", light ? "text-ink/60" : "text-muted")}>{it.body}</Reveal>
              {it.bullets && (
                <Stagger className="mt-8 space-y-3">
                  {it.bullets.map((b) => (
                    <motion.li key={b} variants={fadeUp} className="flex items-start gap-3 text-base">
                      <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full af-gradient text-white"><Check className="size-3" strokeWidth={3} /></span>
                      <span className={light ? "text-ink/80" : "text-paper/85"}>{b}</span>
                    </motion.li>
                  ))}
                </Stagger>
              )}
              {it.cta && <Reveal delay={0.35} className="mt-8"><Button variant="outline" href={it.cta.href} arrow>{it.cta.label}</Button></Reveal>}
            </div>
            <Reveal preset="riseIn" className="flex justify-center">
              {parallax ? <Parallax speed={0.12}>{it.visual}</Parallax> : it.visual}
            </Reveal>
          </div>
        );
      })}
    </Section>
  );
}
