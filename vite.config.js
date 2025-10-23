import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Use repo name for production (GitHub Pages) and root for local dev
  base: command === "build" ? "/shepherds/" : "/",
  server: {
    port: 5173,
    host: true,
  },
  optimizeDeps: {
    exclude: ["crypto"],
  },
  define: {
    global: "globalThis",
  },
}));
