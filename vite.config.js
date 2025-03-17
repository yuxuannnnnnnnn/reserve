import { defineConfig } from 'vite'

export default defineConfig({
  base: './',  // 使用相對路徑而非 '/reserve/'
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})