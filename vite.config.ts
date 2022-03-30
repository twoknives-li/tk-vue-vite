import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
  const envConfig = loadEnv(mode,'./env')
  const result = {
    plugins: [vue() ],
    envDir: './env',
    envPrefix: ['VITE_','DZ_'],
    build:{
      manifest: true,
      outDir: `./dist/${mode}`
    }
  };
  return result;
})