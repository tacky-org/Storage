import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { StorageStore } from "@/Domain/StorageStore";

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
export function useStorageSync<TData, TRuntime, TResult>(
  store: StorageStore<TData, TRuntime, TResult>,
): void {
  const queryClient = useQueryClient();

  useEffect(() => {
    return store.subscribe(() => {
      void queryClient.invalidateQueries({ queryKey: store.queryKey });
    });
  }, [queryClient, store]);
}
