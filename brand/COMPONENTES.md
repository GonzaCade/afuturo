# Catálogo de componentes — `@afuturo/ui`

Importar todo desde `@afuturo/ui`. Antes de escribir UI de página: usar tokens y primitivas; **no hardcodear colores, radios ni sombras** en los componentes de página.

## Primitivas

| Componente | Props clave | Notas |
|---|---|---|
| `<Surface>` | `variant: elevated · float · secondary · glass · outline · ink · accent` · `radius: sm md lg xl 2xl` · `padding: none xs sm md lg` · `hover` · `selected` · `interactive` | Base de toda card/panel. `interactive` = `role="button"` (permite controles anidados). |
| `<GlassPanel>` | = Surface glass | Overlays sobre imágenes, barras flotantes. |
| `<HeroSurface>` | `media minHeight align` | Radio 32, visual a sangre, contenido que orbita. |
| `<ProductStage>` | `aspect floor label controls` | Escenario de estudio con luz cenital para un objeto. |
| `<Card>` / `<CardIcon>` | alias de Surface | Para bloques de onepage. |
| `<Button>` | `variant: primary · secondary · ghost · ink` · `size: sm md lg xl` · `arrow icon href` | Pill. Hover −2 px, press .98. Alias `PrimaryButton` / `SecondaryButton`. |
| `<IconButton>` | `label` (obligatorio) · `variant` · `size` · `active` | 40 px, radio 14. |
| `<StatusDot>` | `state: live · busy · idle · off` · `label showLabel` | Nunca solo color. |
| `<StatusPill>` | `state icon variant: surface · glass · ink · accent · ghost` · `size` | Para flotar sobre superficies e imágenes. |
| `<Badge>` | `variant: accent · neutral · ink · outline` | Tag chico. |
| `<Label>` · `<Eyebrow>` · `<BigNumber>` · `<SectionHeading>` | `highlight` en headings | Jerarquía tipográfica. |
| `<StudioBackground>` · `<StudioLight>` · `<Divider>` | | Fondo de estudio y luces difusas. |
| `<LensGlare>` | `image rect mask objectPosition cursorScale offset blur glow touchSize reach` | Sombra del cursor (forma de flecha, anclada a la punta, con una luz chica detrás) o del dedo (círculo, en touch) sobre un vidrio de una foto `object-cover`; `rect` en fracciones, `mask` = PNG con alpha de la silueta. Hermano del `<img>`. Sin suavizado de posición. |
| `<Logo>` | `size tone` | Solo isotipo. |

## Controles

| Componente | Props clave |
|---|---|
| `<SegmentedControl>` | `options value onChange size block label` — indicador deslizante con `layoutId` |
| `<Toggle>` | `checked onChange label description size` |
| `<Slider>` | `value onChange min max step label unit format` — target 40 px |
| `<ProgressBar>` | `value label showValue size inverted animate` |

## Datos

| Componente | Props clave |
|---|---|
| `<Metric>` | `label value unit prefix decimals delta deltaLabel live size icon bare children` — el número es el ancla |
| `<MetricGrid>` | `columns: 2 3 4` |
| `<MiniChart>` | `data type: line · area · bars` · `height neutral endDot` — sparkline sin ejes |
| `<StatusGraph>` | `data labels height highlight format type: bars · line` — una serie, líneas finas |

## Cards de producto

| Componente | Props clave |
|---|---|
| `<DeviceCard>` | `icon name meta state value selected onSelect on onToggle` |
| `<ProductCard>` | `image title description tag href aspect bleed` |
| `<ControlCard>` | `title icon value action children` |

## Shell de app

| Componente | Props clave |
|---|---|
| `<AppShell>` | `sidebar topbar dock embedded height` — `embedded` lo vuelve un objeto radio 32 para mostrar en una onepage |
| `<Sidebar>` | `items active onSelect brand groupLabel footer collapsed` |
| `<TopBar>` | `title crumbs center actions` |
| `<FloatingDock>` | `items active onSelect fixed` — mobile |
| `<CommandBar>` | `placeholder shortcut icon actions floating` |
| `<FloatingControls>` | `position` — grupo de IconButtons en pill de vidrio |

## Bloques de onepage (orden sugerido)

`<Navbar>` → `<Hero layout="stack|split|cover" media overlay>` → `<LogoCloud>` → `<FeatureGrid>` → `<Showcase>` → `<Stats>` → `<Steps>` → `<Testimonials>` → `<Pricing>` → `<FAQ>` → `<CTA variant="ink|surface">` → `<Footer>` (acepta `children` para suscripción).

## Dispositivo

`<IPhone17ProMax width color="silver|deep-blue|cosmic-orange|graphite" statusBar time float tilt shadow>` — hijo en 440×956 pt. `<StatusBar dark />` por defecto (pantallas claras).

## Ejemplo mínimo

```tsx
<SmoothScroll>
  <Navbar clientName="Nimbus" links={nav} cta={{ label: "Demo", href: "#cta" }} />
  <Hero layout="split" eyebrow="Gastronomía" title="Tu carta, pedidos y cobros en un solo lugar." highlight="un solo lugar"
        primaryCta={{ label: "Quiero una demo", href: "#cta" }}
        visual={<ProductStage aspect="4 / 5"><IPhone17ProMax width={300} tilt float><AppScreen/></IPhone17ProMax></ProductStage>} />
  <FeatureGrid heading={{ eyebrow: "Beneficios", title: "…", highlight: "…" }} features={features} />
  <Pricing id="planes" plans={plans} />
  <CTA id="cta" title="Empezá hoy." primary={{ label: "WhatsApp", href: wa }} />
  <Footer clientName="Nimbus" />
</SmoothScroll>
```
