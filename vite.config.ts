import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'


export default defineConfig(({mode})=>{
  const envConfig = loadEnv(mode,'./env')
  plugins: [vue()]
  const result = {
    plugins: [vue() ],
    envDir: './env',
    envPrefix: ['VITE_','DZ_'],
    build:{
      manifest: true,
      outDir: `./dist/${mode}`
    },
    server: {
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: 'http://211.149.253.38/', //后台接口，请求的目标地址的BaseURL
          changeOrigin: true, //是否开启跨域
        }
      }
    }
  };
  return result;
})