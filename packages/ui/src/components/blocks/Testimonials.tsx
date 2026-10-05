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
  layout?: "marquee" | "grid";
}

function Quote({ t }: { t: Testimonial }) {
  return (
    <Card padding="sm" radius="lg" className="w-[320px] shrink-0 md:w-[380px]">
      {t.rating && (
        <div className="mb-4 flex gap-0.5 text-ink" aria-label={`${t.rating} de 5`}>
          {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={14} className="fill-current" strokeWidth={1.6} />)}
        </div>
      )}
      <p className="text-[15px] leading-relaxed text-ink">“{t.quote}”</p>
      <div className="mt-5 flex items-center gap-3">
        {t.avatar ? <img src={t.avatar} alt="" className="size-9 rounded-full object-cover" /> : <span className="size-9 rounded-full bg-surface-3" />}
        <div>
          <div className="text-sm font-medium text-ink">{t.name}</div>
          {t.role && <div className="text-[12px] text-ink-2">{t.role}</div>}
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
      {heading && <div className="mx-auto max-w-7xl px-5 sm:px-8"><SectionHeading {...heading} /></div>}
      {layout === "marquee" ? (
        <Reveal className="space-y-4">
          <Marquee duration={60} gap="1rem">{items.slice(0, half).map((t, i) => <Quote key={i} t={t} />)}</Marquee>
          {items.length > 2 && <Marquee duration={70} reverse gap="1rem">{items.slice(half).map((t, i) => <Quote key={i} t={t} />)}</Marquee>}
        </Reveal>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => <Reveal key={i} delay={i * 0.05}><Quote t={t} /></Reveal>)}
        </div>
      )}
    </Section>
  );
}
