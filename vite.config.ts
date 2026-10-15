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
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, _req, _res) => {
            // Rewrite Origin and Referer to match backend domain so Spring Security doesn't block with 403 Invalid CORS request
            proxyReq.setHeader('Origin', 'https://api-uat.vinhomes.biz.vn');
            proxyReq.setHeader('Referer', 'https://api-uat.vinhomes.biz.vn/');
          });
        },
      },
    },
  },
})
