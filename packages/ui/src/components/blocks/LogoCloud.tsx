import type { ReactNode } from "react";
import { Marquee } from "../../animations/Marquee";
import { Reveal } from "../../animations/Reveal";
import { Label } from "../ui/Typography";
import { Container } from "../layout/Section";

export interface LogoCloudProps {
  logos: (ReactNode | string)[];
  label?: string;
  className?: string;
}

/** Cinta de logos en gris neutro; color al hover. */
export function LogoCloud({ logos, label = "Confían en nosotros", className }: LogoCloudProps) {
  return (
    <div className={className}>
      <Container>
        <Reveal className="mb-6 text-center"><Label>{label}</Label></Reveal>
      </Container>
      <Reveal delay={0.1}>
        <Marquee duration={35} gap="4rem">
          {logos.map((l, i) => (
            <span key={i} className="flex h-10 items-center font-display text-xl font-medium tracking-[-0.02em] text-ink-3 transition-colors duration-300 hover:text-ink [&_img]:h-7 [&_img]:opacity-50 [&_svg]:h-7">
              {l}
            </span>
          ))}
        </Marquee>
      </Reveal>
    </div>
  );
}
