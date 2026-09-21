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
  /** Contenido visual extra (imagen, mini demo). */
  visual?: ReactNode;
}

export interface FeatureGridProps {
  heading?: SectionHeadingProps;
  features: Feature[];
  columns?: 2 | 3 | 4;
  /** Estilo bento con tarjetas de distinto tamaño (usar `wide`). */
  bento?: boolean;
  id?: string;
  tone?: "dark" | "light" | "surface";
}

/** Grilla de features (Pulso: "seis capacidades"). Con `bento` se vuelve una grilla asimétrica. */
export function FeatureGrid({ heading, features, columns = 3, bento, id, tone = "dark" }: FeatureGridProps) {
  const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" }[columns];
  const light = tone === "light";
  return (
    <Section id={id} tone={tone} ambient={!light}>
      {heading && <SectionHeading {...heading} />}
      <Stagger className={cn("grid gap-4 md:gap-5", cols)}>
        {features.map((f, i) => (
          <motion.div key={i} variants={fadeUp} className={cn(bento && f.wide && "md:col-span-2")}>
            <Card variant={light ? "light" : "glass"} spotlight={!light} className="flex h-full flex-col">
              {f.icon && <CardIcon>{f.icon}</CardIcon>}
              <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">{f.title}</h3>
              <p className={cn("mt-3 leading-relaxed", light ? "text-ink/60" : "text-muted")}>{f.body}</p>
              {f.visual && <div className="mt-6 flex-1">{f.visual}</div>}
            </Card>
          </motion.div>
        ))}
      </Stagger>
    </Section>
  );
}
