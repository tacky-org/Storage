import { ExternalStore } from "@/Types";

// ─── fromMemory ───────────────────────────────────────────────────────────────

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
export function fromMemory(initial: unknown = null): ExternalStore {
  let current: unknown = initial;
  const listeners = new Set<() => void>();

  return {
    getItem() {
      return current;
    },
    setItem(value) {
      current = value;
      listeners.forEach((l) => l());
    },
    removeItem() {
      current = null;
      listeners.forEach((l) => l());
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}
