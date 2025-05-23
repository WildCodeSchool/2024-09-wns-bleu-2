import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
    },
    hmr: {
      path: "/hmr",
    },
    allowedHosts: ["frontend"],
    proxy: {
      "/img": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
