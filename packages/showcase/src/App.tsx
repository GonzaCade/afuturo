import { Sparkles, Boxes, Zap, ShieldCheck, Smartphone, LineChart, Cpu, Palette } from "lucide-react";
import { motion } from "motion/react";
import {
  SmoothScroll, Navbar, Hero, FeatureGrid, Showcase, Stats, Testimonials, Pricing, FAQ, CTA, Footer, LogoCloud, Steps,
  Section, SectionHeading, Button, Badge, Card, CardIcon, GradientText, Mono, Logo, Orb,
  IPhone17ProMax, StatusBar, PinnedSequence, Reveal, Stagger, TextReveal, Parallax, Marquee, CountUp, Tilt, Magnetic,
  fadeUp,
} from "@afuturo/ui";

/* ------------------------------------------------------------------ */
/*  Pantalla demo para el iPhone (una "app" hecha con el design system) */
/* ------------------------------------------------------------------ */
function DemoScreen({ accent = "primary" }: { accent?: "primary" | "ember" }) {
  return (
    <div className="relative h-full w-full bg-surface-1 px-6 pt-[70px] text-paper">
      <div className="flex items-center justify-between">
        <div>
          <Mono className="text-[10px]">Hola, Gonzalo</Mono>
          <div className="mt-1 font-display text-[28px] font-semibold tracking-tight">Tu día</div>
        </div>
        <Logo size={34} />
      </div>
      <div className="mt-6 rounded-[28px] af-gradient p-6 text-white shadow-glow-sm">
        <Mono className="text-[10px] text-white/70">Score</Mono>
        <div className="mt-2 font-display text-[64px] font-semibold leading-none">86</div>
        <div className="mt-3 h-1.5 w-full rounded-full bg-white/25"><div className="h-full w-[86%] rounded-full bg-white" /></div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {[["Ventas", "+18%"], ["Pedidos", "342"], ["Clientes", "1.2k"], ["NPS", "72"]].map(([k, v]) => (
          <div key={k} className="rounded-[22px] border border-line bg-surface-2 p-4">
            <Mono className="text-[10px]">{k}</Mono>
            <div className={`mt-1 font-display text-[24px] font-semibold ${accent === "ember" ? "text-ember-400" : "text-primary-300"}`}>{v}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-[22px] border border-line bg-surface-2 p-4">
        <Mono className="text-[10px]">Actividad</Mono>
        <div className="mt-3 flex h-20 items-end gap-1.5">
          {[30, 55, 40, 70, 60, 90, 75, 50, 65, 85, 45, 95].map((h, i) => (
            <div key={i} className="flex-1 rounded-full af-gradient" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex h-[90px] items-start justify-around border-t border-line bg-surface-1/90 pt-3 backdrop-blur">
        {[Sparkles, LineChart, Boxes, Cpu].map((I, i) => <I key={i} className={`size-6 ${i === 0 ? "text-primary-400" : "text-subtle"}`} />)}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Página                                                              */
/* ------------------------------------------------------------------ */
export function App() {
  return (
    <SmoothScroll>
      <Navbar
        links={[
          { label: "Sistema", href: "#sistema" },
          { label: "Componentes", href: "#componentes" },
          { label: "Animaciones", href: "#animaciones" },
          { label: "Mobile", href: "#mobile" },
          { label: "Paquetes", href: "#paquetes" },
        ]}
        cta={{ label: "Empezar", href: "#cta" }}
      />

      <Hero
        eyebrow="Design system v0.1"
        title="Software que se adelanta a tu negocio"
        highlight="se adelanta"
        subtitle="A Futuro construye productos empaquetados para cada tipo de cliente: rápidos de lanzar, hermosos de usar y listos para escalar."
        primaryCta={{ label: "Ver componentes", href: "#componentes" }}
        secondaryCta={{ label: "Cómo trabajamos", href: "#proceso" }}
        proof={
          <span className="flex items-center gap-3">
            <span className="flex -space-x-2">{[0, 1, 2, 3].map((i) => <span key={i} className="size-7 rounded-full border-2 border-ink af-gradient" style={{ animationDelay: `${i * -2}s` }} />)}</span>
            <span>+40 productos lanzados en LATAM</span>
          </span>
        }
        visual={
          <div className="relative">
            <Orb className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" size={700} intensity={0.5} />
            <IPhone17ProMax width={340} color="deep-blue" tilt float><DemoScreen /></IPhone17ProMax>
          </div>
        }
      />

      <LogoCloud className="py-14" logos={["Pulso", "Nimbus", "Orbital", "Kairos", "Vanta", "Helix", "Atlas", "Lumen"]} label="Marcas que ya viven a futuro" />

      {/* ------------------ TOKENS ------------------ */}
      <Section id="sistema" ambient>
        <SectionHeading eyebrow="Sistema" title="Una identidad, infinitos productos" highlight="infinitos productos" subtitle="Tokens de color, tipografía, radios y easing pensados para que cada onepage de cliente se sienta parte de la misma familia." />
        <Stagger className="grid gap-5 md:grid-cols-3">
          <motion.div variants={fadeUp}>
            <Card variant="gradient" padding="lg" className="flex h-full min-h-[280px] flex-col justify-end">
              <Mono className="text-white/70">Primario · gradiente vivo</Mono>
              <div className="mt-2 font-display text-2xl font-semibold">#39BAD0 → #0054A2</div>
              <p className="mt-2 text-sm text-white/75">Vertical, se desplaza suavemente entre ambos tonos (9 s, alternado).</p>
            </Card>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Card padding="lg" className="flex h-full min-h-[280px] flex-col justify-end bg-ember-500 text-white" variant="surface">
              <Mono className="text-white/70">Secundario · Ember</Mono>
              <div className="mt-2 font-display text-2xl font-semibold">#FF6B4A</div>
              <p className="mt-2 text-sm text-white/80">Complementario cálido y sólido. Solo para acentos: alertas, hover crítico, un CTA por página.</p>
            </Card>
          </motion.div>
          <motion.div variants={fadeUp} className="grid gap-5">
            <Card padding="md" className="bg-paper text-ink" variant="light" hover={false}>
              <Mono className="text-ink/50">Blanco</Mono>
              <div className="font-display text-xl font-semibold">#FAFAFA</div>
            </Card>
            <Card padding="md" variant="surface" hover={false} className="border-line-strong">
              <Mono>Negro</Mono>
              <div className="font-display text-xl font-semibold">#121212</div>
            </Card>
          </motion.div>
        </Stagger>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <Reveal>
            <Mono>Tipografía</Mono>
            <div className="mt-4 font-display text-display-md font-semibold">Sora <span className="text-muted">display</span></div>
            <div className="mt-2 font-sans text-2xl">Inter <span className="text-muted">texto</span></div>
            <div className="mt-2 font-mono text-lg">JetBrains Mono <span className="text-muted">labels · HUD</span></div>
          </Reveal>
          <Reveal delay={0.1}>
            <Mono>Radios · siempre redondeado</Mono>
            <div className="mt-4 flex flex-wrap gap-3">
              {(["rounded-lg", "rounded-xl", "rounded-2xl", "rounded-3xl", "rounded-4xl", "rounded-full"] as const).map((r) => (
                <div key={r} className={`flex size-20 items-center justify-center border border-line-strong bg-surface-2 font-mono text-[10px] text-muted ${r}`}>{r.replace("rounded-", "")}</div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ------------------ COMPONENTES ------------------ */}
      <Section id="componentes" tone="surface">
        <SectionHeading eyebrow="Componentes" title="Bloques listos para armar una onepage en minutos" highlight="en minutos" align="left" />
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <Mono className="mb-5 block">Botones</Mono>
            <div className="flex flex-wrap items-center gap-3">
              <Button arrow>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ember">Ember</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="glass">Glass</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button><Button size="md">Medium</Button><Button size="lg">Large</Button><Button size="xl" arrow>Extra</Button>
            </div>
            <Mono className="mb-5 mt-10 block">Badges</Mono>
            <div className="flex flex-wrap gap-3">
              <Badge dot>En vivo</Badge><Badge variant="ember">Nuevo</Badge><Badge variant="outline">Beta</Badge><Badge variant="glass" icon={<Sparkles className="size-3" />}>IA</Badge>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Mono className="mb-5 block">Cards</Mono>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card variant="glass" spotlight padding="sm"><CardIcon><Zap /></CardIcon><h4 className="font-display font-semibold">Glass + spotlight</h4><p className="mt-1 text-sm text-muted">Pasá el mouse.</p></Card>
              <Card variant="gradient-border" padding="sm"><CardIcon><ShieldCheck /></CardIcon><h4 className="font-display font-semibold">Borde gradiente</h4><p className="mt-1 text-sm text-muted">Para destacar un plan.</p></Card>
              <Card variant="light" padding="sm"><h4 className="font-display font-semibold">Light</h4><p className="mt-1 text-sm text-ink/60">Secciones claras estilo Pulso.</p></Card>
              <Tilt className="group rounded-2xl"><Card variant="surface" padding="sm" hover={false}><h4 className="font-display font-semibold">Tilt 3D</h4><p className="mt-1 text-sm text-muted">Inclinación al cursor.</p></Card></Tilt>
            </div>
          </Reveal>
        </div>
      </Section>

      <FeatureGrid
        id="features"
        bento
        heading={{ eyebrow: "FeatureGrid", title: "Grilla bento con reveal escalonado", highlight: "bento" }}
        features={[
          { icon: <Boxes />, title: "Software empaquetado", body: "Módulos probados que se combinan por vertical: gastronomía, salud, retail, servicios.", wide: true },
          { icon: <Zap />, title: "Lanzamiento en semanas", body: "Del brief a producción sin fricción." },
          { icon: <Smartphone />, title: "Mobile first", body: "Cada pantalla se diseña en el iPhone 17 Pro Max." },
          { icon: <Palette />, title: "Marca viva", body: "Gradientes que respiran y transiciones fluidas entre secciones.", wide: true },
        ]}
      />

      {/* ------------------ ANIMACIONES ------------------ */}
      <Section id="animaciones" ambient>
        <SectionHeading eyebrow="Animaciones" title="Todo se mueve, nada distrae" highlight="se mueve" subtitle="Motion para la UI, GSAP + ScrollTrigger para escenas largas, Lenis para el scroll. Curvas de marca: outExpo, inOutSmooth, spring." />
        <div className="grid gap-5 md:grid-cols-3">
          <Reveal preset="blurIn"><Card variant="glass" hover={false}><Mono>blurIn</Mono><p className="mt-2 font-display text-xl">Entrada con desenfoque</p></Card></Reveal>
          <Reveal preset="clipUp" delay={0.1}><Card variant="glass" hover={false}><Mono>clipUp</Mono><p className="mt-2 font-display text-xl">Cortina vertical</p></Card></Reveal>
          <Reveal preset="riseIn" delay={0.2}><Card variant="glass" hover={false}><Mono>riseIn</Mono><p className="mt-2 font-display text-xl">Emerge del suelo</p></Card></Reveal>
        </div>
        <div className="mt-10 grid items-center gap-10 md:grid-cols-2">
          <div>
            <Mono className="mb-3 block">TextReveal · por palabra / letra</Mono>
            <TextReveal as="h3" className="text-display-sm font-semibold" by="char" effect="flip">Detroit, become human.</TextReveal>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <div><Mono className="mb-2 block">Magnetic</Mono><Magnetic strength={0.5}><Button size="lg" arrow>Acercate</Button></Magnetic></div>
            <div><Mono className="mb-2 block">CountUp</Mono><div className="font-display text-5xl font-semibold text-gradient"><CountUp to={98.6} decimals={1} suffix="%" /></div></div>
          </div>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[0.35, 0.15, -0.15].map((s, i) => (
            <Parallax key={i} speed={s} className="rounded-3xl border border-line bg-surface-2 p-8">
              <Mono>Parallax · speed {s}</Mono>
              <p className="mt-2 text-muted">Capas a distinta velocidad (efecto Rockstar).</p>
            </Parallax>
          ))}
        </div>
        <Reveal className="mt-12">
          <Marquee duration={25}>{["Motion", "GSAP", "ScrollTrigger", "Lenis", "Tailwind v4", "React 19", "Vite 7", "Lucide"].map((t) => <span key={t} className="font-display text-3xl font-semibold text-paper/30">{t}</span>)}</Marquee>
        </Reveal>
      </Section>

      {/* ------------------ PINNED (Apple) ------------------ */}
      <PinnedSequence
        className="bg-surface-1"
        steps={[
          { title: "Secciones pinned como Apple", body: "El visual queda fijo mientras el texto cambia con el scroll. Ideal para explicar un producto paso a paso.", visual: <IPhone17ProMax width={300} color="deep-blue"><DemoScreen /></IPhone17ProMax> },
          { title: "Cada paso, un estado", body: "Cambiá la pantalla del teléfono, el color o cualquier visual por paso.", visual: <IPhone17ProMax width={300} color="cosmic-orange"><DemoScreen accent="ember" /></IPhone17ProMax> },
          { title: "Sin GSAP, solo Motion", body: "Implementado con position: sticky y useScroll. Para escenas más complejas está useGsap().", visual: <IPhone17ProMax width={300} color="silver"><DemoScreen /></IPhone17ProMax> },
        ]}
      />

      {/* ------------------ MOBILE ------------------ */}
      <Section id="mobile" ambient>
        <SectionHeading eyebrow="Mobile" title="iPhone 17 Pro Max, a escala real" highlight="a escala real" subtitle="440 × 956 pt lógicos, Dynamic Island, botón de Acción y Control de cámara. El contenido hijo se renderiza en el viewport exacto del dispositivo." />
        <div className="flex flex-wrap items-end justify-center gap-10">
          <IPhone17ProMax width={260} color="cosmic-orange" float><DemoScreen accent="ember" /></IPhone17ProMax>
          <IPhone17ProMax width={300} color="deep-blue" tilt><DemoScreen /></IPhone17ProMax>
          <IPhone17ProMax width={260} color="silver" float>
            <div className="h-full w-full bg-paper text-ink"><StatusBar dark /><div className="px-6 pt-[80px]"><Mono className="text-ink/50">Modo claro</Mono><h4 className="mt-2 font-display text-[30px] font-semibold leading-tight">Cualquier app adentro</h4><p className="mt-3 text-ink/60">Pasá una imagen, un iframe o componentes React.</p><div className="mt-6 rounded-[22px] bg-light-2 p-4"><div className="h-3 w-2/3 rounded-full bg-light-3" /><div className="mt-2 h-3 w-1/2 rounded-full bg-light-3" /></div></div></div>
          </IPhone17ProMax>
        </div>
      </Section>

      <Showcase
        id="showcase"
        items={[
          { eyebrow: "Showcase", title: "Texto y visual alternados", body: "El bloque Showcase alterna el lado del visual y aplica un parallax sutil. Es el patrón principal de las páginas de producto de Pulso y Apple.", bullets: ["Reveal por palabra en el título", "Bullets escalonados", "Visual con parallax"], cta: { label: "Ver código", href: "#" }, visual: <Card variant="glass" padding="lg" className="w-full max-w-md"><Mono>Visual</Mono><div className="mt-4 h-48 rounded-2xl af-gradient" /></Card> },
          { eyebrow: "Alternado", title: "Segundo item, lado opuesto", body: "Sin configuración extra: el índice impar invierte el orden en desktop.", visual: <IPhone17ProMax width={280} color="deep-blue"><DemoScreen /></IPhone17ProMax> },
        ]}
      />

      <Stats
        heading={{ eyebrow: "Stats", title: "Números que cuentan", highlight: "cuentan" }}
        stats={[{ value: 40, suffix: "+", label: "Productos lanzados" }, { value: 12, label: "Verticales" }, { value: 98.6, decimals: 1, suffix: "%", label: "Uptime promedio" }, { value: 3, suffix: " sem", label: "Time to market" }]}
      />

      <Steps
        id="proceso"
        heading={{ eyebrow: "Proceso", title: "Del brief al lanzamiento", highlight: "lanzamiento" }}
        steps={[
          { title: "Diagnóstico", body: "Entendemos el negocio, el usuario y qué paquete encaja." },
          { title: "Diseño vivo", body: "Prototipo animado en el iPhone 17 Pro Max y en desktop, con esta identidad." },
          { title: "Lanzamiento", body: "Producción, métricas y evolución continua." },
        ]}
      />

      <Testimonials
        heading={{ eyebrow: "Testimonios", title: "Lo que dicen quienes ya viven a futuro" }}
        items={[
          { quote: "En tres semanas teníamos la app en producción y los clientes la entendieron sin tutorial.", name: "Martina R.", role: "CEO, Nimbus", rating: 5 },
          { quote: "El nivel de detalle en las animaciones hace que el producto se sienta premium.", name: "Julián P.", role: "Founder, Orbital", rating: 5 },
          { quote: "Reutilizaron módulos y nos ahorraron meses de desarrollo.", name: "Sofía L.", role: "COO, Kairos", rating: 5 },
          { quote: "El diseño mobile quedó idéntico al mockup. Impecable.", name: "Tomás G.", role: "Product, Vanta", rating: 5 },
        ]}
      />

      <Pricing
        id="paquetes"
        heading={{ eyebrow: "Paquetes", title: "Elegí tu punto de partida", highlight: "punto de partida" }}
        plans={[
          { name: "Onepage", price: "$1.9k", period: "único", description: "Presencia con esta identidad, animada.", features: ["Hero + 5 secciones", "Animaciones de marca", "Mobile perfecto", "Entrega en 7 días"], cta: { label: "Empezar", href: "#cta" } },
          { name: "Producto", price: "$6.5k", period: "único", description: "App o sistema empaquetado por vertical.", features: ["Módulos preconstruidos", "Panel de administración", "Integraciones", "Soporte 3 meses"], cta: { label: "Quiero este", href: "#cta" }, featured: true, badge: "Más elegido" },
          { name: "Evolución", price: "$1.2k", period: "mes", description: "Mejora continua y nuevas features.", features: ["Roadmap mensual", "Métricas y A/B", "SLA 24 h", "Diseño a demanda"], cta: { label: "Hablemos", href: "#cta" } },
        ]}
      />

      <FAQ
        heading={{ eyebrow: "FAQ", title: "Preguntas frecuentes" }}
        items={[
          { q: "¿Qué framework usa el sistema?", a: "Vite + React 19 + Tailwind CSS v4 + Motion. GSAP y Lenis para escenas largas y scroll suave. Compila a un único index.html para publicarlo como Artifact." },
          { q: "¿Cómo armo la onepage de un cliente?", a: "npm run nuevo-cliente -- nombre-cliente. Se copia el template, editás src/App.tsx con los bloques y hacés npm run build." },
          { q: "¿Puedo usar modo claro?", a: "Sí: Section tone=\"light\" y Card variant=\"light\" replican el look de Pulso sobre #FAFAFA." },
        ]}
      />

      <CTA
        id="cta"
        title="¿Armamos el próximo producto?"
        subtitle="Contanos qué vende tu negocio y te mostramos el paquete que mejor encaja, con demo animada."
        primary={{ label: "Agendar una llamada", href: "mailto:hola@afuturo.dev" }}
        secondary={{ label: "Ver paquetes", href: "#paquetes" }}
      />

      <Footer
        note="Agencia de desarrollo de software empaquetado. Diseñamos productos que se sienten del futuro, hoy."
        columns={[
          { title: "Sistema", links: [{ label: "Tokens", href: "#sistema" }, { label: "Componentes", href: "#componentes" }, { label: "Animaciones", href: "#animaciones" }] },
          { title: "Agencia", links: [{ label: "Proceso", href: "#proceso" }, { label: "Paquetes", href: "#paquetes" }, { label: "Contacto", href: "#cta" }] },
        ]}
      />
    </SmoothScroll>
  );
}
