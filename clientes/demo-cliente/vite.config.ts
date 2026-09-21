import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// Build → dist/index.html (un solo archivo, todo inline). Publicar ese archivo como Artifact.
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile({ removeViteModuleLoader: true })],
  build: { target: "es2022", cssMinify: true, assetsInlineLimit: 100_000_000 },
});
