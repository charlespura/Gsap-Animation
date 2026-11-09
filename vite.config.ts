import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Relative assets support repository Pages URLs, root sites and custom domains.
  base: "./",
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) =>
          id.includes("node_modules/three/")
            ? "three"
            : id.includes("node_modules/gsap/")
              ? "gsap"
              : undefined,
      },
    },
  },
});
