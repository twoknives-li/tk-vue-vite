/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly DZ_API: string;
    // 更多环境变量...
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  export default component
}
