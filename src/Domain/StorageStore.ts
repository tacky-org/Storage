import {
  ExternalStore,
  STORAGE_KEY_PREFIX,
  StorageStoreOptions,
  StorageStoreOptionsWithDefault,
  StorageStoreOptionsWithMap,
  StorageStoreOptionsWithMapAndDefault,
} from "@/Types";
import { StoragePipelineError } from "@/Errors/StoragePipelineError";

type AnyOptions<TData, TRuntime> =
  | StorageStoreOptions<TData>
  | StorageStoreOptionsWithDefault<TData>
  | StorageStoreOptionsWithMap<TData, TRuntime>
  | StorageStoreOptionsWithMapAndDefault<TData, TRuntime>;

function isWebStorage(store: Storage | ExternalStore): store is Storage {
  return "clear" in store;
}

function toExternalStore(
  key: string,
  store: Storage | ExternalStore,
): ExternalStore {
  if (!isWebStorage(store)) return store;

  const prefixedKey = `${STORAGE_KEY_PREFIX}${key}`;
  return {
    getItem() {
      const item = store.getItem(prefixedKey);
      if (item === null) return null;
      try {
        return JSON.parse(item) as unknown;
      } catch {
        throw new Error(`Storage key "${prefixedKey}" contains invalid JSON`);
      }
    },
    setItem(value) {
      store.setItem(prefixedKey, JSON.stringify(value));
    },
    removeItem() {
      store.removeItem(prefixedKey);
    },
    subscribe(listener) {
      const handler = (event: StorageEvent) => {
        if (event.storageArea === store && event.key === prefixedKey) {
          listener();
        }
      };
      window.addEventListener("storage", handler);
      return () => window.removeEventListener("storage", handler);
    },
  };
}

/**
 * TResult is the return type of get():
 *   - TRuntime | null  when no defaultValue is provided (null = key absent, not loading)
 *   - TRuntime         when defaultValue is provided
 */
export class StorageStore<TData, TRuntime = TData, TResult = TRuntime | null> {
  private readonly options: AnyOptions<TData, TRuntime>;
  private readonly externalStore: ExternalStore;

  constructor(options: AnyOptions<TData, TRuntime>) {
    this.options = options;
    this.externalStore = toExternalStore(options.key, options.store);
  }

  // ─── no transform, no default → get() returns TData | null ───────────────
  static create<TData>(
    options: StorageStoreOptions<TData>,
  ): StorageStore<TData, TData, TData | null>;

  // ─── no transform, with default → get() returns TData ────────────────────
  static create<TData>(
    options: StorageStoreOptionsWithDefault<TData>,
  ): StorageStore<TData, TData, TData>;

  // ─── with transform, no default → get() returns TRuntime | null ──────────
  static create<TData, TRuntime>(
    options: StorageStoreOptionsWithMap<TData, TRuntime>,
  ): StorageStore<TData, TRuntime, TRuntime | null>;

  // ─── with transform, with default → get() returns TRuntime ───────────────
  static create<TData, TRuntime>(
    options: StorageStoreOptionsWithMapAndDefault<TData, TRuntime>,
  ): StorageStore<TData, TRuntime, TRuntime>;

  static create<TData, TRuntime>(
    options: AnyOptions<TData, TRuntime>,
  ): StorageStore<TData, TRuntime, TRuntime | null> {
    return new StorageStore(options);
  }

  get(): TResult {
    let raw: unknown;
    try {
      raw = this.externalStore.getItem();
    } catch (cause) {
      throw new StoragePipelineError("read", cause);
    }

    if (raw === null) {
      return (this.options.defaultValue ?? null) as unknown as TResult;
    }

    let data: TData;
    try {
      data = this.options.validate(raw);
    } catch (cause) {
      throw new StoragePipelineError("validate", cause);
    }

    if (this.options.map) {
      try {
        return this.options.map(data) as unknown as TResult;
      } catch (cause) {
        throw new StoragePipelineError("map", cause);
      }
    }

    return data as unknown as TResult; // TData → TRuntime → TResult via unknown
  }

  set(value: TRuntime): void {
    let data: TData;
    if (this.options.unmap) {
      try {
        data = this.options.unmap(value);
      } catch (cause) {
        throw new StoragePipelineError("unmap", cause);
      }
    } else {
      data = value as unknown as TData;
    }

    try {
      this.externalStore.setItem(data);
    } catch (cause) {
      throw new StoragePipelineError("write", cause);
    }
  }

  patch(partial: Partial<TRuntime>): void {
    const current = this.get() as TRuntime | null;
    this.set({ ...current, ...partial } as TRuntime);
  }

  /** Removes the stored value. get() returns null (or defaultValue) after this. */
  reset(): void {
    try {
      this.externalStore.removeItem();
    } catch (cause) {
      throw new StoragePipelineError("write", cause);
    }
  }

  subscribe(listener: () => void): () => void {
    return this.externalStore.subscribe(listener);
  }

  /**
   * The TanStack Query key for this store.
   * Matches the key written to Web Storage: `storage__<key>`.
   */
  get queryKey(): readonly [string] {
    return [`${STORAGE_KEY_PREFIX}${this.options.key}`] as const;
  }
}
