# Animaciones — librerías y recetario

Principio: **la UI se siente física, no vistosa.** Hover sube 2–3 px, press comprime a .98, todo en 160–320 ms. Las entradas de sección son lentas y silenciosas (0.6–0.9 s).

## Librerías (instaladas en `@afuturo/ui`)

| Librería | Para qué | Cuándo NO |
|---|---|---|
| **Motion** (`motion/react`) | Variants, `whileInView`, `layoutId` (indicadores deslizantes), springs. **Default.** | Timelines largos sincronizados |
| **GSAP + ScrollTrigger** | Pin de secciones, scrub, secuencias tipo Apple | Hovers y micro-interacciones |
| **Lenis** | Solo con `SmoothScroll smooth` para una escena cinemática puntual | **Default es scroll nativo** (fluidez tipo Pinterest, sin lag) |
| **CSS keyframes** (`theme.css`) | Loops baratos: `float`, `pulse-dot`, `marquee`, `shimmer`, `studio` | Nada disparado por scroll |

## Presets (`@afuturo/ui/animations`)

**Variants:** `fadeIn` `fadeUp` `fadeDown` `fadeLeft` `fadeRight` `blurIn` `scaleIn` `riseIn` `clipUp` `wordUp` `stagger(gap, delay)` `cardHover` `pageTransition`

**Easings:** `EASE.outExpo` · `outQuart` · `inOutSmooth` · `spring` · `apple` — `SPRING.soft/snappy/gentle/slow` — `DURATION.fast(.16)/base(.24)/slow(.32)/enter(.6)/cinematic(.9)` — `PRESS` (hover/tap estándar para spread en `motion.*`).

**Componentes:**
| Componente | Efecto |
|---|---|
| `<Reveal preset delay once amount as>` | Entra al hacer scroll |
| `<Stagger gap delay>` | Escalona hijos `motion.*` con `variants={fadeUp}` |
| `<TextReveal by effect highlight accent>` | Título palabra por palabra; `highlight` pinta un rango con acento respetando puntuación |
| `<Parallax speed>` | Capa a otra velocidad (usar ≤ 0.12 en este sistema) |
| `<PinnedSequence steps>` | Sección pinned estilo Apple |
| `<Magnetic strength>` | Botón que sigue apenas al cursor (0.2 default) |
| `<Tilt max>` | Objeto que se inclina ≤ 4° |
| `<Spotlight>` | Luz blanca de estudio que sigue al cursor |
| `<Marquee>` · `<CountUp>` · `<SmoothScroll smooth?>` · `useGsap()` · `useSectionProgress()` | `SmoothScroll` = nativo por defecto |

**Utilidades CSS:** `af-studio` `af-studio-inner` `af-surface` `af-surface-2` `af-surface-float` `af-glass` `af-inset` `af-focus` `af-range` `bg-grid` `bg-dots` `bg-noise` `shimmer` `animate-float` `animate-float-slow` `animate-pulse-dot` `animate-marquee` `animate-shimmer` `animate-studio`

## Recetas

**Indicador deslizante (segmented, sidebar, dock):**
```tsx
{active && <motion.span layoutId={`seg-${id}`} className="absolute inset-0 rounded-sm bg-surface shadow-float-xs" transition={SPRING.snappy} />}
```

**Superficie interactiva:**
```tsx
<motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} transition={{ duration: DURATION.base, ease: EASE.outQuart }} className="af-surface rounded-xl" />
```

**Lista con stagger:**
```tsx
<Stagger className="grid md:grid-cols-3 gap-4">
  {items.map(i => <motion.div key={i.id} variants={fadeUp}><Card>…</Card></motion.div>)}
</Stagger>
```

**Gráfico que se dibuja:** `MiniChart` y `StatusGraph` ya animan `pathLength` / altura al entrar en viewport.

## Reglas

1. Nada entra "seco": mínimo `fadeUp`. Títulos: `TextReveal`.
2. Una sola animación protagonista por viewport.
3. Loops infinitos solo en CSS, y sutiles (float de 6 px, no de 14).
4. Interacción 160–320 ms; entradas ≥ 0.6 s.
5. Respetar `prefers-reduced-motion` (base.css, SmoothScroll, useGsap).
6. `whileInView` siempre en un elemento visible (no clipeado).
7. Sin glow, sin neón, sin gradientes animados.
