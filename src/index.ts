// ─── core ─────────────────────────────────────────────────────────────────────
export { StorageStore } from "./Domain/StorageStore";
export { StoragePipelineError } from "./Errors/StoragePipelineError";
export type { StoragePipelineStep } from "./Errors/StoragePipelineError";

// ─── tanstack query integration ───────────────────────────────────────────────
export { createStorageQuery } from "./Query/createStorageQuery";
export { prefetchStorage } from "./Query/prefetchStorage";
export { createStorageMutation } from "./Query/createStorageMutation";
export { useStorageQuery } from "./Query/useStorageQuery";
export { useStorageSuspenseQuery } from "./Query/useStorageSuspenseQuery";
export { useStorageMutation } from "./Query/useStorageMutation";
export { useStorageSync } from "./Query/useStorageSync";

// ─── store adapters ───────────────────────────────────────────────────────────
export { fromMemory } from "./Adapters/stores";

// ─── validation adapters ──────────────────────────────────────────────────────
export { withZod, withYup, withJoi, withValibot } from "./Adapters/validators";

// ─── types ────────────────────────────────────────────────────────────────────
export type {
  ExternalStore,
  StorageStoreOptions,
  StorageStoreOptionsWithDefault,
  StorageStoreOptionsWithMap,
  StorageStoreOptionsWithMapAndDefault,
  StorageRegistry,
  ResolveStorage,
} from "./Types";
export { STORAGE_KEY_PREFIX } from "./Types";
