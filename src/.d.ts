/// <reference types="vite/client" />

declare module '*.vue' {
  import Vue from 'vue';
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  // const component: DefineComponent<{}, {}, any>
  const Component: ReturnType<typeof defineComponent>;
  interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly DZ_API: string;
    // 更多环境变量...
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  interface Vue {
    $api: string
  }
  export default component
}