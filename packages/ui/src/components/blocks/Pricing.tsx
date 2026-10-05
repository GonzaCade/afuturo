import { Check } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../../lib/cn";
import { Section } from "../layout/Section";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Status";
import { Button } from "../ui/Button";
import { SectionHeading, type SectionHeadingProps } from "../ui/Typography";
import { Stagger } from "../../animations/Reveal";
import { fadeUp } from "../../animations/variants";

export interface Plan {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
  badge?: string;
}

export interface PricingProps {
  plans: Plan[];
  heading?: SectionHeadingProps;
  id?: string;
}

/** Planes / paquetes. El destacado es el único con acento. */
export function Pricing({ plans, heading, id }: PricingProps) {
  return (
    <Section id={id}>
      {heading && <SectionHeading {...heading} />}
      <Stagger className={cn("grid items-stretch gap-4", plans.length === 2 ? "md:grid-cols-2 lg:mx-auto lg:max-w-4xl" : "md:grid-cols-3")}>
        {plans.map((p) => (
          <motion.div key={p.name} variants={fadeUp}>
            <Card padding="lg" selected={p.featured} className={cn("flex h-full flex-col", p.featured && "shadow-float-lg")}>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-medium tracking-[-0.02em] text-ink">{p.name}</h3>
                {p.badge && <Badge variant={p.featured ? "accent" : "neutral"}>{p.badge}</Badge>}
              </div>
              {p.description && <p className="mt-2 text-sm text-ink-2">{p.description}</p>}
              <div className="mt-7 flex items-baseline gap-1">
                <span className={cn("font-display text-display-md font-medium tabular-nums", p.featured ? "text-accent" : "text-ink")}>{p.price}</span>
                {p.period && <span className="text-sm text-ink-3">/{p.period}</span>}
              </div>
              <ul className="mt-7 flex-1 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-ink">
                    <Check size={15} strokeWidth={2} className="mt-0.5 shrink-0 text-ink-3" />{f}
                  </li>
                ))}
              </ul>
              <Button href={p.cta.href} variant={p.featured ? "primary" : "secondary"} className="mt-8 w-full" arrow>{p.cta.label}</Button>
            </Card>
          </motion.div>
        ))}
      </Stagger>
    </Section>
  );
}
