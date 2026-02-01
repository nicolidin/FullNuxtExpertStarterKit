import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname, "."), // Maintenant le root est le dossier playground lui-même
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"), // Chemin relatif vers src depuis le dossier playground
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "../src/styles/vue-lib-exo-corrected.scss" as *;
        `,
      },
    },
  },
  server: {
    port: 3000,
  },
});
