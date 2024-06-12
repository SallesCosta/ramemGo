import { defineConfig } from "vite"

export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        assets: "src/assets/",
      },
      output: {
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
  base: "/",
})