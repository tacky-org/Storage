import React, { Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  StorageStore,
  StoragePipelineError,
  ExternalStore,
  fromMemory,
  useStorageMutation,
  useStorageSuspenseQuery,
} from "@/index";
import { ErrorBoundary } from "../../_shared/ErrorBoundary";
import { DEFAULT_USER_PREFS, UserPrefs, validateUserPrefs } from "../../_shared/UserPrefs";

// ─── write step error — setItem throws ───────────────────────────────────────

const fullStorage: ExternalStore = {
  getItem:   () => null,
  setItem:   () => { throw new DOMException("QuotaExceededError", "QuotaExceededError"); },
  subscribe: () => () => {},
};

const writeErrorStore = StorageStore.create<UserPrefs>({
  key:          "error_write",
  store:        fullStorage,
  validate:     validateUserPrefs,
  defaultValue: DEFAULT_USER_PREFS,
});

// ─── unmap step error — unmap throws ─────────────────────────────────────────

interface StoredPrefs { theme: string; language: string; notifications: boolean }

const unmapErrorStore = StorageStore.create<StoredPrefs, UserPrefs>({
  key:          "error_unmap",
  store:        fromMemory(),
  validate:     (raw) => raw as StoredPrefs,
  defaultValue: DEFAULT_USER_PREFS,
  map:          (data) => data as UserPrefs,
  unmap:        () => { throw new Error("Unmap failed: value did not meet storage constraints"); },
});

// ─── shared ───────────────────────────────────────────────────────────────────

const MutationError = ({ error }: { error: Error | null }) => {
  if (!error) return null;
  if (error instanceof StoragePipelineError) {
    return (
      <p style={{ color: "red" }}>
        Write failed at step <code>{error.step}</code>:{" "}
        {error.cause instanceof Error ? error.cause.message : String(error.cause)}
      </p>
    );
  }
  return <p style={{ color: "red" }}>{error.message}</p>;
};

// ─── write step example ───────────────────────────────────────────────────────

const WriteErrorControls = () => {
  const mutation = useStorageMutation(writeErrorStore);

  useEffect(() => {
    mutation.set({ theme: "dark", language: "en", notifications: true });
  }, []);

  return (
    <div>
      <p>Attempted to write <code>{`{ theme: "dark", language: "en", notifications: true }`}</code></p>
      <MutationError error={mutation.error} />
      <button onClick={() => mutation.set({ theme: "dark", language: "en", notifications: true })}>
        Retry
      </button>
    </div>
  );
};

const writeQueryClient = new QueryClient();

export const WriteStepError = () => (
  <QueryClientProvider client={writeQueryClient}>
    <ErrorBoundary>
      <Suspense fallback={<p>Loading…</p>}>
        <WriteErrorControls />
      </Suspense>
    </ErrorBoundary>
  </QueryClientProvider>
);

// ─── unmap step example ───────────────────────────────────────────────────────

const UnmapErrorControls = () => {
  const mutation = useStorageMutation(unmapErrorStore);

  useEffect(() => {
    mutation.set({ theme: "dark", language: "en", notifications: true });
  }, []);

  return (
    <div>
      <p>Attempted to write <code>{`{ theme: "dark", language: "en", notifications: true }`}</code></p>
      <MutationError error={mutation.error} />
      <button onClick={() => mutation.set({ theme: "dark", language: "en", notifications: true })}>
        Retry
      </button>
    </div>
  );
};

const unmapQueryClient = new QueryClient();

export const UnmapStepError = () => (
  <QueryClientProvider client={unmapQueryClient}>
    <ErrorBoundary>
      <Suspense fallback={<p>Loading…</p>}>
        <UnmapErrorControls />
      </Suspense>
    </ErrorBoundary>
  </QueryClientProvider>
);
