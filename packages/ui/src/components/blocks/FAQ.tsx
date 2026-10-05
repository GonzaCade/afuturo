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
  defaultOpen?: number | null;
}

/** Acordeón con altura animada. */
export function FAQ({ items, heading, id, defaultOpen = 0 }: FAQProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  return (
    <Section id={id} size="md">
      {heading && <SectionHeading {...heading} />}
      <div className="af-surface divide-y divide-line rounded-xl">
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={i} delay={i * 0.04} amount={0.5}>
              <button onClick={() => setOpen(isOpen ? null : i)} className="af-focus flex w-full items-center justify-between gap-6 rounded-xl px-5 py-5 text-left md:px-7" aria-expanded={isOpen}>
                <span className={cn("text-[15px] font-medium transition-colors md:text-base", isOpen ? "text-ink" : "text-ink-2")}>{it.q}</span>
                <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3, ease: EASE.outExpo }} className={cn("flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-200", isOpen ? "bg-accent text-white" : "bg-surface-3 text-ink-2")}>
                  <Plus size={16} strokeWidth={1.8} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div key="a" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.32, ease: EASE.outExpo }} className="overflow-hidden">
                    <p className="px-5 pb-6 text-[15px] leading-relaxed text-ink-2 md:px-7">{it.a}</p>
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
