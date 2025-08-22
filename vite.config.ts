import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import path from "path";

export default defineConfig({
  base: "/",
  plugins: [vue(), svgLoader()],
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@use "@/assets/scss/_variables.scss" as *;`,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
