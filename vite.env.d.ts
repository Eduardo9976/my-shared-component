/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BFF: string
  // Adicione outras variáveis de ambiente aqui conforme necessário
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
