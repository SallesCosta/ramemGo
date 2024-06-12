import { defineConfig } from "vite"

export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: "assets/[name]-[hash][extname]",
        },
      },
    },
  },
  base: "/",
})