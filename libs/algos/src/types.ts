export type ObjectLike<T> = Record<string, T>;
export type ObjectKeyPath = string | string[];
export type ObjectFilter<T> = (value?: T, key?: string, object?: ObjectLike<T>) => boolean;
export type ObjectMapper<T> = (value?: T, key?: string, object?: ObjectLike<T>) => any;

export interface PickOmit {
  <T extends Record<string, unknown>, K extends [...(keyof T)[]]>(
    obj: T,
    keys: K,
  ): {
    [K2 in Exclude<keyof T, K[number]>]: T[K2];
  };
}