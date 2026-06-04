import { MutationOptions } from "@tanstack/react-query";
import { StorageStore } from "@/Domain/StorageStore";

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
export function createStorageMutation<TData, TRuntime, TResult>(
  store: StorageStore<TData, TRuntime, TResult>,
): MutationOptions<void, Error, TRuntime> {
  return {
    mutationFn: async (value: TRuntime) => {
      store.set(value);
    },
  };
}
