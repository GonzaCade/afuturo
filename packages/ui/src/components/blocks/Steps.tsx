import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Section } from "../layout/Section";
import { SectionHeading, type SectionHeadingProps } from "../ui/Typography";
import { Stagger } from "../../animations/Reveal";
import { fadeUp } from "../../animations/variants";
import { EASE } from "../../animations/easings";

export interface Step { title: string; body: string; icon?: ReactNode }

export interface StepsProps {
  steps: Step[];
  heading?: SectionHeadingProps;
  id?: string;
}

/** Proceso numerado con línea conectora que se dibuja. */
export function Steps({ steps, heading, id }: StepsProps) {
  return (
    <Section id={id}>
      {heading && <SectionHeading {...heading} />}
      <div className="relative">
        <motion.div
          aria-hidden
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: EASE.outExpo }}
          className="absolute left-0 right-0 top-5 hidden h-px origin-left bg-line-strong md:block"
        />
        <Stagger gap={0.12} className="grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div key={i} variants={fadeUp} className="relative">
              <div className="mb-5 inline-flex size-10 items-center justify-center rounded-full bg-ink font-mono text-[12px] font-medium text-white shadow-float-sm">
                {s.icon ?? String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-lg font-medium tracking-[-0.02em] text-ink">{s.title}</h3>
              <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-ink-2">{s.body}</p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
