import { Zap, Sparkles, Store, Bot, PackageCheck, Palette, Globe, Code2, ShieldCheck, Banknote, MapPin, Clock } from "lucide-react";
import {
  SmoothScroll, Navbar, Hero, Showcase, Stats, Steps, FeatureGrid, FAQ, CTA, Footer,
  Section, SectionHeading, GlassPanel, Surface, StatusPill, Label, ProductCard, Button, Reveal, Stagger, fadeUp, ICON,
} from "@afuturo/ui";
import { motion } from "motion/react";
import { OsDemo, ComponentStrip } from "./sections/OsDemo";
import { Suscripcion } from "./sections/Suscripcion";
import { HeroMedia } from "./sections/HeroMedia";

import zoomImg from "./assets/girl-zoom.webp";
import playaImg from "./assets/ingresos-pasivos.webp";
import dardoImg from "./assets/dardo-dinero.webp";
import tecnologiaImg from "./assets/19-tecnologia.png";
import asesoriasImg from "./assets/25-asesorias-y-clases.png";
import fotoImg from "./assets/26-fotografia-y-video.png";
import edicionImg from "./assets/27-edicion-y-redes-sociales.png";

const CONTACTO = "mailto:hola@afuturo.dev";

const NAV = [
  { label: "Servicios", href: "#servicios" },
  { label: "Productos", href: "#productos" },
  { label: "Estudio", href: "#estudio" },
  { label: "Proceso", href: "#proceso" },
  { label: "Precios", href: "#precios" },
];

const SERVICIOS = [
  { image: tecnologiaImg, title: "Automatizaciones y software", description: "Automatizaciones con IA, mejoras de procesos, sistemas web, apps y software a medida.", tag: "01" },
  { image: asesoriasImg, title: "Marca y marketing", description: "Diseño de marca, rebranding y estrategias de marketing con un criterio claro.", tag: "02" },
  { image: fotoImg, title: "Imagen y audiovisual", description: "Edición de imagen y video, contenido para redes y restauración de fotos antiguas.", tag: "03" },
  { image: edicionImg, title: "Landings y productos digitales", description: "Onepages express, landing pages y productos digitales que cargan rápido y se entienden solos.", tag: "04" },
];

const PRODUCTOS = [
  { icon: <Store {...ICON} />, title: "Sistema de gestión de negocios", body: "Caja chica, menú, stock, envíos, atención por WhatsApp, generador de comandas e integración con Mercado Pago. Todo en un panel que se entiende de un vistazo.", wide: true },
  { icon: <Bot {...ICON} />, title: "Empleado artificial", body: "IA ultrarrealista para atención al público: responde en tiempo real por WhatsApp o redes y genera pedidos conectados a tu sistema." },
  { icon: <PackageCheck {...ICON} />, title: "Automatización mecánica", body: "Cintas transportadoras para la gestión de paquetes, conectadas al sistema de gestión del negocio." },
  { icon: <Palette {...ICON} />, title: "Rebranding de marcas", body: "Mejora de diseños, conceptos, logos, visión y estética. Tu marca, puesta al día." },
  { icon: <Globe {...ICON} />, title: "Onepages express", body: "Páginas personalizadas con esta misma estética, generadas en el momento: carga optimizada, imágenes mejoradas y contacto directo por WhatsApp." },
  { icon: <Code2 {...ICON} />, title: "Software a medida", body: "Diseñado desde cero para cubrir necesidades específicas que el mercado no ofrece.", wide: true },
];

export function App() {
  return (
    <SmoothScroll>
      <Navbar links={NAV} cta={{ label: "Contanos tu idea", href: "#cta" }} />

      <Hero
        layout="cover"
        media={<HeroMedia />}
        title="Si lo imaginas se puede hacer realidad_"
        highlight="se puede hacer realidad_"
        primaryCta={{ label: "Contanos tu idea", href: "#cta" }}
      />

      {/* ------------------ SERVICIOS ------------------ */}
      <Section id="servicios">
        <SectionHeading eyebrow="Servicios" title="Siete servicios, un mismo criterio." highlight="un mismo criterio" subtitle="Diseño de marca, landing pages, automatizaciones, mejoras de procesos, productos digitales, estrategias de marketing y edición de imagen y audiovisuales. Todo con la misma prioridad: fluidez, carga rápida y una estética simple, futurista e intuitiva." />
        <Stagger className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {SERVICIOS.map((s) => (
            <motion.div key={s.title} variants={fadeUp}>
              <ProductCard {...s} href="#cta" alt={s.title} aspect="1 / 1" />
            </motion.div>
          ))}
        </Stagger>
      </Section>

      {/* ------------------ SISTEMA DE GESTIÓN · EMPLEADO ARTIFICIAL ------------------ */}
      <Showcase
        items={[
          {
            eyebrow: "Sistema de gestión de negocios",
            title: "Tu negocio cobra, despacha y atiende aunque vos no estés.",
            body: "Caja chica, menú, stock, envíos, comandas y atención por WhatsApp en un solo sistema, con Mercado Pago integrado. Lo armamos para que funcione sin vos encima.",
            bullets: ["Mercado Pago y transferencias desde el día uno", "Comandas y stock que se actualizan solos", "Atención por WhatsApp conectada a los pedidos"],
            cta: { label: "Ver el sistema", href: "#producto" },
            visual: (
              <div className="relative mx-auto w-full max-w-[420px]">
                <Surface padding="none" radius="2xl" variant="float" className="overflow-hidden" style={{ aspectRatio: "3 / 4" }}>
                  <img src={playaImg} alt="Celular sobre una mesa en la playa recibiendo notificaciones de ingresos" className="h-full w-full object-cover" loading="lazy" />
                </Surface>
                <Reveal delay={0.5} className="absolute -left-4 top-8 md:-left-10">
                  <GlassPanel padding="xs" radius="md" className="flex items-center gap-3 pr-4">
                    <span className="inline-flex size-9 items-center justify-center rounded-sm bg-accent-50 text-accent"><Zap {...ICON} /></span>
                    <div><div className="text-[13px] font-medium">Ingreso de dinero</div><div className="font-mono text-[12px] tabular-nums text-ink-2">+ $ 23.990 · 18:54</div></div>
                  </GlassPanel>
                </Reveal>
              </div>
            ),
          },
          {
            eyebrow: "Empleado artificial",
            title: "Una IA que atiende, responde y toma pedidos en tiempo real.",
            body: "Ultrarrealista en el trato y conectada a tu sistema: responde por WhatsApp o redes sociales, resuelve consultas y genera pedidos sin que nadie tenga que estar mirando el teléfono.",
            bullets: ["WhatsApp y redes sociales, 24 horas", "Respuesta en tiempo real con tu tono de marca", "Pedidos que entran directo al sistema de gestión"],
            visual: (
              <Surface padding="none" radius="2xl" variant="float" className="mx-auto w-full max-w-[560px] overflow-hidden" style={{ aspectRatio: "16 / 10" }}>
                <img src={zoomImg} alt="Primer plano de un visor iridiscente reflejando luz" className="h-full w-full object-cover object-[50%_40%]" loading="lazy" />
                <StatusPill variant="glass" state="live" icon={<Sparkles />} className="absolute left-5 top-5">Atendiendo ahora</StatusPill>
              </Surface>
            ),
          },
        ]}
      />

      {/* ------------------ PRODUCTO (demo OS) ------------------ */}
      <Section id="producto" spacing="lg" size="xl">
        <SectionHeading eyebrow="Así se siente" title="Fluido, rápido, simple y futurista." highlight="simple y futurista" subtitle="Así priorizamos cada sistema: fluidez, carga rápida y una estética que se entiende sin manual. Esta demo del sistema de gestión es real: cambiá el período, mové el slider, prendé y apagá dispositivos." />
        <OsDemo />
        <div className="mt-6"><ComponentStrip /></div>
      </Section>

      {/* ------------------ PRODUCTOS PROPIOS ------------------ */}
      <FeatureGrid
        id="productos"
        bento
        tone="surface"
        heading={{ eyebrow: "Productos propios", title: "Seis productos que ya resolvieron el problema.", highlight: "ya resolvieron", subtitle: "Los desarrollamos nosotros, los usan negocios reales y se adaptan a tu marca en semanas. Si ninguno encaja, el último es el camino." }}
        features={PRODUCTOS}
      />

      {/* ------------------ ESTUDIO ------------------ */}
      <Section id="estudio" spacing="lg">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <Reveal preset="riseIn" className="order-2 lg:order-1">
            <Surface padding="none" radius="2xl" variant="secondary" className="af-studio-inner relative mx-auto flex max-w-[460px] items-center justify-center overflow-hidden" style={{ aspectRatio: "3 / 4" }}>
              <img src={dardoImg} alt="Un billete enrollado clavado en el centro de un blanco de dardos" className="h-full w-full object-cover" loading="lazy" />
              <StatusPill variant="glass" icon={<MapPin />} className="absolute left-5 top-5">Castelar, Buenos Aires</StatusPill>
            </Surface>
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeading eyebrow="El estudio" title="Desde 2016, más de 50 proyectos en el centro." highlight="en el centro" subtitle="Páginas web, excels automatizados, agentes conversacionales por WhatsApp y redes, onepages, edición de video, logos, sistemas web para empresas, apps móviles, videojuegos, restauración de imágenes antiguas. Rubros distintos, el mismo criterio." className="mb-8" />
            <Stats inline stats={[{ value: 50, suffix: "+", label: "Proyectos realizados", live: true }, { value: 10, label: "Años haciendo software", suffix: " a" }, { value: 7, label: "Servicios" }]} />
            <Reveal delay={0.2} className="mt-10 grid gap-3 sm:grid-cols-2">
              <Surface padding="sm" radius="lg" className="flex gap-3">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-sm bg-surface-3 text-ink-2"><ShieldCheck {...ICON} /></span>
                <div><div className="text-sm font-medium text-ink">Contrato de confidencialidad</div><p className="mt-1 text-[13px] leading-relaxed text-ink-2">Tu idea, tus datos y tu operación quedan protegidos desde la primera reunión.</p></div>
              </Surface>
              <Surface padding="sm" radius="lg" className="flex gap-3">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-sm bg-surface-3 text-ink-2"><Sparkles {...ICON} /></span>
                <div><div className="text-sm font-medium text-ink">Formación aplicada</div><p className="mt-1 text-[13px] leading-relaxed text-ink-2">Business Analysis, Técnico en Informática, Automatizaciones con IA y Marketing. Un estudio compacto: quien diseña es quien construye.</p></div>
              </Surface>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ------------------ PROCESO ------------------ */}
      <Steps
        id="proceso"
        heading={{ eyebrow: "Proceso", title: "De la idea al lanzamiento en tres pasos.", highlight: "tres pasos" }}
        steps={[
          { title: "Diagnóstico", body: "Firmamos confidencialidad, entendemos el negocio y el proceso, y definimos qué conviene: un producto propio o algo a medida. Una reunión, una propuesta." },
          { title: "Diseño vivo", body: "Prototipo animado en desktop y en el teléfono, con esta estética. Lo probás antes de que exista y ajustamos sobre lo real." },
          { title: "Lanzamiento", body: "Producción, puesta en marcha y evolución. Nos quedamos para que siga funcionando y creciendo." },
        ]}
      />

      {/* ------------------ PRECIOS ------------------ */}
      <Section id="precios" tone="surface">
        <SectionHeading eyebrow="Precios" title="Competitivos en Argentina, claros desde el primer día." highlight="claros" subtitle="Cada proyecto se cotiza según alcance, con el precio cerrado antes de empezar. Sin sorpresas al final." />
        <Stagger className="grid gap-4 md:grid-cols-3">
          {[
            { icon: <Banknote {...ICON} />, title: "En pesos o en dólares", body: "Pagás en pesos argentinos, o en dólares tomando como referencia el dólar compra del Banco Nación del día." },
            { icon: <Clock {...ICON} />, title: "Cotización en 48 horas", body: "Contanos tu idea y recibís una propuesta con alcance, tiempos y precio. Los productos propios salen más rápido y más baratos que lo hecho desde cero." },
            { icon: <ShieldCheck {...ICON} />, title: "Confidencialidad incluida", body: "Contrato de confidencialidad en todos los proyectos, sin costo extra. Lo que nos contás no sale del estudio." },
          ].map((p) => (
            <motion.div key={p.title} variants={fadeUp}>
              <Surface padding="md" className="flex h-full flex-col">
                <span className="mb-5 inline-flex size-10 items-center justify-center rounded-md bg-surface-3 text-ink">{p.icon}</span>
                <h3 className="text-lg font-medium tracking-[-0.02em] text-ink">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{p.body}</p>
              </Surface>
            </motion.div>
          ))}
        </Stagger>
        <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-surface-2 px-6 py-5">
          <div><Label>Para empezar</Label><p className="mt-1 text-[15px] text-ink">Una onepage express se cotiza en el día; un sistema de gestión, en 48 horas.</p></div>
          <Button href="#cta" arrow>Pedir cotización</Button>
        </Reveal>
      </Section>

      <FAQ
        heading={{ eyebrow: "Preguntas", title: "Lo que nos preguntan antes de empezar." }}
        items={[
          { q: "¿Qué significa \"hacer realidad\" una idea?", a: "Tomar lo que ya hacés (o lo que querés hacer) y resolverlo con tecnología actual: automatizar lo repetitivo, ordenar procesos, darle una marca y una presencia digital que estén a la altura. Desde un Excel automatizado hasta un sistema completo con IA." },
          { q: "¿Trabajan con cualquier rubro?", a: "Sí. Desde 2016 hicimos software para gastronomía, comercios, servicios, logística, salud, educación y proyectos personales. Lo que cambia es el proceso del negocio; el criterio es el mismo." },
          { q: "¿Cómo se paga?", a: "En pesos argentinos o en dólares, tomando como referencia el dólar compra del Banco Nación. El precio queda cerrado por escrito antes de empezar." },
          { q: "¿Firman confidencialidad?", a: "Siempre. Todos los proyectos arrancan con un contrato de confidencialidad, sin costo extra." },
          { q: "¿Dónde están?", a: "En Castelar, Buenos Aires. Trabajamos de forma remota con todo el país y presencial en zona oeste cuando el proyecto lo pide." },
        ]}
      />

      <CTA
        id="cta"
        title="¿Hacemos realidad tu idea?"
        subtitle="Contanos qué hace tu negocio y qué te gustaría que haga solo. Te devolvemos una propuesta con alcance, tiempos y precio, y una demo como la de arriba."
        primary={{ label: "Contanos tu idea", href: CONTACTO }}
        secondary={{ label: "Ver servicios", href: "#servicios" }}
      />

      <Footer
        note="Estudio de modernización digital en Castelar, Buenos Aires. Desde 2016 hacemos software, marca y automatizaciones para negocios y empresas de todos los rubros."
        columns={[
          { title: "Estudio", links: [{ label: "Servicios", href: "#servicios" }, { label: "Productos", href: "#productos" }, { label: "El estudio", href: "#estudio" }] },
          { title: "Trabajar", links: [{ label: "Proceso", href: "#proceso" }, { label: "Precios", href: "#precios" }, { label: "Contacto", href: "#cta" }] },
        ]}
      >
        <Suscripcion />
      </Footer>
    </SmoothScroll>
  );
}
