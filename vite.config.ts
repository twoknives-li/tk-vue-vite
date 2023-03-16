import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const envConfig = loadEnv(mode, "./env");
  const getViteEnv = (mode, target) => {
    return loadEnv(mode, process.cwd())[target];
  };
  const { resolve } = path;
  const env = loadEnv(mode, process.cwd());
  const result = {
    envConfig: envConfig,
    envDir: "./env",
    envPrefix: ["VITE_", "DZ_"],
    plugins: [
      vue(),
      createHtmlPlugin({
        inject: {
          data: {
            //将环境变量 VITE_APP_TITLE 赋值给 title 方便 html页面使用 title 获取系统标题
            title: getViteEnv(mode, "VITE_APP_TITLE"),
          },
        },
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        api: "@/api",
        views: "@/views",
        plugins: "@/plugins",
      },
    },
    server: {
      host: "0.0.0.0",
      port: 6400,
      proxy: {
        "/api": {
          target: process.env.VUE_APP_PROXY_TARGET, //后台接口，请求的目标地址的BaseURL
          changeOrigin: true, //是否开启跨域
        },
      },
    },
    // build configure
    build: {
      outDir: "dist",
      // esbuild 打包更快，但是不能去除 console.log
      minify: "esbuild",
      // minify: "terser",
      // terserOptions: {
      // 	compress: {
      // 		drop_console: viteEnv.VITE_DROP_CONSOLE,
      // 		drop_debugger: true
      // 	}
      // },
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        },
      },
    },
  };
  return result;
});
