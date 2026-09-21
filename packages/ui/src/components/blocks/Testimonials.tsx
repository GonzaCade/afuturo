import { Star } from "lucide-react";
import { Section } from "../layout/Section";
import { Card } from "../ui/Card";
import { SectionHeading, type SectionHeadingProps } from "../ui/Typography";
import { Marquee } from "../../animations/Marquee";
import { Reveal } from "../../animations/Reveal";

export interface Testimonial {
  quote: string;
  name: string;
  role?: string;
  avatar?: string;
  rating?: number;
}

export interface TestimonialsProps {
  items: Testimonial[];
  heading?: SectionHeadingProps;
  id?: string;
  /** Cinta infinita (Pulso) o grilla estática. */
  layout?: "marquee" | "grid";
}

function Quote({ t }: { t: Testimonial }) {
  return (
    <Card variant="glass" padding="sm" hover={false} className="w-[340px] shrink-0 md:w-[400px]">
      {t.rating && (
        <div className="mb-4 flex gap-1 text-primary-400">
          {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}
        </div>
      )}
      <p className="text-base leading-relaxed text-paper/90">“{t.quote}”</p>
      <div className="mt-6 flex items-center gap-3">
        {t.avatar ? <img src={t.avatar} alt="" className="size-10 rounded-full object-cover" /> : <span className="size-10 rounded-full af-gradient" />}
        <div>
          <div className="text-sm font-semibold">{t.name}</div>
          {t.role && <div className="text-xs text-muted">{t.role}</div>}
        </div>
      </div>
    </Card>
  );
}

/** Testimonios en dos cintas contrapuestas o en grilla. */
export function Testimonials({ items, heading, id, layout = "marquee" }: TestimonialsProps) {
  const half = Math.ceil(items.length / 2);
  return (
    <Section id={id} size={layout === "marquee" ? "full" : "lg"} className={layout === "marquee" ? "px-0" : undefined}>
      {heading && <SectionHeading {...heading} />}
      {layout === "marquee" ? (
        <Reveal className="space-y-5">
          <Marquee duration={60} gap="1.25rem">{items.slice(0, half).map((t, i) => <Quote key={i} t={t} />)}</Marquee>
          {items.length > 2 && <Marquee duration={70} reverse gap="1.25rem">{items.slice(half).map((t, i) => <Quote key={i} t={t} />)}</Marquee>}
        </Reveal>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => <Reveal key={i} delay={i * 0.06}><Quote t={t} /></Reveal>)}
        </div>
      )}
    </Section>
  );
}
