import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// https://vite.dev/config/
export default defineConfig(() => {
  const baseUrl = "/vue-slider/";
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@lib": path.resolve(__dirname, "./src/lib"),
      },
    },
    define: {
      __BASE_URL__: JSON.stringify(baseUrl),
    },
    base: baseUrl,
  };
});
