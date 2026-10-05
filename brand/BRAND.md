# A Futuro — Identidad

**Qué somos:** **A Futuro es un estudio** (no una agencia) de modernización digital en Castelar, Buenos Aires. Desde 2016 hace software para negocios y empresas de todos los rubros: más de 50 proyectos (webs, excels automatizados, agentes conversacionales por WhatsApp y redes, onepages, edición de video, logos, sistemas web, apps móviles, videojuegos, restauración de imágenes antiguas).

**Slogan:** *Tu idea, hecha realidad* — con vanguardia tecnológica.

**Servicios (7):** diseño de marca · landing pages · automatizaciones · mejoras de procesos para empresas · productos digitales · estrategias de marketing · edición de imagen y audiovisuales.

**Productos propios:** sistema de gestión de negocios (caja chica, menú, stock, envíos, WhatsApp, comandas, Mercado Pago) · empleado artificial (IA ultrarrealista de atención, tiempo real, pedidos) · automatización mecánica (cintas transportadoras conectadas al sistema) · rebranding de marcas · onepages express · software a medida.

**Cómo hablamos del equipo:** es una persona, pero se vende como estudio, sin mentir: "nosotros", "el estudio", "un estudio compacto: quien diseña es quien construye". Nunca inventar cantidad de gente ni nombres.

**Prioridades de cada sistema:** fluidez, carga rápida, estética sencilla futurista e intuitiva.

**Condiciones:** contrato de confidencialidad en todos los proyectos; precios competitivos para el mercado argentino, pago en pesos o en dólares al dólar compra del Banco Nación. Formación: Diplomatura en Business Analysis, Técnico en Informática, Automatizaciones con IA, Marketing.

**Cómo se ve:** un sistema operativo del futuro cercano combinado con diseño industrial de producto. Referencias de tono: HMI automotriz minimalista, UI de configuración de hardware premium, fotografía de estudio sobre blanco, tipografía suiza editorial. **Es futurista porque es más silencioso e inteligente, no porque tiene más efectos.**

**Cómo se siente:** calmo, preciso, táctil, espacial, liviano. Las superficies son objetos físicos que flotan 2–5 mm sobre el fondo. Todo responde al tacto: sube al hover, se comprime al presionar. Nada brilla, nada vibra.

**Lo que NO somos:** cyberpunk, neón, fondos oscuros, gradientes violetas, glassmorphism excesivo, dashboards SaaS genéricos, bordes gruesos, cards por todos lados, bloques grandes de color.

---

## Color

Proporción: **90 % superficies neutras claras · 8 % tipografía oscura · 2 % acento.**

| Rol | Token | Valor | Uso |
|---|---|---|---|
| Fondo | `bg-canvas` | `#F3F5F8` | Página. Nunca blanco plano: siempre con `af-studio` (luz de estudio). |
| Superficie elevada | `bg-surface` · `af-surface` | `#FFFFFF` | Cards, paneles, controles. |
| Superficie secundaria | `bg-surface-2` · `af-surface-2` | `#F8F9FB` | Escenarios de producto, fondos internos. |
| Hover / pista | `bg-surface-3` · `af-inset` | `#EEF1F5` | Tracks de slider, pista de segmented, hover de ghost. |
| Texto primario | `text-ink` | `#15171A` | Títulos, valores. |
| Texto secundario | `text-ink-2` | `#646A73` | Párrafos, descripciones. |
| Texto terciario | `text-ink-3` | `#9AA0A9` | Labels, unidades, placeholders. |
| Deshabilitado / ticks | `text-ink-4` | `#C9CDD3` | Barras inactivas de gráficos, ticks. |
| **Acento (único)** | `bg-accent` · `text-accent` | `#176BFF` | Ver abajo. |
| Acento suave | `bg-accent-50/100/200` | `#EDF3FF` … | Fondos de ítem activo, badges. |
| Líneas | `border-line` · `border-line-strong` | `rgb(21 23 26 / .06 / .12)` | Bordes de 1 px. Nunca sólidos oscuros. |

**El acento se usa exclusivamente para:** estado activo, CTA primario, progreso, indicador de estado, navegación seleccionada, valores "en vivo" importantes. Un solo acento por pantalla; si hay dos cosas azules, una sobra.

**Estado nunca solo por color:** `StatusDot` y `StatusPill` siempre llevan texto (visible o `sr-only`); los deltas llevan flecha + número.

## Superficies

Las cards parecen objetos físicos flotando 2–5 mm sobre el fondo:

- Sombras frías y sutiles con highlight blanco interior: `shadow-float-xs/sm/float/lg`.
- Borde de 1 px apenas visible (`border-line`). Nunca outlines fuertes.
- Blur opcional para barras flotantes (`af-glass`).
- Selección = borde apenas más fuerte + punto de acento + un poco más de elevación (`Surface selected`). Nunca un fondo de color.

Jerarquía de radios: `rounded-sm` 10 (micro controles) · `rounded-md` 14 (controles) · `rounded-lg` 18 (cards compactas) · `rounded-xl` 24 (cards estándar) · `rounded-2xl` 32 (superficies hero) · `rounded-full` (pills).

## Tipografía

| Rol | Fuente | Peso | Notas |
|---|---|---|---|
| Display y texto | **Geist** (fallback Inter) | 400–600 | Tracking negativo en títulos: −0.03 a −0.045em (`text-display-xl/lg/md/sm`). Nunca bold excesivo. |
| Labels | Geist | 500 | `<Label>`: 11 px, mayúsculas, tracking 0.12em, `text-ink-3`. |
| Números / código | **Geist Mono** | 400–500 | Valores tabulares (`tabular-nums`), tooltips, atajos. |

Los eyebrows son solo texto: sin puntos ni adornos delante (delatan plantilla).

Los números grandes son anclas visuales (`<BigNumber>`, `<Metric>`). Un título = una idea; `highlight` pinta una o dos palabras con el acento.

## Espacio

- Secciones: 48–80 px de separación (`Section spacing="sm|md|lg"`).
- Padding de card: 20–28 px (`padding="sm|md|lg"`).
- Gaps: 8 / 12 / 16 / 24 / 32.
- El vacío es parte del diseño. No llenar.

## Principio visual central

Cada pantalla principal tiene **una** información o visual dominante (un render, un dispositivo, una métrica grande, un gráfico). Lo demás orbita alrededor. `HeroSurface`, `ProductStage` y la métrica grande de `AppShell` existen para eso.

## Movimiento

- Hover: `translateY(-2px a -3px)` + sombra apenas más fuerte. Press: `scale(.97–.98)`.
- Duraciones: 160–320 ms para interacción (`DURATION.fast/base/slow`); 0.6–0.9 s para entradas de sección (`enter/cinematic`).
- Curvas: `EASE.outExpo` (entradas), `EASE.outQuart` (hover), `SPRING.snappy` (indicadores deslizantes). Nunca `linear` ni `ease`.
- Firma: entrada por palabra (`TextReveal`), `blurIn` leve, objetos que "se apoyan" (`riseIn`). Sin animaciones vistosas.

## Íconos

Lucide, `strokeWidth 1.6`, 18 px por defecto (`ICON`). Nunca mezclar familias.

## Logo

Isotipo: flecha/"A" doble (`brand/logo/`). **Solo el símbolo, nunca con el nombre escrito al lado.** En código: `<Logo tone="ink|accent|mono" />`. Sobre claro: tinta `#15171A`. Área de respeto: ½ de la altura. Mínimo 24 px.

## Voz

Español rioplatense, voseo natural ("Contanos", "Empezá"). Frases cortas, promesa > feature. Hablamos como estudio ("nosotros"). Ejemplos: *"Tu idea, hecha realidad."*, *"Tu negocio cobra, despacha y atiende aunque vos no estés."* Palabra paraguas: **modernización digital** (no "soluciones tecnológicas").

## Bloque oscuro (excepción)

`Section tone="ink"` y `CTA variant="ink"` permiten **un** bloque `#15171A` por página para contraste puntual (el CTA final). Nunca el hero, nunca dos seguidos.
