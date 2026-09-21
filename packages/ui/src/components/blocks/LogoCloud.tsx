import type { ReactNode } from "react";
import { Marquee } from "../../animations/Marquee";
import { Reveal } from "../../animations/Reveal";
import { Mono } from "../ui/Typography";
import { Container } from "../layout/Section";

export interface LogoCloudProps {
  /** Logos como nodos (img/svg) o strings (se muestran como wordmarks). */
  logos: (ReactNode | string)[];
  label?: string;
  className?: string;
}

/** Cinta de logos de clientes/partners/tecnologías. */
export function LogoCloud({ logos, label = "Confían en nosotros", className }: LogoCloudProps) {
  return (
    <div className={className}>
      <Container>
        <Reveal className="mb-8 text-center"><Mono>{label}</Mono></Reveal>
      </Container>
      <Reveal delay={0.1}>
        <Marquee duration={35} gap="4rem">
          {logos.map((l, i) => (
            <span key={i} className="flex h-10 items-center text-2xl font-semibold tracking-tight text-paper/40 grayscale transition duration-500 hover:text-paper hover:grayscale-0 [&_img]:h-8 [&_img]:opacity-60 [&_svg]:h-8">
              {l}
            </span>
          ))}
        </Marquee>
      </Reveal>
    </div>
  );
}
