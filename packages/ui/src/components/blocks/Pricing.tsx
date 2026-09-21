import { Check } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../../lib/cn";
import { Section } from "../layout/Section";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
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
  /** Plan destacado (borde gradiente + badge). */
  featured?: boolean;
  badge?: string;
}

export interface PricingProps {
  plans: Plan[];
  heading?: SectionHeadingProps;
  id?: string;
}

/** Tabla de planes / paquetes. Ideal para "software empaquetado". */
export function Pricing({ plans, heading, id }: PricingProps) {
  return (
    <Section id={id} ambient>
      {heading && <SectionHeading {...heading} />}
      <Stagger className={cn("grid items-stretch gap-5", plans.length === 2 ? "md:grid-cols-2 lg:mx-auto lg:max-w-4xl" : "md:grid-cols-3")}>
        {plans.map((p) => (
          <motion.div key={p.name} variants={fadeUp} className={cn(p.featured && "md:-my-4")}>
            <Card variant={p.featured ? "gradient-border" : "glass"} padding="lg" className={cn("flex h-full flex-col", p.featured && "bg-surface-2 shadow-glow")}>
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold">{p.name}</h3>
                {p.badge && <Badge variant={p.featured ? "primary" : "outline"}>{p.badge}</Badge>}
              </div>
              {p.description && <p className="mt-2 text-sm text-muted">{p.description}</p>}
              <div className="mt-8 flex items-baseline gap-1">
                <span className={cn("font-display text-5xl font-semibold tracking-tight", p.featured && "text-gradient")}>{p.price}</span>
                {p.period && <span className="text-sm text-muted">/{p.period}</span>}
              </div>
              <ul className="mt-8 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-paper/85">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary-400" strokeWidth={2.5} />{f}
                  </li>
                ))}
              </ul>
              <Button href={p.cta.href} variant={p.featured ? "primary" : "outline"} className="mt-10 w-full" arrow>{p.cta.label}</Button>
            </Card>
          </motion.div>
        ))}
      </Stagger>
    </Section>
  );
}
