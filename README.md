# A Futuro — Design System & Client Onepages

Kit de diseño para que Claude genere onepages y artifacts con la identidad de **A Futuro**
(futurista minimalista, gradiente cian→azul en movimiento, bordes redondeados, todo animado).

```bash
npm install
npm run dev                                   # showcase: http://localhost:5173
npm run nuevo-cliente -- "Nombre" "Rubro"     # crea clientes/nombre
npm run build -w @afuturo/cliente-nombre      # → dist/index.html (un solo archivo → Artifact)
```

- `CLAUDE.md` — instrucciones para Claude (stack, flujo, reglas, gotchas)
- `brand/` — BRAND.md · REFERENCIAS.md · ANIMACIONES.md · COMPONENTES.md · logo/
- `packages/ui` — `@afuturo/ui`: tokens Tailwind v4, componentes React, animaciones (Motion/GSAP/Lenis), iPhone 17 Pro Max
- `packages/showcase` — demo completa del sistema
- `clientes/_template` — base de cada onepage de cliente
