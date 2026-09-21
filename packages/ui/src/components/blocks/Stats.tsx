import { motion } from "motion/react";
import { cn } from "../../lib/cn";
import { Section } from "../layout/Section";
import { CountUp } from "../../animations/CountUp";
import { Stagger } from "../../animations/Reveal";
import { fadeUp } from "../../animations/variants";
import { Mono } from "../ui/Typography";
import { SectionHeading, type SectionHeadingProps } from "../ui/Typography";

export interface Stat {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export interface StatsProps {
  stats: Stat[];
  heading?: SectionHeadingProps;
  id?: string;
  tone?: "dark" | "light" | "surface";
  /** Banda compacta (sin sección propia). */
  inline?: boolean;
}

/** Métricas grandes que cuentan al aparecer. */
export function Stats({ stats, heading, id, tone = "surface", inline }: StatsProps) {
  const grid = (
    <Stagger className={cn("grid gap-8", stats.length <= 3 ? "sm:grid-cols-3" : "grid-cols-2 lg:grid-cols-4")}>
      {stats.map((s) => (
        <motion.div key={s.label} variants={fadeUp} className="relative border-l border-line pl-6">
          <div className="font-display text-5xl font-semibold tracking-tight text-gradient md:text-6xl">
            <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
          </div>
          <Mono className="mt-3 block">{s.label}</Mono>
        </motion.div>
      ))}
    </Stagger>
  );
  if (inline) return grid;
  return (
    <Section id={id} tone={tone} spacing="sm">
      {heading && <SectionHeading {...heading} align="left" />}
      {grid}
    </Section>
  );
}
