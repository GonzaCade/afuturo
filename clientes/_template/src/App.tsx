import { Zap, ShieldCheck, Smartphone, LineChart } from "lucide-react";
import {
  SmoothScroll, Navbar, Hero, FeatureGrid, Showcase, Stats, Testimonials, Pricing, FAQ, CTA, Footer, Steps,
  IPhone17ProMax, Mono, Logo,
} from "@afuturo/ui";
import { cliente } from "./cliente";

/** Pantalla de la app del cliente para mostrar dentro del iPhone. Reemplazar por capturas reales o UI. */
function AppScreen() {
  return (
    <div className="h-full w-full bg-surface-1 px-6 pt-[72px] text-paper">
      <Mono className="text-[10px]">{cliente.nombre}</Mono>
      <div className="mt-1 font-display text-[28px] font-semibold tracking-tight">{cliente.tagline}</div>
      <div className="mt-6 rounded-[28px] af-gradient p-6 text-white"><div className="font-display text-[56px] font-semibold leading-none">24</div><Mono className="text-white/70">pedidos hoy</Mono></div>
      <div className="mt-4 space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-16 rounded-[22px] border border-line bg-surface-2" />)}</div>
    </div>
  );
}

export function App() {
  return (
    <SmoothScroll>
      <Navbar clientName={cliente.nombre} links={cliente.nav} cta={{ label: "Quiero una demo", href: "#cta" }} />

      <Hero
        eyebrow={cliente.rubro}
        title={cliente.tagline}
        subtitle={cliente.descripcion}
        primaryCta={{ label: "Quiero una demo", href: "#cta" }}
        secondaryCta={{ label: "Ver beneficios", href: "#beneficios" }}
        visual={<IPhone17ProMax width={340} color="deep-blue" tilt float><AppScreen /></IPhone17ProMax>}
      />

      <FeatureGrid
        id="beneficios"
        heading={{ eyebrow: "Beneficios", title: "Todo lo que tu negocio necesita, en un solo lugar", highlight: "en un solo lugar" }}
        features={[
          { icon: <Zap />, title: "Rápido", body: "Operá en segundos, sin fricción." },
          { icon: <Smartphone />, title: "Mobile", body: "Funciona perfecto desde el celular." },
          { icon: <LineChart />, title: "Métricas", body: "Mirá cómo crece tu negocio en tiempo real." },
          { icon: <ShieldCheck />, title: "Seguro", body: "Datos protegidos y respaldados." },
        ]}
        columns={4}
      />

      <Showcase
        id="producto"
        items={[
          { eyebrow: "Producto", title: "Explicá la feature principal con un visual grande", body: "Un párrafo corto y bullets concretos.", bullets: ["Beneficio uno", "Beneficio dos", "Beneficio tres"], visual: <IPhone17ProMax width={300} color="silver"><AppScreen /></IPhone17ProMax> },
        ]}
      />

      <Stats stats={[{ value: 1200, suffix: "+", label: "Usuarios" }, { value: 98, suffix: "%", label: "Satisfacción" }, { value: 3, suffix: " min", label: "Para empezar" }]} />

      <Steps heading={{ eyebrow: "Cómo funciona", title: "En tres pasos" }} steps={[{ title: "Registrate", body: "Creá tu cuenta en un minuto." }, { title: "Configurá", body: "Cargá tus productos o servicios." }, { title: "Vendé", body: "Empezá a operar hoy mismo." }]} />

      <Testimonials items={[{ quote: "Cambió la forma en que trabajamos.", name: "Cliente feliz", role: "Dueño", rating: 5 }, { quote: "Simple y rápido.", name: "Otra persona", role: "Encargada", rating: 5 }]} />

      <Pricing id="planes" heading={{ eyebrow: "Planes", title: "Elegí tu plan" }} plans={[
        { name: "Inicial", price: "$0", period: "mes", features: ["Hasta 50 pedidos", "1 usuario"], cta: { label: "Empezar gratis", href: "#cta" } },
        { name: "Pro", price: "$29", period: "mes", features: ["Ilimitado", "5 usuarios", "Reportes"], cta: { label: "Elegir Pro", href: "#cta" }, featured: true, badge: "Popular" },
      ]} />

      <FAQ id="faq" heading={{ eyebrow: "FAQ", title: "Preguntas frecuentes" }} items={[{ q: "¿Necesito instalar algo?", a: "No, funciona desde el navegador y el celular." }, { q: "¿Puedo cancelar cuando quiera?", a: "Sí, sin permanencia." }]} />

      <CTA id="cta" title="Empezá hoy" subtitle="Escribinos y te mostramos una demo personalizada." primary={{ label: "Hablar por WhatsApp", href: cliente.contacto.whatsapp }} secondary={{ label: "Enviar email", href: `mailto:${cliente.contacto.email}` }} />

      <Footer clientName={cliente.nombre} note={cliente.descripcion} columns={[{ title: "Sitio", links: cliente.nav }]} />
      <span className="sr-only"><Logo /></span>
    </SmoothScroll>
  );
}
