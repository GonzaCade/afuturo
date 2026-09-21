import type { ReactNode } from "react";
import { Logo } from "../brand/Logo";
import { Container } from "./Section";
import { Reveal } from "../../animations/Reveal";
import { Mono } from "../ui/Typography";

export interface FooterProps {
  clientName?: string;
  columns?: { title: string; links: { label: string; href: string }[] }[];
  /** Texto legal / tagline. */
  note?: ReactNode;
  /** Línea grande de cierre (p. ej. el nombre del cliente enorme). */
  bigText?: string;
  year?: number;
}

/** Footer con wordmark gigante (cierre cinemático) + columnas de links + firma A Futuro. */
export function Footer({ clientName, columns = [], note, bigText, year = new Date().getFullYear() }: FooterProps) {
  const big = bigText ?? clientName ?? "A Futuro";
  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface-0 pt-20">
      <Container>
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))]">
          <Reveal>
            <Logo size={34} wordmark={!clientName} />
            {clientName && <p className="mt-4 font-display text-xl font-semibold">{clientName}</p>}
            {note && <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{note}</p>}
          </Reveal>
          {columns.map((c, i) => (
            <Reveal key={c.title} delay={0.08 * (i + 1)}>
              <Mono className="mb-5 block text-paper/70">{c.title}</Mono>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l.href}><a href={l.href} className="text-sm text-muted transition-colors hover:text-paper">{l.label}</a></li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal preset="clipUp" className="mt-20 pb-2">
          <div className="select-none text-center font-display text-[18vw] font-bold leading-[0.85] tracking-[-0.05em] text-gradient opacity-90 md:text-[13vw]">
            {big}
          </div>
        </Reveal>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-line py-8 text-xs text-subtle md:flex-row">
          <span>© {year} {clientName ?? "A Futuro"}. Todos los derechos reservados.</span>
          <span className="inline-flex items-center gap-2">Diseñado y desarrollado por <Logo size={16} wordmark className="text-paper" /></span>
        </div>
      </Container>
    </footer>
  );
}
