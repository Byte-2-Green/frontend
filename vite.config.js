import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    port: Number(process.env.PORT) || 5173,
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@routes': path.resolve(__dirname, 'src/routes'),
    },
  },
});