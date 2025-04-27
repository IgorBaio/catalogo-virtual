import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  base: '/catalogo-virtual/',
  plugins: [react(), tailwindcss()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'legacy',
        includePaths: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'src/styles'),
          path.resolve(__dirname, 'src')
        ]
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
