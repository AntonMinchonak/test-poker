export {};

declare global {
  type MapValue<T> = T extends object ? T[keyof T] : never;
}
