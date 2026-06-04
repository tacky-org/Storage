import * as _tanstack_query_core from '@tanstack/query-core';
import * as _tanstack_react_query from '@tanstack/react-query';
import { MutationOptions } from '@tanstack/react-query';

/**
 * The contract a custom store adapter must satisfy.
 * Used as the escape hatch when you need something other than Web Storage
 * (e.g. an in-memory store for tests, or an IndexedDB wrapper).
 *
 * Mirrors the shape expected by React's useSyncExternalStore.
 */
interface ExternalStore<T = unknown> {
    getItem(): T | null;
    setItem(value: T): void;
    /** Returns an unsubscribe function. */
    subscribe(listener: () => void): () => void;
}
/** The prefix applied to every key written to Web Storage. */
declare const STORAGE_KEY_PREFIX: "storage__";
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
interface StorageStoreOptions<TData> extends StorageStoreBase<TData> {
    defaultValue?: never;
    map?: never;
    unmap?: never;
}
/** No transform, with default — get() returns TData. */
interface StorageStoreOptionsWithDefault<TData> extends StorageStoreBase<TData> {
    /** Returned when the store is empty (key absent). Bypasses validate. */
    defaultValue: TData;
    map?: never;
    unmap?: never;
}
/** With transform, no default — get() returns TRuntime | null. */
interface StorageStoreOptionsWithMap<TData, TRuntime> extends StorageStoreBase<TData> {
    defaultValue?: never;
    /** Transforms validated TData into the runtime representation. */
    map: (data: TData) => TRuntime;
    /** Inverse of map. Transforms TRuntime back into TData for storage. */
    unmap: (runtime: TRuntime) => TData;
}
/** With transform and default — get() returns TRuntime. */
interface StorageStoreOptionsWithMapAndDefault<TData, TRuntime> extends StorageStoreBase<TData> {
    /** Returned when the store is empty (key absent). Bypasses validate and map. */
    defaultValue: TRuntime;
    /** Transforms validated TData into the runtime representation. */
    map: (data: TData) => TRuntime;
    /** Inverse of map. Transforms TRuntime back into TData for storage. */
    unmap: (runtime: TRuntime) => TData;
}
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
interface StorageRegistry {
}
/**
 * Resolves to StorageRegistry[K] when K is a registered key,
 * otherwise falls back to TFallback.
 */
type ResolveStorage<K extends string, TFallback = unknown> = K extends keyof StorageRegistry ? StorageRegistry[K] : TFallback;

type AnyOptions<TData, TRuntime> = StorageStoreOptions<TData> | StorageStoreOptionsWithDefault<TData> | StorageStoreOptionsWithMap<TData, TRuntime> | StorageStoreOptionsWithMapAndDefault<TData, TRuntime>;
/**
 * TResult is the return type of get():
 *   - TRuntime | null  when no defaultValue is provided (null = key absent, not loading)
 *   - TRuntime         when defaultValue is provided
 */
declare class StorageStore<TData, TRuntime = TData, TResult = TRuntime | null> {
    private readonly options;
    private readonly externalStore;
    constructor(options: AnyOptions<TData, TRuntime>);
    static create<TData>(options: StorageStoreOptions<TData>): StorageStore<TData, TData, TData | null>;
    static create<TData>(options: StorageStoreOptionsWithDefault<TData>): StorageStore<TData, TData, TData>;
    static create<TData, TRuntime>(options: StorageStoreOptionsWithMap<TData, TRuntime>): StorageStore<TData, TRuntime, TRuntime | null>;
    static create<TData, TRuntime>(options: StorageStoreOptionsWithMapAndDefault<TData, TRuntime>): StorageStore<TData, TRuntime, TRuntime>;
    get(): TResult;
    set(value: TRuntime): void;
    patch(partial: Partial<TRuntime>): void;
    subscribe(listener: () => void): () => void;
    /**
     * The TanStack Query key for this store.
     * Matches the key written to Web Storage: `storage__<key>`.
     */
    get queryKey(): readonly [string];
}

type StoragePipelineStep = "read" | "validate" | "map" | "unmap" | "write";
/**
 * Thrown when any step of the StorageStore pipeline fails.
 * Inspect `step` to know where the failure occurred and `cause` for the original error.
 *
 * Read pipeline:  read → validate → map
 * Write pipeline: unmap → write
 *
 * @example
 * try {
 *   store.set(value);
 * } catch (err) {
 *   if (err instanceof StoragePipelineError) {
 *     console.error(`Failed at step "${err.step}":`, err.cause);
 *   }
 * }
 */
declare class StoragePipelineError extends Error {
    readonly step: StoragePipelineStep;
    constructor(step: StoragePipelineStep, cause: unknown);
}

/**
 * Wraps a StorageStore into a TanStack Query options object.
 * The query key is derived from the store's external key.
 * The result is cached indefinitely — it re-reads only when the store emits a change.
 *
 * Useful for advanced TanStack patterns (prefetching, queryClient.fetchQuery, etc.).
 * For component usage prefer useStorageQuery or useStorageSuspenseQuery directly.
 *
 * @example
 * const themeQuery = createStorageQuery(themeStore);
 *
 * // prefetch outside a component:
 * await queryClient.prefetchQuery(themeQuery);
 */
declare function createStorageQuery<TData, TRuntime, TResult>(store: StorageStore<TData, TRuntime, TResult>): _tanstack_query_core.OmitKeyof<_tanstack_react_query.UseQueryOptions<TResult, Error, TResult, readonly [string]>, "queryFn"> & {
    queryFn?: _tanstack_query_core.QueryFunction<TResult, readonly [string], never> | undefined;
} & {
    queryKey: readonly [string] & {
        [dataTagSymbol]: TResult;
        [dataTagErrorSymbol]: Error;
    };
};

/**
 * Wraps a StorageStore's set method into a TanStack mutation options object.
 * Pass the result to useMutation.
 *
 * Use the useMutation onSuccess callback to invalidate related queries
 * via useQueryClient().
 *
 * @example
 * const queryClient = useQueryClient();
 * const mutation = useMutation({
 *   ...createStorageMutation(userPrefsStore),
 *   onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user_prefs'] }),
 * });
 *
 * mutation.mutate(newPrefs);
 */
declare function createStorageMutation<TData, TRuntime, TResult>(store: StorageStore<TData, TRuntime, TResult>): MutationOptions<void, Error, TRuntime>;

/**
 * Reads from a StorageStore and keeps the result in sync with external changes.
 * Returns isLoading, isError and error for inline state handling — no <Suspense> needed.
 * Use useStorageSuspenseQuery when you prefer Suspense boundaries.
 *
 * data is TRuntime when a defaultValue is set, TRuntime | undefined otherwise.
 *
 * @example
 * const { data: theme, isLoading, isError } = useStorageQuery(themeStore);
 */
declare function useStorageQuery<TData, TRuntime, TResult>(store: StorageStore<TData, TRuntime, TResult>): _tanstack_react_query.UseQueryResult<NoInfer<TResult>, Error>;

/**
 * Reads from a StorageStore and keeps the result in sync with external changes.
 * Must be wrapped in a <Suspense> boundary.
 * Use useStorageQuery for inline loading/error states without Suspense.
 *
 * data is TRuntime when a defaultValue is set, TRuntime | undefined otherwise.
 *
 * @example
 * const { data: theme } = useStorageSuspenseQuery(themeStore);
 */
declare function useStorageSuspenseQuery<TData, TRuntime, TResult>(store: StorageStore<TData, TRuntime, TResult>): _tanstack_react_query.UseSuspenseQueryResult<TResult, Error>;

/**
 * Writes to a StorageStore and invalidates its query on success.
 * Returns set() and patch() methods — both handle invalidation automatically.
 * Errors from the write pipeline (StoragePipelineError) surface via isError / error.
 *
 * @example
 * const mutation = useStorageMutation(userPrefsStore);
 *
 * mutation.set({ theme: 'dark', language: 'en', notifications: true });
 * mutation.patch({ theme: 'dark' });
 */
declare function useStorageMutation<TData, TRuntime, TResult>(store: StorageStore<TData, TRuntime, TResult>): {
    set: (value: TRuntime) => void;
    patch: (partial: Partial<TRuntime>) => void;
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    error: Error | null;
    reset: () => void;
};

/**
 * Subscribes to a StorageStore and invalidates its query whenever the store emits a change.
 *
 * useStorageQuery and useStorageSuspenseQuery call this automatically.
 * Use it directly only when you need the subscription at a different level
 * than where you read — e.g. at the app root, outside the component that renders the data.
 *
 * @example
 * function App() {
 *   useStorageSync(themeStore);
 * }
 */
declare function useStorageSync<TData, TRuntime, TResult>(store: StorageStore<TData, TRuntime, TResult>): void;

/**
 * Creates an in-memory ExternalStore.
 * Use as the `store` option in StorageStore.create for tests and Storybook —
 * no browser storage, no network.
 *
 * The store notifies subscribers synchronously on every setItem call,
 * so all hooks work exactly as they would against real browser storage.
 *
 * @example
 * const store = StorageStore.create({
 *   key:   'theme',
 *   store: fromMemory('dark'),
 *   validate: withZod(ThemeSchema),
 * });
 */
declare function fromMemory(initial?: unknown): ExternalStore;

interface ParseableSchema<T> {
    parse: (raw: unknown) => T;
}
/**
 * Creates a validate function from any Zod-compatible schema.
 *
 * @example
 * import { z } from 'zod';
 * const UserPrefsSchema = z.object({ theme: z.string() });
 *
 * const userPrefsStore = StorageStore.create({
 *   store: fromWebStorage(localStorage, 'user_prefs'),
 *   validate: withZod(UserPrefsSchema),
 * });
 */
declare function withZod<T>(schema: ParseableSchema<T>): (raw: unknown) => T;
interface YupSchema<T> {
    validateSync: (value: unknown, options?: object) => T;
}
/**
 * Creates a validate function from a Yup schema.
 *
 * @example
 * import { object, string } from 'yup';
 * const UserPrefsSchema = object({ theme: string().required() });
 *
 * const userPrefsStore = StorageStore.create({
 *   store: fromWebStorage(localStorage,'user_prefs'),
 *   validate: withYup(UserPrefsSchema),
 * });
 */
declare function withYup<T>(schema: YupSchema<T>): (raw: unknown) => T;
interface JoiSchema<T> {
    validate: (value: unknown, options?: object) => {
        error?: Error;
        value: T;
    };
}
/**
 * Creates a validate function from a Joi schema.
 *
 * @example
 * import Joi from 'joi';
 * const UserPrefsSchema = Joi.object({ theme: Joi.string().required() });
 *
 * const userPrefsStore = StorageStore.create({
 *   store: fromWebStorage(localStorage,'user_prefs'),
 *   validate: withJoi(UserPrefsSchema),
 * });
 */
declare function withJoi<T>(schema: JoiSchema<T>): (raw: unknown) => T;
type ValibotParser<T> = (data: unknown) => T;
/**
 * Creates a validate function from a Valibot schema.
 *
 * @example
 * import * as v from 'valibot';
 * const UserPrefsSchema = v.object({ theme: v.string() });
 *
 * const userPrefsStore = StorageStore.create({
 *   store: fromWebStorage(localStorage,'user_prefs'),
 *   validate: withValibot((data) => v.parse(UserPrefsSchema, data)),
 * });
 */
declare function withValibot<T>(parser: ValibotParser<T>): (raw: unknown) => T;

export { type ExternalStore, type ResolveStorage, STORAGE_KEY_PREFIX, StoragePipelineError, type StoragePipelineStep, type StorageRegistry, StorageStore, type StorageStoreOptions, type StorageStoreOptionsWithDefault, type StorageStoreOptionsWithMap, type StorageStoreOptionsWithMapAndDefault, createStorageMutation, createStorageQuery, fromMemory, useStorageMutation, useStorageQuery, useStorageSuspenseQuery, useStorageSync, withJoi, withValibot, withYup, withZod };
