import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://211.149.253.38/', //后台接口，请求的目标地址的BaseURL
        changeOrigin: true, //是否开启跨域
      }
    }
  }
})
