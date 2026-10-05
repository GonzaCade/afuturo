# Referencias de diseño → cómo se traducen al sistema

Tomamos patrones concretos, no estética literal.

## 1. HMI automotriz minimalista / configuradores de hardware premium

**Qué hacen bien:** una información dominante por pantalla (el vehículo, el dispositivo), controles grandes y táctiles, un solo color de acento para "activo", mucho aire, superficies que parecen físicas.

| Patrón | Componente |
|---|---|
| Objeto dominante centrado con luz cenital | `<ProductStage>` · `<HeroSurface media>` |
| Panel lateral de controles | `<ControlCard>` con `Slider` / `Toggle` / `SegmentedControl` |
| Estado de dispositivos | `<DeviceCard>` (selección = borde + punto de acento) |
| Métrica grande como ancla | `<Metric size="lg">` · `<BigNumber>` |
| Navegación con indicador físico | `<Sidebar>` · `<FloatingDock>` (layoutId) |

## 2. Fotografía de estudio sobre blanco (Apple, product renders)

**Qué hace bien:** fondo blanco que no es plano (luz suave, sombra de piso), producto sin recortes duros, tipografía enorme con tracking negativo, una idea por pantalla.

| Patrón | Componente |
|---|---|
| Fondo de estudio | `af-studio` (body) · `af-studio-inner` (dentro de superficies) |
| Producto con sombra de piso | `<ProductStage floor>` · `<IPhone17ProMax shadow>` |
| Imagen de producto en card | `<ProductCard>` (imágenes PNG/WebP sobre blanco) |
| Título gigante, una idea | `text-display-xl` + `<TextReveal highlight>` |
| Sección pinned paso a paso | `<PinnedSequence>` |

## 3. Tipografía suiza / editorial

**Qué hace bien:** jerarquía por tamaño y peso (no por color), labels en mayúsculas chicas, números tabulares, grilla estricta.

| Patrón | Componente |
|---|---|
| Labels en mayúsculas | `<Label>` · `<Eyebrow>` |
| Jerarquía display | `text-display-xl/lg/md/sm`, pesos 400–600 |
| Números alineados | `tabular-nums` (ya en `Metric`, `BigNumber`, `Stats`) |

## Lo que NO copiamos

- Fondos oscuros como default. El sistema es claro; el bloque `ink` es una excepción puntual (CTA final).
- Neón, glow, gradientes de color. Solo sombras frías y un acento sólido.
- Densidad de dashboards SaaS. Menos cards, más aire, una idea dominante.
- Glassmorphism como decoración. `af-glass` solo en barras y pills que flotan sobre imágenes.
