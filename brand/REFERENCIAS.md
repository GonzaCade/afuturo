# Referencias de diseño → cómo se traducen al sistema

Tres referencias definen el sistema. De cada una tomamos patrones concretos, no estética literal.

## 1. pulso.health — estructura de onepage de producto

**Qué hace bien:** navbar pill flotante con blur; hero centrado con título grande + prueba social (rating, "+6M"); mockup de teléfono rodeado de tarjetas flotantes; grilla de 6 capacidades; carrusel infinito de testimonios; secciones alternadas texto/imagen para cada feature; FAQ acordeón; CTA final con QR; footer completo.

**En el sistema:**
| Patrón Pulso | Componente |
|---|---|
| Nav pill flotante | `<Navbar>` (se compacta y gana blur al scrollear) |
| Hero + proof + mockup | `<Hero layout="center" proof visual={<IPhone17ProMax/>}>` |
| Tarjetas flotantes alrededor del mockup | `Card variant="glass"` con `animate-float` y `Parallax` |
| Grilla de capacidades | `<FeatureGrid columns={3}>` o `bento` |
| Testimonios en cinta | `<Testimonials layout="marquee">` |
| Feature deep‑dives alternados | `<Showcase items=[…]>` |
| FAQ | `<FAQ>` |
| Descarga / CTA final | `<CTA>` (acepta `children` para QR/inputs) |
| Fondo claro lavanda | `Section tone="light"` (usar con moderación) |

Orden recomendado de una onepage de cliente: **Hero → LogoCloud → FeatureGrid → Showcase → Stats → Steps → Testimonials → Pricing → FAQ → CTA → Footer**.

## 2. apple.com/airpods-pro — tipografía y scroll cinematográfico

**Qué hace bien:** títulos enormes con tracking negativo y una sola idea por pantalla; producto full‑bleed; secciones "pinned" donde el visual queda fijo y el texto cambia con el scroll; galerías por pestañas; comparativas con íconos; mucho aire.

**En el sistema:**
| Patrón Apple | Componente |
|---|---|
| Título gigante, una idea | `text-display-xl` + `TextReveal effect="blur"` |
| Sección pinned paso a paso | `<PinnedSequence steps=[…]>` (cambia la pantalla del iPhone por paso) |
| Escena pinned compleja / secuencia de frames | `useGsap()` con `ScrollTrigger` `pin + scrub` |
| Scroll con inercia | `<SmoothScroll>` (Lenis) |
| Tarjetas de producto 3D | `<Tilt>` |
| Números/specs grandes | `<Stats>` con `CountUp` |
| Aire | `Section spacing="lg"` |

## 3. rockstargames.com/VI — capas, profundidad y drama

**Qué hace bien:** fondo oscuro con degradé profundo; hero de capas ("shards") que se mueven a distinta velocidad al scrollear; logo que emerge; transiciones lentas y grandes; imágenes 3840 px; "scroll for more".

**En el sistema:**
| Patrón Rockstar | Componente |
|---|---|
| Capas a distinta velocidad | varios `<Parallax speed={0.35 / 0.15 / -0.15}>` apilados |
| Capas que crecen al pasar | `<Parallax scale={[1, 1.15]}>` |
| Fondo oscuro con luz | `<AmbientBackground>` + `<Orb>` + `bg-noise` |
| Logo que emerge | `Reveal preset="riseIn"` / `blurIn` con `delay` |
| Wordmark gigante de cierre | `<Footer bigText>` (clipUp) |
| "Scroll for more" | `Hero scrollHint` |
| Escena de héroe con timeline | `useGsap()` timeline con `scrub: 1` |

## Lo que NO copiamos

- Colores de las referencias (Pulso lavanda, Rockstar neón rosa). Solo nuestro gradiente + Ember.
- Fondo blanco como default (Apple/Pulso). El nuestro es negro; el claro es excepción.
- Densidad de contenido de Rockstar. Menos, más grande, más aire.
