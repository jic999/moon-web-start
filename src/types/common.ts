export type CommonProperties<T, U> = {
  [K in Extract<keyof T, keyof U>]: T[K] | U[K];
}
