import { useQuery } from "@tanstack/react-query";
import { StorageStore } from "@/Domain/StorageStore";
import { useStorageSync } from "./useStorageSync";

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
export function useStorageQuery<TData, TRuntime, TResult>(
  store: StorageStore<TData, TRuntime, TResult>,
) {
  useStorageSync(store);
  return useQuery({
    queryKey: store.queryKey,
    queryFn: (): TResult => store.get(),
    staleTime: Infinity,
  });
}
