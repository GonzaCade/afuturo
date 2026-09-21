import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Section } from "../layout/Section";
import { SectionHeading, type SectionHeadingProps } from "../ui/Typography";
import { Stagger } from "../../animations/Reveal";
import { fadeUp } from "../../animations/variants";

export interface Step { title: string; body: string; icon?: ReactNode }

export interface StepsProps {
  steps: Step[];
  heading?: SectionHeadingProps;
  id?: string;
}

/** Proceso en pasos numerados con línea conectora que se dibuja. */
export function Steps({ steps, heading, id }: StepsProps) {
  return (
    <Section id={id}>
      {heading && <SectionHeading {...heading} />}
      <div className="relative">
        <motion.div
          aria-hidden
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-0 right-0 top-6 hidden h-px origin-left bg-gradient-to-r from-primary-400 via-primary-600 to-transparent md:block"
        />
        <Stagger gap={0.15} className="grid gap-10 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div key={i} variants={fadeUp} className="relative">
              <div className="mb-6 inline-flex size-12 items-center justify-center rounded-full af-gradient font-mono text-sm font-medium text-white shadow-glow-sm">
                {s.icon ?? String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{s.body}</p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
