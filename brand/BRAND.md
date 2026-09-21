# A Futuro — Identidad

**Qué somos:** agencia de desarrollo de software empaquetado. Productos listos por vertical (gastronomía, salud, retail, servicios…) que se lanzan rápido y se sienten premium.

**Cómo se ve:** futurista y minimalista. Referencias de tono: la UI de *Black Mirror* (negro, tipografía limpia, luz fría) y *Detroit: Become Human* (HUDs cian, líneas finas, latido de luz). No es cyberpunk ruidoso: es silencio, precisión y luz.

**Cómo se siente:** todo respira. Los gradientes se mueven despacio, las secciones entran con desenfoque, los botones atraen al cursor. Nada aparece de golpe.

---

## Color

| Rol | Valor | Uso |
|---|---|---|
| **Primario (gradiente)** | `#39BAD0` arriba → `#0054A2` abajo, vertical | Botones primarios, texto destacado, isotipo, tarjetas hero. **Siempre animado** (`af-gradient`, `text-gradient`). |
| Primario 400 | `#39BAD0` | Íconos, puntos "en vivo", bordes activos |
| Primario 600 | `#0054A2` | Sombras de color, orbs profundos |
| **Secundario "Ember"** | `#FF6B4A` (hover `#FF8A6E`, oscuro `#E0522F`) | Complementario cálido y **sólido**. Un acento por pantalla: alerta, badge "nuevo", CTA crítico. Nunca dorado/amarillo. |
| Negro | `#121212` | Fondo por defecto |
| Superficies | `#0C0C0C` · `#181818` · `#202020` · `#2A2A2A` | Footer · cards · elevado · hover |
| Blanco | `#FAFAFA` | Texto, botón secundario, secciones claras |
| Muted / Subtle | `#9A9A9A` · `#6B6B6B` | Texto secundario / terciario |
| Líneas | `rgb(255 255 255 / .08)` · `.16` | Bordes de cards / bordes fuertes |

**Por qué Ember:** el complementario exacto del cian‑azul (hue ≈ 195–210°) está en 15–30° (rojo‑naranja). `#FF6B4A` mantiene esa relación sin caer en dorado, y sobre `#121212` cumple contraste AA en texto grande.

Regla de proporción: 80 % negro/superficies · 15 % blanco y grises · 4 % gradiente primario · 1 % Ember.

## Tipografía

| Rol | Fuente | Peso | Notas |
|---|---|---|---|
| Display | **Sora** | 600–700 | Tracking negativo (‑0.03 a ‑0.04em), line‑height ≤ 1. Tamaños fluidos `text-display-xl/lg/md/sm`. |
| Texto | **Inter** | 400–500 | 17–20 px en párrafos, `leading-relaxed`, color muted. |
| Labels HUD | **JetBrains Mono** | 400–500 | Mayúsculas, `tracking-[0.2em]`, 11–12 px. Eyebrows, métricas, numeración "01 / 03". |

Títulos: una idea, máximo dos líneas, con **una parte resaltada en gradiente** (`highlight`).

## Forma

- Bordes: botones `rounded-full`; cards `rounded-2xl` (mobile) / `rounded-3xl` (desktop); tarjetas hero y CTA `rounded-4xl`; pantallas de dispositivo con su radio real.
- Bordes de 1 px translúcidos, nunca sólidos claros. Destacar con `border-gradient`.
- Glass: `glass` (blur 20) sobre fondos con orbs; `glass-strong` para navbar.
- Sombras = luz: `shadow-glow` (cian), `shadow-glow-ember`. Sombras negras solo en mockups (`shadow-soft`).
- Espaciado generoso: secciones `py-24/32`, `max-w-7xl`, gutter 20–32 px.

## Movimiento

- Curvas: `EASE.outExpo` para entradas, `EASE.inOutSmooth` para gradientes/loops, `SPRING.snappy` para micro‑interacciones.
- Duraciones: 0.25 s (hover) · 0.6 s (UI) · 0.9 s (secciones) · 1.4 s (cinemático).
- Firma de marca: **blur‑in** (desenfoque → nítido) en títulos y hero; **gradient drift** (9–16 s alternado) en cualquier superficie con el gradiente; **float** (6–10 s) en mockups y orbs.
- Scroll: Lenis con `lerp 0.09`; secciones pinned para explicar producto (Apple); capas parallax a distinta velocidad para héroes cinemáticos (Rockstar).

## Logo

Isotipo: flecha/“A” doble (`brand/logo/`). Versiones: `a-futuro-logo-gradient.svg` (marca), `a-futuro-logo-blanco.svg` (sobre fotos/gradiente), `a-futuro-logo-negro.svg` (sobre claro). En código: `<Logo />` (SVG con gradiente animado) y `<Logo wordmark />`.

Área de respeto: ½ de la altura del isotipo. Tamaño mínimo: 24 px.

## Voz

Español rioplatense, tuteo/voseo natural ("Contanos", "Empezá"). Frases cortas, sin jerga técnica en la superficie. Promesa > feature. Ejemplos: *"Software que se adelanta a tu negocio"*, *"Lanzá en semanas, no en meses"*.

## Modo claro (opcional)

Para clientes de salud/bienestar (estilo Pulso) se permite invertir secciones: `Section tone="light"` (#FAFAFA), `Card variant="light"`, tipografía `#121212`. El gradiente primario y Ember no cambian. Máximo 1–2 secciones claras por página; el hero sigue oscuro.
