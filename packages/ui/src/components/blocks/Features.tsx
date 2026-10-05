import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/cn";
import { Card, CardIcon } from "../ui/Card";
import { SectionHeading, type SectionHeadingProps } from "../ui/Typography";
import { Section } from "../layout/Section";
import { Stagger } from "../../animations/Reveal";
import { fadeUp } from "../../animations/variants";

export interface Feature {
  icon?: ReactNode;
  title: string;
  body: string;
  /** Ocupa 2 columnas (bento). */
  wide?: boolean;
  /** Visual extra (imagen, mini demo). */
  visual?: ReactNode;
}

export interface FeatureGridProps {
  heading?: SectionHeadingProps;
  features: Feature[];
  columns?: 2 | 3 | 4;
  bento?: boolean;
  id?: string;
  tone?: "canvas" | "surface";
}

/** Grilla de features con superficies elevadas y reveal escalonado. */
export function FeatureGrid({ heading, features, columns = 3, bento, id, tone = "canvas" }: FeatureGridProps) {
  const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <Section id={id} tone={tone}>
      {heading && <SectionHeading {...heading} />}
      <Stagger className={cn("grid gap-3 md:gap-4", cols)}>
        {features.map((f, i) => (
          <motion.div key={i} variants={fadeUp} className={cn(bento && f.wide && "md:col-span-2")}>
            <Card hover className="flex h-full flex-col">
              {f.icon && <CardIcon>{f.icon}</CardIcon>}
              <h3 className="text-lg font-medium tracking-[-0.02em] text-ink">{f.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{f.body}</p>
              {f.visual && <div className="mt-6 flex-1">{f.visual}</div>}
            </Card>
          </motion.div>
        ))}
      </Stagger>
    </Section>
  );
}
