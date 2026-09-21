import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "../../lib/cn";
import { Section } from "../layout/Section";
import { SectionHeading, type SectionHeadingProps } from "../ui/Typography";
import { Reveal } from "../../animations/Reveal";
import { EASE } from "../../animations/easings";

export interface FAQItem { q: string; a: string }

export interface FAQProps {
  items: FAQItem[];
  heading?: SectionHeadingProps;
  id?: string;
  /** Abrir el primero por defecto. */
  defaultOpen?: number | null;
}

/** Acordeón de preguntas con altura animada. */
export function FAQ({ items, heading, id, defaultOpen = 0 }: FAQProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  return (
    <Section id={id} size="md" tone="surface">
      {heading && <SectionHeading {...heading} />}
      <div className="divide-y divide-line rounded-3xl border border-line bg-surface-2/60">
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={i} delay={i * 0.04} amount={0.5}>
              <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left md:px-8" aria-expanded={isOpen}>
                <span className={cn("font-display text-lg font-medium transition-colors", isOpen ? "text-paper" : "text-paper/80")}>{it.q}</span>
                <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.4, ease: EASE.outExpo }} className={cn("flex size-8 shrink-0 items-center justify-center rounded-full border border-line", isOpen && "af-gradient border-transparent text-white")}>
                  <Plus className="size-4" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div key="a" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: EASE.outExpo }} className="overflow-hidden">
                    <p className="px-6 pb-7 leading-relaxed text-muted md:px-8">{it.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
