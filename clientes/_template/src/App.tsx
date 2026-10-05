import { Zap, ShieldCheck, Smartphone, LineChart } from "lucide-react";
import {
  SmoothScroll, Navbar, Hero, FeatureGrid, Showcase, Stats, Steps, Testimonials, Pricing, FAQ, CTA, Footer,
  IPhone17ProMax, ProductStage, Surface, Label, Metric, MiniChart, StatusPill, ICON,
} from "@afuturo/ui";
import { cliente } from "./cliente";

/** Pantalla de la app del cliente para mostrar dentro del iPhone. Reemplazar por capturas reales o UI. */
function AppScreen() {
  return (
    <div className="af-studio h-full w-full px-5 pt-[74px] text-ink">
      <Label>{cliente.nombre}</Label>
      <div className="mt-1 font-display text-[26px] font-medium tracking-[-0.03em]">Hoy</div>
      <Surface padding="sm" radius="lg" className="mt-5">
        <Label>Pedidos</Label>
        <div className="mt-1 font-display text-[44px] font-medium tabular-nums tracking-[-0.03em] text-accent">24</div>
        <MiniChart data={[4, 7, 6, 9, 8, 12, 11, 14]} type="area" height={48} />
      </Surface>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <Metric label="Ventas" value="18.4k" prefix="$ " size="sm" />
        <Metric label="Clientes" value={132} size="sm" countUp={false} />
      </div>
      <div className="mt-3 space-y-2">{[1, 2, 3].map((i) => <Surface key={i} padding="xs" radius="md" className="h-14" />)}</div>
    </div>
  );
}

export function App() {
  return (
    <SmoothScroll>
      <Navbar clientName={cliente.nombre} links={cliente.nav} cta={{ label: "Quiero una demo", href: "#cta" }} />

      <Hero
        layout="split"
        eyebrow={cliente.rubro}
        title={cliente.tagline}
        subtitle={cliente.descripcion}
        primaryCta={{ label: "Quiero una demo", href: "#cta" }}
        secondaryCta={{ label: "Ver beneficios", href: "#beneficios" }}
        visual={
          <ProductStage aspect="4 / 5" className="w-full max-w-[520px]" label={<StatusPill state="live" variant="glass">En producción</StatusPill>}>
            <IPhone17ProMax width={300} color="silver" tilt float><AppScreen /></IPhone17ProMax>
          </ProductStage>
        }
      />

      <FeatureGrid
        id="beneficios"
        heading={{ eyebrow: "Beneficios", title: "Todo lo que tu negocio necesita, en un solo lugar.", highlight: "en un solo lugar" }}
        features={[
          { icon: <Zap {...ICON} />, title: "Rápido", body: "Operá en segundos, sin fricción." },
          { icon: <Smartphone {...ICON} />, title: "Mobile", body: "Funciona perfecto desde el celular." },
          { icon: <LineChart {...ICON} />, title: "Métricas", body: "Mirá cómo crece tu negocio en tiempo real." },
          { icon: <ShieldCheck {...ICON} />, title: "Seguro", body: "Datos protegidos y respaldados." },
        ]}
        columns={4}
      />

      <Showcase
        id="producto"
        items={[
          { eyebrow: "Producto", title: "Explicá la feature principal con un visual grande.", body: "Un párrafo corto y bullets concretos.", bullets: ["Beneficio uno", "Beneficio dos", "Beneficio tres"], visual: <IPhone17ProMax width={300} color="silver"><AppScreen /></IPhone17ProMax> },
        ]}
      />

      <Stats stats={[{ value: 1200, suffix: "+", label: "Usuarios" }, { value: 98, suffix: " %", label: "Satisfacción", live: true }, { value: 3, suffix: " min", label: "Para empezar" }]} />

      <Steps heading={{ eyebrow: "Cómo funciona", title: "En tres pasos." }} steps={[{ title: "Registrate", body: "Creá tu cuenta en un minuto." }, { title: "Configurá", body: "Cargá tus productos o servicios." }, { title: "Vendé", body: "Empezá a operar hoy mismo." }]} />

      <Testimonials items={[{ quote: "Cambió la forma en que trabajamos.", name: "Cliente feliz", role: "Dueño", rating: 5 }, { quote: "Simple y rápido.", name: "Otra persona", role: "Encargada", rating: 5 }]} />

      <Pricing id="planes" heading={{ eyebrow: "Planes", title: "Elegí tu plan." }} plans={[
        { name: "Inicial", price: "$ 0", period: "mes", features: ["Hasta 50 pedidos", "1 usuario"], cta: { label: "Empezar gratis", href: "#cta" } },
        { name: "Pro", price: "$ 29", period: "mes", features: ["Ilimitado", "5 usuarios", "Reportes"], cta: { label: "Elegir Pro", href: "#cta" }, featured: true, badge: "Popular" },
      ]} />

      <FAQ id="faq" heading={{ eyebrow: "FAQ", title: "Preguntas frecuentes." }} items={[{ q: "¿Necesito instalar algo?", a: "No, funciona desde el navegador y el celular." }, { q: "¿Puedo cancelar cuando quiera?", a: "Sí, sin permanencia." }]} />

      <CTA id="cta" title="Empezá hoy." subtitle="Escribinos y te mostramos una demo personalizada." primary={{ label: "Hablar por WhatsApp", href: cliente.contacto.whatsapp }} secondary={{ label: "Enviar email", href: `mailto:${cliente.contacto.email}` }} />

      <Footer clientName={cliente.nombre} note={cliente.descripcion} columns={[{ title: "Sitio", links: cliente.nav }]} />
    </SmoothScroll>
  );
}
