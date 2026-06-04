import { useSuspenseQuery } from "@tanstack/react-query";
import { StorageStore } from "@/Domain/StorageStore";
import { useStorageSync } from "./useStorageSync";

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
export function useStorageSuspenseQuery<TData, TRuntime, TResult>(
  store: StorageStore<TData, TRuntime, TResult>,
) {
  useStorageSync(store);
  return useSuspenseQuery({
    queryKey: store.queryKey,
    queryFn: (): TResult => store.get(),
    staleTime: Infinity,
  });
}
