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
        throw new Error(`Could not resolve ${key.toString()}`)
    }
    return resolved;
}

/**
 * App Module
 */
export * from './app/store';
/**
 * Shop Module
 */
export * from './shop/store';
export * from './shop/types';
export * from './shop/service';
/**
 * 
 */
export * from './user/store';
export * from './user/service';
export * from './user/types';