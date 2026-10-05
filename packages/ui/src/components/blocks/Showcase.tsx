import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../../lib/cn";
import { Section } from "../layout/Section";
import { Eyebrow } from "../ui/Typography";
import { Button } from "../ui/Button";
import { Reveal, Stagger } from "../../animations/Reveal";
import { TextReveal } from "../../animations/TextReveal";
import { Parallax } from "../../animations/Parallax";
import { fadeUp } from "../../animations/variants";

export interface ShowcaseItem {
  eyebrow?: string;
  title: string;
  body: ReactNode;
  bullets?: string[];
  cta?: { label: string; href: string };
  visual: ReactNode;
}

export interface ShowcaseProps {
  items: ShowcaseItem[];
  id?: string;
  tone?: "canvas" | "surface";
  parallax?: boolean;
}

/** Secciones alternadas texto / visual. El visual es el protagonista; el texto orbita. */
export function Showcase({ items, id, tone = "canvas", parallax = true }: ShowcaseProps) {
  return (
    <Section id={id} tone={tone} spacing="lg" className="space-y-24 md:space-y-32">
      {items.map((it, i) => {
        const flip = i % 2 === 1;
        return (
          <div key={i} className={cn("grid items-center gap-10 lg:grid-cols-2 lg:gap-16", flip && "lg:[&>*:first-child]:order-2")}>
            <div className="max-w-lg">
              {it.eyebrow && <Reveal className="mb-5"><Eyebrow>{it.eyebrow}</Eyebrow></Reveal>}
              <TextReveal as="h3" className="text-display-md font-medium text-ink">{it.title}</TextReveal>
              <Reveal delay={0.15} as="p" className="mt-5 text-base leading-relaxed text-ink-2 md:text-lg">{it.body}</Reveal>
              {it.bullets && (
                <Stagger className="mt-7 space-y-2.5">
                  {it.bullets.map((b) => (
                    <motion.li key={b} variants={fadeUp} className="flex items-start gap-3 text-[15px] text-ink">
                      <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent"><Check size={12} strokeWidth={2.2} /></span>
                      {b}
                    </motion.li>
                  ))}
                </Stagger>
              )}
              {it.cta && <Reveal delay={0.3} className="mt-8"><Button variant="secondary" href={it.cta.href} arrow>{it.cta.label}</Button></Reveal>}
            </div>
            <Reveal preset="riseIn" className="flex justify-center">
              {parallax ? <Parallax speed={0.08} className="w-full">{it.visual}</Parallax> : it.visual}
            </Reveal>
          </div>
        );
      })}
    </Section>
  );
}
