import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
  }
})
