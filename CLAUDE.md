# A Futuro — guía para Claude

Este repo es el **kit de diseño y desarrollo de A Futuro**, un estudio de modernización digital (Castelar, Buenos Aires; desde 2016; slogan "Tu idea, hecha realidad"). Es **estudio, no agencia**; una persona que se presenta como estudio sin mentir (ver brand/BRAND.md).
Su objetivo es que Claude arme, en minutos, el sitio de la agencia, onepages y artifacts de clientes con la identidad de la marca:
**sistema operativo claro del futuro cercano** — superficies blancas que flotan, un solo acento `#176BFF`, tipografía Geist, todo responde al tacto.
Futurista porque es más silencioso e inteligente, no porque tiene más efectos.

Leé `brand/BRAND.md` antes de diseñar cualquier cosa. Catálogo de piezas: `brand/COMPONENTES.md`.
Si vas a animar, `brand/ANIMACIONES.md`. Patrones de layout: `brand/REFERENCIAS.md`.

## Stack (no cambiar sin motivo)

| Capa | Elección | Por qué |
|---|---|---|
| Build | **Vite 7** | `vite-plugin-singlefile` compila a **un solo `index.html`** publicable como Artifact |
| UI | **React 19 + TypeScript** | Tipado = menos errores en generación |
| Estilos | **Tailwind CSS v4** (`@theme` tokens) | Tokens de marca como utilidades; sin config JS |
| Animación UI | **Motion** (`motion/react`) | Variants, `whileInView`, `layoutId`, springs |
| Escenas largas | **GSAP 3 + ScrollTrigger** | Pin, scrub |
| Scroll | **Lenis** | Inercia suave |
| Íconos | **lucide-react** | `strokeWidth 1.6`, 18 px (`ICON`) |

## Estructura

```
packages/ui/          @afuturo/ui — tokens, primitivas, controles, datos, cards, shell, bloques, iPhone 17 Pro Max
packages/site/        sitio de A Futuro: onepage + demo tipo OS (npm run dev)  ← miralo antes de diseñar
clientes/_template/   template de onepage de cliente
clientes/<slug>/      un subproyecto por cliente (creados con `npm run nuevo-cliente`)
brand/                BRAND.md · COMPONENTES.md · ANIMACIONES.md · REFERENCIAS.md · logo/
imagenes/             fotos de marca y de servicios (copiadas a packages/site/src/assets)
scripts/              nuevo-cliente.mjs
```

## Orden de trabajo (siempre)

1. **Tokens primero** (`packages/ui/src/styles/theme.css`): colores, radios, sombras, tipografía, easing. Nada de valores hardcodeados en páginas.
2. **Primitivas** (`Surface`, `Button`, `Label`, `StatusPill`…) y luego controles, datos, cards, shell.
3. **Páginas** solo componen primitivas y bloques de `@afuturo/ui`.

## Flujo para un cliente nuevo

```bash
npm run nuevo-cliente -- "Nombre Cliente" "Rubro"   # crea clientes/nombre-cliente
npm install
npm run dev   -w @afuturo/cliente-nombre-cliente
npm run build -w @afuturo/cliente-nombre-cliente     # → clientes/nombre-cliente/dist/index.html
```

1. Editar `src/cliente.ts`. 2. Componer `src/App.tsx` con bloques (Hero → FeatureGrid → Showcase → Stats → Steps → Testimonials → Pricing → FAQ → CTA → Footer). 3. Mobile dentro de `<IPhone17ProMax>`; apps dentro de `<AppShell embedded>`. 4. Build y publicar `dist/index.html` con Artifact.

## Reglas de diseño (resumen; detalle en brand/BRAND.md)

- **Fondo `#F3F5F8` con `af-studio`** (nunca blanco plano), superficies `#FFFFFF`, texto `#15171A / #646A73 / #9AA0A9`.
- **Un solo acento `#176BFF`**, solo para: activo, CTA, progreso, estado, navegación seleccionada, valor en vivo. Nunca naranja, nunca gradientes de color, nunca neón.
- **Superficies físicas**: `af-surface` (sombra fría + highlight interior + borde 1 px). Selección = borde + punto de acento, no fondo de color.
- **Radios**: 10 micro · 14 controles · 18 compactas · 24 estándar · 32 hero · pills `rounded-full`.
- **Tipografía Geist**, pesos 400–600, tracking −0.03/−0.045em en display. Números tabulares como anclas.
- **Interacción física**: hover −2/−3 px, press .98, 160–320 ms, `EASE.outQuart`. Entradas 0.6–0.9 s con `Reveal`/`TextReveal`.
- **Una información dominante por pantalla**; lo demás orbita. Mucho aire (secciones 48–80 px, gaps 8/12/16/24/32).
- **Accesibilidad**: target ≥ 40 px, `af-focus` visible, estado nunca solo por color (`StatusDot` lleva texto).
- **Responsive**: desktop = lienzo espacial; tablet reduce paneles; mobile apila superficies y usa `FloatingDock`.
- Respetar `prefers-reduced-motion` (ya lo hacen las utilidades y `SmoothScroll`).

## Decisiones del dueño (no discutir)

- **Nada que delate "hecho con IA"**: sin puntitos decorativos antes de los labels/eyebrows, sin emojis, sin adornos genéricos. Los indicadores de estado (`StatusDot`) sí van porque son funcionales.
- **Mobile sin navbar**: solo logo + hamburguesa, siempre visibles (sin pill, sin ocultarse al scrollear).
- **El logo es solo el isotipo SVG**: nunca escribir "A Futuro" al lado del símbolo (`<Logo>` ya no tiene wordmark).
- **Scroll nativo** (referencia: pinterest.com). `SmoothScroll` no activa Lenis salvo `smooth` explícito para una escena cinemática.
- **Narrativa**: estudio (no agencia), 7 servicios, 6 productos propios, +50 proyectos desde 2016, confidencialidad, pago en pesos o dólares (BNA compra). Sin precios inventados: la sección Precios explica la política y pide cotización.
- **Intro del hero** (`packages/site/src/sections/HeroMedia.tsx`): `videos/girl-hero-banner-*.webm` (6 s, 50 fps, su último frame = la foto) → **corte directo** → `videos/idle-*.webm` en bucle (30 fps, el lente no se mueve) con `LensGlare` encima del visor. SIN crossfade (se quitó a pedido del usuario): el idle arranca desde 0 cuando termina el intro. Si hubiera que volver a hacer un fundido: nunca dos capas semitransparentes a la vez, filtra el fondo blanco; el idle va encima y el intro queda opaco debajo. El idle 720p se baja entero a un blob mientras corre el intro; si no está listo, el intro espera congelado (8 s de tope → foto). **Calidad**: el idle SIEMPRE arranca en 720p; en pantallas ≥1920 px o densas el 4K se baja en segundo plano al arrancar el idle y, cuando está completo, reemplaza al 720p retomando el bucle en el mismo instante. Intro: 4K solo en pantallas grandes, 720p en el resto. Sin reflejo durante el intro. Foto fija = fallback (autoplay bloqueado, error, reduced-motion).
- **Hero del sitio = la foto de la chica centrada a pantalla completa detrás del título** (`Hero layout="cover" media`), en mobile la foto/video ocupa TODA la pantalla (`object-cover`, se recortan los lados sin problema; `LensGlare` recalcula la geometría), texto alineado a la izquierda (solo título + un botón primario; sin eyebrow, subtítulo, prueba social ni paneles flotantes). El visor tiene reflejo al cursor (`<LensGlare>` con `lens-mask.png`, derivado de `imagenes/anteojos.png`; rectángulo `LENS` en `App.tsx` calculado por correspondencia contra la foto). Es una **sombra con la forma del cursor** (flecha cuya punta coincide exactamente con la punta del cursor, tamaño del cursor ×1 y blur 3 px, con una luz chica detrás). La posición se escribe directo en el DOM en el `pointermove`: ni springs ni motion values (ambos agregan retraso y el usuario lo nota), y en mobile la sombra redonda del dedo que arrastra (`touchmove` pasivo). Sigue al mouse **sin suavizado**: el usuario notó el lag de los springs. Antes era un destello de luz grande: lo rechazó ("más chica, debería ser una sombra").

## Gotchas aprendidos (no repetir)

- `tailwind-merge` no conoce escalas custom: `text-display-md` + `text-ink` en un `cn()` pisa el tamaño. Ya está registrado en `lib/cn.ts` (`font-size`, `shadow`); si agregás escalas nuevas a `@theme`, sumalas ahí.
- `TextReveal` usa `inline-block overflow-hidden` por palabra: el espacio va **fuera** del span clipeado o se colapsa. Para resaltar con acento usar `highlight` (respeta la puntuación pegada); no partir el título en varios `TextReveal`.
- Un `<button>` no puede contener otro: `Surface interactive` renderiza `div[role=button]` justamente para anidar `Toggle`/`IconButton`.
- IntersectionObserver respeta `clip-path`/`overflow`: `whileInView` va en el wrapper visible. `Reveal preset="clipUp"` lo resuelve.
- Después de editar componentes con `whileInView`, recargar la página: el HMR deja estilos viejos.
- Los videos del hero traen una franja negra horneada de ~0.46 % arriba y abajo (se ve en mobile por el `cover`). `HeroMedia` los escala `1.012` para taparla; si se re-exportan sin franja, quitar ese `scale`. Para verificar: cargar un frame en un canvas y medir filas oscuras.
- Google Fonts debe ser el **primer** `@import` del CSS del app (`@afuturo/ui/styles/fonts.css`).
- `grid-cols-[...repeat(auto-fit,...)]` no se mezcla con tracks `fr` (CSS inválido → una columna).
- Lenis: `scrollTo(..., { immediate: true })` no dispara `whileInView`; en tests usar scroll real.
- El build inlinea imágenes y videos (`assetsInlineLimit`): el sitio pesa ~26.9 MB (SUPERA el límite de 16 MB de Artifact por el idle 4K de 11.8 MB) con los cuatro videos (intro + idle, 4K y 720p); mantener fotos en WebP < 1 MB y videos VP9 cortos.

## Comandos

```bash
npm run dev          # sitio en http://localhost:5173
npm run build        # sitio → packages/site/dist/index.html
npm run typecheck    # tsc sobre @afuturo/ui
```
