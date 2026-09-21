# A Futuro — guía para Claude

Este repo es el **kit de diseño y desarrollo de A Futuro**, una agencia de software empaquetado.
Su objetivo es que Claude arme, en minutos, onepages y artifacts de clientes con la identidad de la marca:
**futurista minimalista** (Black Mirror / Detroit: Become Human), bordes redondeados, todo animado.

Leé `brand/BRAND.md` antes de diseñar cualquier cosa. Si necesitás patrones de layout, `brand/REFERENCIAS.md`.
Si vas a animar, `brand/ANIMACIONES.md`. Catálogo de piezas: `brand/COMPONENTES.md`.

## Stack (no cambiar sin motivo)

| Capa | Elección | Por qué |
|---|---|---|
| Build | **Vite 7** | El más rápido; `vite-plugin-singlefile` compila a **un solo `index.html`** publicable como Artifact |
| UI | **React 19 + TypeScript** | Es donde Claude es más fluido; tipado = menos errores en generación |
| Estilos | **Tailwind CSS v4** (`@theme` tokens) | Tokens de marca como utilidades; sin config JS |
| Animación UI | **Motion** (`motion/react`) | Variants, `whileInView`, springs, layout animations |
| Escenas largas | **GSAP 3 + ScrollTrigger** | Pin, scrub, timelines cinemáticos (estilo Rockstar/Apple) |
| Scroll | **Lenis** | Inercia suave tipo Apple |
| Íconos | **lucide-react** | Consistentes, tree-shakeables |

## Estructura

```
packages/ui/          @afuturo/ui — design system (tokens, componentes, animaciones, iPhone 17 Pro Max)
packages/showcase/    demo completa del sistema (npm run dev)  ← mirala antes de diseñar
clientes/_template/   template de onepage de cliente
clientes/<slug>/      un subproyecto por cliente (creados con `npm run nuevo-cliente`)
brand/                BRAND.md · REFERENCIAS.md · ANIMACIONES.md · COMPONENTES.md · logo/
imagenes/             logo original (PNG + SVG)
scripts/              nuevo-cliente.mjs
```

## Flujo para un cliente nuevo

```bash
npm run nuevo-cliente -- "Nombre Cliente" "Rubro"   # crea clientes/nombre-cliente
npm install                                          # registra el workspace
npm run dev   -w @afuturo/cliente-nombre-cliente     # desarrollo con HMR
npm run build -w @afuturo/cliente-nombre-cliente     # → clientes/nombre-cliente/dist/index.html
```

1. Editar `src/cliente.ts` (nombre, rubro, tagline, nav, contacto).
2. Componer `src/App.tsx` apilando bloques de `@afuturo/ui` (Hero → FeatureGrid → Showcase → Stats → Steps → Testimonials → Pricing → FAQ → CTA → Footer). Sacar los que no apliquen.
3. Poner la app o capturas del cliente adentro de `<IPhone17ProMax>` cuando haya algo mobile.
4. `npm run build` y publicar `dist/index.html` con la herramienta Artifact (pesa ~600 kB, entra en el límite).

## Reglas de diseño (resumen; detalle en brand/BRAND.md)

- **Fondo negro `#121212`**, texto `#FAFAFA`. Secciones claras solo con `tone="light"` para contraste puntual (estilo Pulso).
- **Primario = gradiente vertical** `#39BAD0 → #0054A2`, siempre con la utilidad `af-gradient` (se mueve solo). Nunca un azul plano como primario.
- **Secundario "Ember" `#FF6B4A`**: sólido, cálido, para un solo acento por pantalla. Nunca dorado ni amarillo.
- **Todo redondeado**: botones `rounded-full`, cards `rounded-2xl/3xl`, mockups `rounded-4xl`. Sin esquinas rectas.
- **Todo animado**: cada bloque entra con `Reveal`/`Stagger`; títulos con `TextReveal`; CTAs con `Magnetic`; fondos con `Orb`. Usar los easings de `EASE` (nunca `linear`/`ease`).
- **Tipografía**: Sora (display), Inter (texto), JetBrains Mono (labels HUD en mayúsculas con tracking amplio).
- **Mobile** siempre se muestra en `<IPhone17ProMax>` (440×956 pt lógicos).
- Respetar `prefers-reduced-motion` (ya lo hacen las utilidades y `SmoothScroll`).

## Gotchas aprendidos (no repetir)

- `background-clip: text` no atraviesa hijos con `transform`/`filter`: para gradiente en texto animado por palabra usar `<TextReveal gradient>`; no envolver en `GradientText`.
- IntersectionObserver (Chrome) respeta `clip-path` y `overflow` de ancestros: el `whileInView` va en el **wrapper visible**, no en el hijo clipeado. `Reveal preset="clipUp"` ya lo resuelve.
- `grid-cols-[...repeat(auto-fit,...)]` no puede mezclarse con tracks `fr` flexibles (CSS inválido → una columna).
- Después de editar componentes con `whileInView`, recargar la página: el HMR deja estilos viejos.
- Google Fonts debe ser el **primer** `@import` del CSS del app (`@afuturo/ui/styles/fonts.css`).
- Lenis: `scrollTo(..., { immediate: true })` no dispara `whileInView`; en tests usar scroll real.

## Comandos

```bash
npm run dev          # showcase en http://localhost:5173
npm run build        # showcase → packages/showcase/dist/index.html
npm run typecheck    # tsc sobre @afuturo/ui
```
