// ─── external store ───────────────────────────────────────────────────────────

/**
 * The contract a custom store adapter must satisfy.
 * Used as the escape hatch when you need something other than Web Storage
 * (e.g. an in-memory store for tests, or an IndexedDB wrapper).
 *
 * Mirrors the shape expected by React's useSyncExternalStore.
 */
export interface ExternalStore<T = unknown> {
  getItem(): T | null;
  setItem(value: T): void;
  /** Returns an unsubscribe function. */
  subscribe(listener: () => void): () => void;
}

// ─── store options ────────────────────────────────────────────────────────────

/** The prefix applied to every key written to Web Storage. */
export const STORAGE_KEY_PREFIX = "storage__" as const;

interface StorageStoreBase<TData> {
  /**
   * Identifier for this store.
   * Used as the TanStack Query key and, when backed by Web Storage,
   * written to the browser as `storage__<key>` to avoid collisions.
   */
  key: string;
  /**
   * Pass `localStorage` or `sessionStorage` for Web Storage,
   * or a custom ExternalStore (e.g. fromMemory) for tests and advanced use.
   */
  store: Storage | ExternalStore;
  validate: (raw: unknown) => TData;
}

/** No transform, no default — get() returns TData | null. */
export interface StorageStoreOptions<TData> extends StorageStoreBase<TData> {
  defaultValue?: never;
  map?: never;
  unmap?: never;
}

/** No transform, with default — get() returns TData. */
export interface StorageStoreOptionsWithDefault<
  TData,
> extends StorageStoreBase<TData> {
  /** Returned when the store is empty (key absent). Bypasses validate. */
  defaultValue: TData;
  map?: never;
  unmap?: never;
}

/** With transform, no default — get() returns TRuntime | null. */
export interface StorageStoreOptionsWithMap<
  TData,
  TRuntime,
> extends StorageStoreBase<TData> {
  defaultValue?: never;
  /** Transforms validated TData into the runtime representation. */
  map: (data: TData) => TRuntime;
  /** Inverse of map. Transforms TRuntime back into TData for storage. */
  unmap: (runtime: TRuntime) => TData;
}

/** With transform and default — get() returns TRuntime. */
export interface StorageStoreOptionsWithMapAndDefault<
  TData,
  TRuntime,
> extends StorageStoreBase<TData> {
  /** Returned when the store is empty (key absent). Bypasses validate and map. */
  defaultValue: TRuntime;
  /** Transforms validated TData into the runtime representation. */
  map: (data: TData) => TRuntime;
  /** Inverse of map. Transforms TRuntime back into TData for storage. */
  unmap: (runtime: TRuntime) => TData;
}

// ─── typed registry ───────────────────────────────────────────────────────────

/**
 * Extend via declaration merging to get compile-time type safety on store keys.
 *
 * @example
 * // your-app/storage.d.ts
 * declare module '@tacky-org/storage' {
 *   interface StorageRegistry {
 *     theme: Theme;
 *     user_prefs: UserPrefs;
 *   }
 * }
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface StorageRegistry {}

/**
 * Resolves to StorageRegistry[K] when K is a registered key,
 * otherwise falls back to TFallback.
 */
export type ResolveStorage<
  K extends string,
  TFallback = unknown,
> = K extends keyof StorageRegistry ? StorageRegistry[K] : TFallback;
