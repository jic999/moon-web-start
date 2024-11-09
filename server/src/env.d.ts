declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    FAVICON_SIZE: string
    DATA_ID_SALT: string
    PORT: string
  }
}
