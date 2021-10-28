interface ImportMetaEnv {
  readonly VITE_API_USER: string
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
