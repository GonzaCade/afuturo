import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/cn";
import { Container } from "../layout/Section";
import { Eyebrow } from "../ui/Typography";
import { Button } from "../ui/Button";
import { StudioBackground } from "../ui/Ambient";
import { TextReveal } from "../../animations/TextReveal";
import { Reveal } from "../../animations/Reveal";
import { Magnetic } from "../../animations/Magnetic";
import { EASE } from "../../animations/easings";

export interface HeroProps {
  eyebrow?: ReactNode;
  title: string;
  /** Parte del título en acento. */
  highlight?: string;
  subtitle?: ReactNode;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Visual dominante (HeroSurface, ProductStage, iPhone). Ignorado en `layout="cover"`. */
  visual?: ReactNode;
  /**
   * `stack`: texto arriba, visual abajo · `split`: texto izq., visual der. ·
   * `cover`: `media` a pantalla completa detrás del texto, texto alineado a la izquierda.
   */
  layout?: "stack" | "split" | "cover";
  /** Imagen de fondo a sangre para `layout="cover"` (idealmente foto de estudio sobre blanco). */
  media?: ReactNode;
  /** Elementos que flotan sobre la foto (pills, paneles). Solo `cover`. */
  overlay?: ReactNode;
  /** Prueba social bajo los CTAs. */
  proof?: ReactNode;
  className?: string;
  id?: string;
}

/** Hero: una idea en el título, un visual dominante, dos CTAs. Entrada por palabra. */
export function Hero({ eyebrow, title, highlight, subtitle, primaryCta, secondaryCta, visual, layout = "stack", media, overlay, proof, className, id = "top" }: HeroProps) {
  const cover = layout === "cover";
  const stack = layout === "stack";
  const heading: ReactNode = <TextReveal as="span" className="block" highlight={highlight}>{title}</TextReveal>;

  const content = (
    <div className={cn(stack && "max-w-3xl", cover && "max-w-3xl")}>
      {eyebrow && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE.outExpo }} className="mb-6">
          <Eyebrow>{eyebrow}</Eyebrow>
        </motion.div>
      )}
      <h1 className="text-display-xl font-medium text-ink">{heading}</h1>
      {subtitle && (
        <Reveal delay={0.4} as="p" className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2 md:text-xl">
          {subtitle}
        </Reveal>
      )}
      {(primaryCta || secondaryCta) && (
        <Reveal delay={0.55} className="mt-8 flex flex-wrap items-center gap-3">
          {primaryCta && <Magnetic><Button size="lg" href={primaryCta.href} arrow>{primaryCta.label}</Button></Magnetic>}
          {secondaryCta && <Magnetic strength={0.12}><Button size="lg" variant="secondary" href={secondaryCta.href}>{secondaryCta.label}</Button></Magnetic>}
        </Reveal>
      )}
      {proof && <Reveal delay={0.7} className="mt-8 text-sm text-ink-2">{proof}</Reveal>}
    </div>
  );

  if (cover) {
    return (
      <section id={id} className={cn("relative isolate flex min-h-[100svh] items-end overflow-hidden bg-surface pb-14 pt-[46vh] lg:pt-[57vh]", className)}>
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE.outExpo }}
          className="absolute inset-x-0 top-0 -z-20 h-full lg:-top-[18vh] lg:h-[118vh] [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
        >
          {media}
        </motion.div>
        <Container className="relative">{content}</Container>
        {overlay && <div className="pointer-events-none absolute inset-0 [&_*]:pointer-events-auto"><Container className="relative h-full">{overlay}</Container></div>}
      </section>
    );
  }

  return (
    <section id={id} className={cn("relative overflow-hidden pb-12 pt-32 md:pb-16 md:pt-40", className)}>
      <StudioBackground />
      <Container className={cn("relative", !stack && "grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16")}>
        {content}
        {visual && (
          <Reveal preset="riseIn" delay={0.45} className={cn("relative", stack ? "mt-14 md:mt-20" : "flex justify-center lg:justify-end")}>
            {visual}
          </Reveal>
        )}
      </Container>
    </section>
  );
}
