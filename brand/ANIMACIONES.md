# Animaciones — librerías y recetario

## Librerías (instaladas en `@afuturo/ui`)

| Librería | Versión | Para qué | Cuándo NO |
|---|---|---|---|
| **Motion** (`motion/react`) | 12.x | Variants, `whileInView`, springs, `useScroll`/`useTransform`, `AnimatePresence`, layout animations. **Default para todo lo de UI.** | Timelines largos con muchos elementos sincronizados |
| **GSAP + ScrollTrigger** (`gsap`) | 3.13 (gratis, todos los plugins) | Pin de secciones complejas, scrub sincronizado, secuencias de frames tipo Apple, capas tipo Rockstar, SplitText | Hovers y micro‑interacciones (usar Motion) |
| **Lenis** (`lenis`) | 1.3 | Scroll con inercia | Apps con scroll interno complejo |
| **CSS keyframes** (en `theme.css`) | — | Loops infinitos baratos: gradient drift, float, marquee, shimmer, pulse, scan | Cualquier cosa disparada por scroll |

Candidatas (no instaladas; agregar solo si un cliente lo pide): `@react-three/fiber` + `drei` (3D tipo Apple), `lottie-react` (ilustraciones animadas), `@number-flow/react` (números que ruedan), `split-type` (split de texto para GSAP).

## Presets disponibles (`@afuturo/ui/animations`)

**Variants (Motion):** `fadeIn` `fadeUp` `fadeDown` `fadeLeft` `fadeRight` `blurIn` `scaleIn` `riseIn` `clipUp` `wordUp` `stagger(gap, delay)` `cardHover` `pageTransition`

**Easings:** `EASE.outExpo` · `EASE.outQuart` · `EASE.inOutSmooth` · `EASE.spring` · `EASE.apple` — `SPRING.soft/snappy/bouncy/slow` — `DURATION.fast/base/slow/cinematic`

**Componentes:**
| Componente | Efecto |
|---|---|
| `<Reveal preset delay once amount as>` | Entra al hacer scroll con cualquier preset |
| `<Stagger gap delay>` | Escalona hijos `motion.*` con `variants={fadeUp}` |
| `<TextReveal by="word|char|line" effect="up|blur|flip" gradient>` | Título palabra por palabra |
| `<Parallax speed axis scale opacity>` | Capa que se mueve a otra velocidad |
| `<PinnedSequence steps stepHeight side render>` | Sección pinned estilo Apple |
| `<Magnetic strength>` | Botón que sigue al cursor |
| `<Tilt max glare>` | Tarjeta 3D |
| `<Spotlight color size>` | Halo que sigue al cursor sobre una card |
| `<Marquee duration reverse pauseOnHover fade>` | Cinta infinita |
| `<CountUp to decimals prefix suffix>` | Número que cuenta |
| `<SmoothScroll lerp>` + `scrollToId()` | Lenis |
| `useGsap((gsap, root) => …)` | Escena GSAP con cleanup |
| `useSectionProgress()` | Progreso 0–1 de una sección para animar a mano |

**Utilidades CSS:** `af-gradient` `af-gradient-slow` `af-gradient-diag` `text-gradient` `text-gradient-h` `border-gradient` `glass` `glass-strong` `glass-light` `bg-grid` `bg-dots` `bg-noise` `bg-vignette` `af-scanline` `shimmer` `animate-float` `animate-float-slow` `animate-pulse-glow` `animate-spin-slow` `animate-marquee` `animate-shimmer`

## Recetas

**Hero cinemático (Rockstar):**
```tsx
<section className="relative h-[140vh] bg-ink">
  <div className="sticky top-0 h-screen overflow-hidden">
    <Parallax speed={0.4} scale={[1, 1.2]} className="absolute inset-0"><img src={fondo} /></Parallax>
    <Parallax speed={0.15} className="absolute inset-0"><img src={capaMedia} /></Parallax>
    <Parallax speed={-0.1} className="absolute inset-x-0 bottom-0"><img src={primerPlano} /></Parallax>
    <Reveal preset="blurIn" delay={0.6} className="absolute inset-0 grid place-items-center">
      <Logo size={160} />
    </Reveal>
  </div>
</section>
```

**Producto paso a paso (Apple):**
```tsx
<PinnedSequence steps={[
  { title: "Pedidos en un toque", body: "…", visual: <IPhone17ProMax width={320}><Pantalla1/></IPhone17ProMax> },
  { title: "Cobros integrados",  body: "…", visual: <IPhone17ProMax width={320}><Pantalla2/></IPhone17ProMax> },
]} />
```

**Escena GSAP con pin + scrub:**
```tsx
const ref = useGsap((gsap, root) => {
  gsap.timeline({ scrollTrigger: { trigger: root, start: "top top", end: "+=250%", pin: true, scrub: 1 } })
    .from(".capa", { yPercent: 40, opacity: 0, stagger: 0.2 }, 0)
    .to(".titulo", { filter: "blur(0px)", opacity: 1 }, 0.5);
});
```

**Lista con stagger:**
```tsx
<Stagger className="grid md:grid-cols-3 gap-5">
  {items.map(i => <motion.div key={i.id} variants={fadeUp}><Card>…</Card></motion.div>)}
</Stagger>
```

## Reglas

1. Nada entra "seco": mínimo `fadeUp`. Héroes y títulos: `blurIn` / `TextReveal effect="blur"`.
2. Una sola animación protagonista por viewport; el resto acompaña (más lento, más sutil).
3. Loops infinitos solo en CSS (gradiente, float, marquee). Nunca loops JS de 60 fps sin motivo.
4. Duraciones ≥ 0.6 s para entradas; ≤ 0.3 s para hovers.
5. Respetar `prefers-reduced-motion` (ya está en base.css y en SmoothScroll/useGsap).
6. `whileInView` siempre en un elemento visible (no clipeado por overflow/clip-path).
