import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // 改為相對路徑
  build: {
    outDir: '/Users/willy/Desktop/bunnySugar/src/main/resources/static',
    assetsDir: 'assets', // Directly package to Spring Boot's static directory
    imgZip: 'public/imgZip'
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: { 
    host: '127.0.0.1', // 添加這一行
    port: 5173,        // 添加這一行（如果需要指定端口）
  }
})
