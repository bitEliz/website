/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly BLOG_API_BASE_URL: string
  readonly BLOG_API_UID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
