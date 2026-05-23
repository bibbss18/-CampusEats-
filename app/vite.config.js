import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  cacheDir: '/tmp/vite-cache',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'CampusEats App',
        short_name: 'CampusEats',
        description: 'Management Mese Cantina',
        theme_color: '#09090b',
        background_color: '#09090b',
        display: 'standalone',
        icons: [
          {
            src: '/icons/CE.icon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/CE.icon512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,

    hmr: {
      host: 'localhost',
      port: 5173
    },

    watch: {
      usePolling: true
    }
  }
})