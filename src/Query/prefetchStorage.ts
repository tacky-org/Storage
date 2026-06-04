import { QueryClient } from "@tanstack/react-query";
import { StorageStore } from "@/Domain/StorageStore";
import { createStorageQuery } from "./createStorageQuery";

/**
 * Ensures storage data is in the TanStack Query cache before a route renders.
 * Returns cached data immediately if already loaded, otherwise reads and caches it.
 *
 * Use in TanStack Router's beforeLoad or loader to guarantee data is available
 * the moment a component calls useStorageSuspenseQuery.
 *
 * @example
 * // route.ts
 * export const Route = createFileRoute('/app')({
 *   beforeLoad: ({ context: { queryClient } }) =>
 *     prefetchStorage(userPrefsStore, queryClient),
 * });
 */
export function prefetchStorage<TData, TRuntime, TResult>(
  store: StorageStore<TData, TRuntime, TResult>,
  queryClient: QueryClient,
): Promise<TResult> {
  return queryClient.ensureQueryData(createStorageQuery(store));
}
