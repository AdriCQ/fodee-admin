import { InjectionKey, inject } from 'vue';
/**
 * @description Use Vue inject with types
 * @param key Injectable key
 * @param fallback Default value
 * @returns Provided value for that key
 */
export function injectStrict<T>(key: InjectionKey<T>, fallback?: T) {
  const resolved = inject(key, fallback);
  if (!resolved) {
    throw new Error(`Could not resolve ${key.toString()}`);
  }
  return resolved;
}

/**
 * App Module
 */
export * from './app/store';
/**
 * Config
 */
export * from './comment/injectable';
export * from './config/injectable';
export * from './config/types';
/**
 * Dish
 */
export * from './dish/injectable';
export * from './dish/types';
/**
 * Event module
 */
export * from './event/injectable';
export * from './event/types';
/**
 *
 */
export * from './user/store';
export * from './user/service';
export * from './user/types';

export * from './reserve';
