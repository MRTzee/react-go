/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_ROOT: string
    // tambahkan env vars lain di sini jika ada
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }