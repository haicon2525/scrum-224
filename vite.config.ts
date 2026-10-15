import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/hovixi/api/v1': {
        target: 'https://api-uat.vinhomes.biz.vn',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
