import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Surface, Label, Button, Reveal, ICON } from "@afuturo/ui";
import estatua from "../assets/footer-suscription.webp";

/** Bloque de suscripción para el footer: imagen + un solo campo. */
export function Suscripcion() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  return (
    <Reveal>
      <Surface padding="none" radius="2xl" className="grid overflow-hidden md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="relative min-h-[240px] overflow-hidden bg-ink">
          <img src={estatua} alt="Estatua clásica con anteojos 3D y pochoclos en un cine" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="flex flex-col justify-center gap-6 p-7 md:p-10">
          <div>
            <Label>Newsletter</Label>
            <h3 className="mt-3 text-display-sm font-medium text-ink">Una idea por semana para modernizar tu negocio.</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-2">Sin spam, sin relleno. Lo que aprendemos automatizando y diseñando para negocios reales, en cinco minutos de lectura.</p>
          </div>
          {ok ? (
            <div className="flex items-center gap-2 text-sm font-medium text-ink"><span className="inline-flex size-6 items-center justify-center rounded-full bg-accent text-white"><Check size={13} strokeWidth={2.4} /></span>Listo. Te escribimos el próximo martes.</div>
          ) : (
            <form className="flex flex-wrap gap-2" onSubmit={(e) => { e.preventDefault(); if (email) setOk(true); }}>
              <label htmlFor="email" className="sr-only">Email</label>
              <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" className="af-inset af-focus h-12 min-w-[220px] flex-1 rounded-full px-5 text-sm text-ink placeholder:text-ink-3" />
              <Button type="submit" size="lg" icon={<ArrowRight {...ICON} />}>Suscribirme</Button>
            </form>
          )}
        </div>
      </Surface>
    </Reveal>
  );
}
