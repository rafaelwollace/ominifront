/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  // Outras variáveis de ambiente podem ser definidas aqui
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
