import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "manifest.json", // Copiar manifest.json
          dest: ".",
        },
        {
          src: "src/App.css", // Copiar manifest.json
          dest: ".",
        },
      ],
    }),
  ],

  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "popup.html"),
        background: resolve(__dirname, "src/background.ts"), // Adicione o arquivo background.ts aqui
        contentScript: resolve(__dirname, "src/scripts/contentScript.ts"),
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
    outDir: "dist",
  },
});
