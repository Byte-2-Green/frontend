import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      '@routes': path.resolve(__dirname, 'src/routes'),
    },
  },
  server: {
    host: true, // Allow external access
    strictPort: true, // Ensures Vite uses the exact port specified
    origin: 'https://frontend-docker.onrender.com', // origin for the app
  },
});
