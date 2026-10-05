import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// `npm run build` genera dist/index.html como archivo único (publicable como Artifact).
export default defineConfig({
  // Pages sirve en /afuturo/: rutas relativas para que funcione en cualquier subruta
  base: "./",
  plugins: [react(), tailwindcss(), viteSingleFile({ removeViteModuleLoader: true })],
  build: { target: "es2022", cssMinify: true, assetsInlineLimit: 100_000_000 },
  server: { port: 5173 },
});
