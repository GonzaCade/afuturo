import type { ReactNode } from "react";
import { Logo } from "../brand/Logo";
import { Container } from "./Section";
import { Reveal } from "../../animations/Reveal";
import { Label } from "../ui/Typography";

export interface FooterProps {
  clientName?: string;
  columns?: { title: string; links: { label: string; href: string }[] }[];
  note?: ReactNode;
  /** Línea grande de cierre. */
  bigText?: string;
  year?: number;
  /** Contenido extra arriba de las columnas (p. ej. suscripción). */
  children?: ReactNode;
}

/** Footer: columnas de links, wordmark gigante en tinta y firma A Futuro. */
export function Footer({ clientName, columns = [], note, bigText, year = new Date().getFullYear(), children }: FooterProps) {
  const big = bigText ?? clientName ?? "A Futuro";
  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface pt-16 md:pt-20">
      <Container>
        {children && <div className="mb-16">{children}</div>}
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))]">
          <Reveal>
            <Logo size={28} />
            {clientName && <p className="mt-4 font-display text-lg font-medium">{clientName}</p>}
            {note && <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-2">{note}</p>}
          </Reveal>
          {columns.map((c, i) => (
            <Reveal key={c.title} delay={0.06 * (i + 1)}>
              <Label className="mb-4 block">{c.title}</Label>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.href}><a href={l.href} className="af-focus rounded-sm text-sm text-ink-2 transition-colors hover:text-ink">{l.label}</a></li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal preset="clipUp" className="mt-16 pb-1">
          <div className="select-none text-center font-display text-[17vw] font-medium leading-[0.85] tracking-[-0.05em] text-ink/[0.06] md:text-[12vw]">
            {big}
          </div>
        </Reveal>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-line py-6 text-[12px] text-ink-3 md:flex-row">
          <span>© {year} {clientName ?? "A Futuro"}. Todos los derechos reservados.</span>
          <span className="inline-flex items-center gap-2">Diseñado y desarrollado por <Logo size={16} /><span className="sr-only">A Futuro</span></span>
        </div>
      </Container>
    </footer>
  );
}
