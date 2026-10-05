import { motion } from "motion/react";
import { cn } from "../../lib/cn";
import { Section } from "../layout/Section";
import { CountUp } from "../../animations/CountUp";
import { Stagger } from "../../animations/Reveal";
import { fadeUp } from "../../animations/variants";
import { Label, SectionHeading, type SectionHeadingProps } from "../ui/Typography";

export interface Stat {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** Se pinta con acento (un solo stat por grilla). */
  live?: boolean;
}

export interface StatsProps {
  stats: Stat[];
  heading?: SectionHeadingProps;
  id?: string;
  tone?: "canvas" | "surface";
  /** Sin sección propia. */
  inline?: boolean;
}

/** Números grandes como anclas visuales. */
export function Stats({ stats, heading, id, tone = "canvas", inline }: StatsProps) {
  const grid = (
    <Stagger className={cn("grid gap-6", stats.length <= 3 ? "sm:grid-cols-3" : "grid-cols-2 lg:grid-cols-4")}>
      {stats.map((s) => (
        <motion.div key={s.label} variants={fadeUp} className="border-l border-line-strong pl-5">
          <div className={cn("font-display text-display-md font-medium tabular-nums", s.live ? "text-accent" : "text-ink")}>
            <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
          </div>
          <Label className="mt-3 block">{s.label}</Label>
        </motion.div>
      ))}
    </Stagger>
  );
  if (inline) return grid;
  return (
    <Section id={id} tone={tone} spacing="sm">
      {heading && <SectionHeading {...heading} />}
      {grid}
    </Section>
  );
}
