import type { ReactNode } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/cn";
import { Container } from "../layout/Section";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { AmbientBackground } from "../ui/Ambient";
import { TextReveal } from "../../animations/TextReveal";
import { Reveal } from "../../animations/Reveal";
import { Magnetic } from "../../animations/Magnetic";
import { EASE } from "../../animations/easings";

export interface HeroProps {
  eyebrow?: ReactNode;
  /** Título. Usar `highlight` para pintar una parte con gradiente. */
  title: string;
  highlight?: string;
  subtitle?: ReactNode;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Visual debajo o al lado del texto (mockup, iPhone, imagen). */
  visual?: ReactNode;
  /** Layout: `center` (Apple: texto arriba, visual abajo) o `split` (texto izq., visual der.). */
  layout?: "center" | "split";
  /** Prueba social bajo los CTAs (estrellas, logos, "+6M usuarios"). */
  proof?: ReactNode;
  /** Flecha de "scroll" al pie. */
  scrollHint?: boolean;
  className?: string;
  id?: string;
}

/** Hero de onepage: entrada cinemática (blur + palabras), fondo ambiental, CTAs magnéticos. */
export function Hero({ eyebrow, title, highlight, subtitle, primaryCta, secondaryCta, visual, layout = "center", proof, scrollHint = true, className, id = "top" }: HeroProps) {
  const center = layout === "center";
  let heading: ReactNode = <TextReveal as="span" effect="blur" className="block">{title}</TextReveal>;
  if (highlight && title.includes(highlight)) {
    const [a, b] = title.split(highlight);
    heading = (
      <>
        {a && <TextReveal as="span" effect="blur">{a.trimEnd()}</TextReveal>}{a ? " " : ""}
        <TextReveal as="span" effect="blur" delay={0.2} gradient>{highlight}</TextReveal>
        {b && <>{" "}<TextReveal as="span" effect="blur" delay={0.35}>{b.trimStart()}</TextReveal></>}
      </>
    );
  }

  return (
    <section id={id} className={cn("relative flex min-h-screen flex-col justify-center overflow-hidden bg-ink pt-32 pb-20 text-paper", className)}>
      <AmbientBackground />
      <div className="absolute inset-0 bg-noise" />
      <Container className={cn("relative", !center && "grid items-center gap-16 lg:grid-cols-2")}>
        <div className={cn(center && "mx-auto max-w-4xl text-center")}>
          {eyebrow && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE.outExpo }} className="mb-7">
              <Badge dot>{eyebrow}</Badge>
            </motion.div>
          )}
          <h1 className="text-display-xl font-semibold">{heading}</h1>
          {subtitle && (
            <Reveal delay={0.5} as="p" className={cn("mt-8 text-lg leading-relaxed text-muted md:text-2xl", center && "mx-auto max-w-2xl")}>
              {subtitle}
            </Reveal>
          )}
          {(primaryCta || secondaryCta) && (
            <Reveal delay={0.7} className={cn("mt-10 flex flex-wrap items-center gap-4", center && "justify-center")}>
              {primaryCta && <Magnetic><Button size="lg" href={primaryCta.href} arrow>{primaryCta.label}</Button></Magnetic>}
              {secondaryCta && <Magnetic strength={0.2}><Button size="lg" variant="glass" href={secondaryCta.href}>{secondaryCta.label}</Button></Magnetic>}
            </Reveal>
          )}
          {proof && <Reveal delay={0.9} className={cn("mt-10 text-sm text-muted", center && "flex justify-center")}>{proof}</Reveal>}
        </div>

        {visual && (
          <Reveal preset="riseIn" delay={0.6} className={cn("relative", center ? "mx-auto mt-20 flex justify-center" : "flex justify-center lg:justify-end")}>
            {visual}
          </Reveal>
        )}
      </Container>

      {scrollHint && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
            <ChevronDown className="size-5" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
