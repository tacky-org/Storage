import { queryOptions } from "@tanstack/react-query";
import { StorageStore } from "@/Domain/StorageStore";

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
export function createStorageQuery<TData, TRuntime, TResult>(
  store: StorageStore<TData, TRuntime, TResult>,
) {
  return queryOptions({
    queryKey: store.queryKey,
    queryFn: () => store.get(),
    staleTime: Infinity,
  });
}
