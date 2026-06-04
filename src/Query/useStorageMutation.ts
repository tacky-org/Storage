import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StorageStore } from "@/Domain/StorageStore";

type StoreMutationAction<TRuntime> =
  | { type: "set"; value: TRuntime }
  | { type: "patch"; partial: Partial<TRuntime> }
  | { type: "reset" };

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
 * mutation.reset(); // removes the key — get() returns null (or defaultValue)
 */
export function useStorageMutation<TData, TRuntime, TResult>(
  store: StorageStore<TData, TRuntime, TResult>,
) {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, isSuccess, error, reset } = useMutation({
    mutationFn: async (action: StoreMutationAction<TRuntime>) => {
      if (action.type === "set") {
        store.set(action.value);
      } else if (action.type === "patch") {
        store.patch(action.partial);
      } else {
        store.reset();
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: store.queryKey });
    },
  });

  return {
    set:   (value: TRuntime)            => mutate({ type: "set",   value }),
    patch: (partial: Partial<TRuntime>) => mutate({ type: "patch", partial }),
    reset: ()                           => mutate({ type: "reset" }),
    isPending,
    isError,
    isSuccess,
    error,
  };
}
