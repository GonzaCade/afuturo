#!/usr/bin/env node
/**
 * Crea un subproyecto de cliente a partir de clientes/_template.
 *   npm run nuevo-cliente -- "Nombre Cliente" [rubro]
 * Genera clientes/<slug>/ y reemplaza {{CLIENTE}} / {{RUBRO}} / {{DESCRIPCION}}.
 */
import { cpSync, readdirSync, readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const [, , nombre, rubro = "Producto digital"] = process.argv;
if (!nombre) { console.error("Uso: npm run nuevo-cliente -- \"Nombre Cliente\" [rubro]"); process.exit(1); }

const slug = nombre.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const root = resolve(import.meta.dirname, "..");
const src = join(root, "clientes", "_template");
const dest = join(root, "clientes", slug);
if (existsSync(dest)) { console.error(`Ya existe ${dest}`); process.exit(1); }

cpSync(src, dest, { recursive: true, filter: (p) => !p.includes("node_modules") && !p.includes("dist") });

const walk = (dir) => readdirSync(dir).flatMap((f) => { const p = join(dir, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
for (const file of walk(dest)) {
  if (!/\.(ts|tsx|html|json|md|css)$/.test(file)) continue;
  const txt = readFileSync(file, "utf8")
    .replaceAll("{{CLIENTE}}", nombre)
    .replaceAll("{{RUBRO}}", rubro)
    .replaceAll("{{DESCRIPCION}}", `${nombre} — ${rubro}. Desarrollado por A Futuro.`)
    .replace("@afuturo/cliente-template", `@afuturo/cliente-${slug}`);
  writeFileSync(file, txt);
}

console.log(`✔ Cliente creado en clientes/${slug}`);
console.log(`  1) npm install            (registra el workspace)`);
console.log(`  2) npm run dev -w @afuturo/cliente-${slug}`);
console.log(`  3) npm run build -w @afuturo/cliente-${slug}  → clientes/${slug}/dist/index.html (publicar como Artifact)`);
