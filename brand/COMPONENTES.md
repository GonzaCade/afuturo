# Catálogo de componentes — `@afuturo/ui`

Importar todo desde `@afuturo/ui`. Cada bloque acepta `id` (para anclas del navbar) y `tone` cuando aplica.

## Bloques de onepage (orden sugerido)

| Componente | Props clave | Notas |
|---|---|---|
| `<Navbar>` | `links[] cta clientName brand` | Pill flotante; `clientName` muestra "Cliente · by A Futuro" |
| `<Hero>` | `eyebrow title highlight subtitle primaryCta secondaryCta visual layout="center|split" proof scrollHint` | Entrada blur por palabra; `visual` suele ser `<IPhone17ProMax>` |
| `<LogoCloud>` | `logos[] label` | Cinta infinita |
| `<FeatureGrid>` | `heading features[] columns bento tone` | `features[i].wide` ocupa 2 col en bento |
| `<Showcase>` | `items[] parallax tone` | Alterna lado automáticamente; `bullets`, `cta`, `visual` |
| `<Stats>` | `stats[] heading inline` | `CountUp` en cada valor |
| `<Steps>` | `steps[] heading` | Línea conectora que se dibuja |
| `<Testimonials>` | `items[] heading layout="marquee|grid"` | Dos cintas contrapuestas |
| `<Pricing>` | `plans[] heading` | `featured` = borde gradiente + glow |
| `<FAQ>` | `items[] heading defaultOpen` | Acordeón con altura animada |
| `<CTA>` | `title subtitle primary secondary variant="gradient|glass" children` | Tarjeta gradiente gigante |
| `<Footer>` | `clientName columns note bigText year` | Wordmark gigante con máscara |
| `<PinnedSequence>` | `steps[] stepHeight side render` | Ver ANIMACIONES.md |

## UI

| Componente | Variantes |
|---|---|
| `<Button>` | `variant: primary · secondary · ember · outline · glass · ghost` · `size: sm md lg xl` · `arrow` · `icon` · `href` |
| `<Badge>` | `variant: primary · ember · outline · glass · default` · `dot` (pulso) · `icon` |
| `<Card>` | `variant: surface · glass · gradient-border · light · gradient` · `padding` · `spotlight` · `hover` |
| `<CardIcon>` | Contenedor de ícono 48 px |
| `<SectionHeading>` | `eyebrow title highlight subtitle align size as` |
| `<GradientText>` | Texto estático con gradiente (`horizontal`) |
| `<Mono>` | Label HUD mono/uppercase |
| `<Orb>` | `tone: primary · blue · ember` · `size intensity float` |
| `<AmbientBackground>` | grid + viñeta + orbs |
| `<Divider>` | Línea con degradé |
| `<Section>` / `<Container>` | `tone: dark · surface · light` · `spacing: sm md lg none` · `size: sm md lg xl full` · `ambient` |
| `<Logo>` | `size tone="gradient|mono" wordmark animated` |

## Dispositivo

`<IPhone17ProMax width color="deep-blue|cosmic-orange|silver|graphite" statusBar time float tilt glow>`
— hijo renderizado en 440×956 pt; `IPHONE_17_PRO_MAX` exporta las specs. `<StatusBar dark />` para pantallas claras.

## Cómo se combina (ejemplo mínimo)

```tsx
<SmoothScroll>
  <Navbar clientName="Nimbus" links={nav} cta={{ label: "Demo", href: "#cta" }} />
  <Hero eyebrow="Gastronomía" title="Tu carta, pedidos y cobros en un solo lugar" highlight="un solo lugar"
        subtitle="…" primaryCta={{ label: "Quiero una demo", href: "#cta" }}
        visual={<IPhone17ProMax width={340} tilt float><AppScreen/></IPhone17ProMax>} />
  <FeatureGrid id="beneficios" heading={{ eyebrow: "Beneficios", title: "…", highlight: "…" }} features={features} />
  <Showcase items={showcase} />
  <Pricing id="planes" plans={plans} />
  <CTA id="cta" title="Empezá hoy" primary={{ label: "WhatsApp", href: wa }} />
  <Footer clientName="Nimbus" />
</SmoothScroll>
```
