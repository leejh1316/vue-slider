// vite.config.lib.ts (새로 생성)
import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts({ insertTypesEntry: true, rollupTypes: false })],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, "src/lib/vue-slider/index.ts"),
      name: "vueSlider",
      fileName: "index",
    },
    rollupOptions: {
      external: [],
      output: { globals: {} },
    },
  },
});
