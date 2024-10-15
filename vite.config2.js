import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: './',
  build: {
    outDir: '/Users/willy/Desktop/bunnySugar/src/main/resources/static',
    assetsDir: 'assets',
    imgZip: 'public/imgZip'
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '127.0.0.1',
    port: 5174, // 指定不同的端口號
  }
})
