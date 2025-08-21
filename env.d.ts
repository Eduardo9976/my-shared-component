/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly USERNAME: string
  readonly PASSWORD: string
  readonly VITE_MEWEB: string
  readonly VITE_BFF: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import type {DefineComponent} from 'vue'
  const component: DefineComponent<
    Record<string, unknown>,
    Record<string, unknown>,
    unknown
  >
  export default component
}
