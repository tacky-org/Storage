import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StorageStore, StoragePipelineError, fromMemory, useStorageSuspenseQuery } from "@/index";
import { ErrorBoundary } from "../_shared/ErrorBoundary";
import { validateUserPrefs } from "../_shared/UserPrefs";

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

// ─── shared error fallback ────────────────────────────────────────────────────

const PipelineFallback = ({ error }: { error: Error }) => {
  if (!(error instanceof StoragePipelineError)) {
    return <p style={{ color: "red" }}>Unexpected error: {error.message}</p>;
  }
  return (
    <div style={{ color: "red", fontFamily: "monospace" }}>
      <strong>StoragePipelineError</strong>
      <ul>
        <li>step: <code>{error.step}</code></li>
        <li>message: {error.message}</li>
        <li>cause: {String(error.cause)}</li>
      </ul>
    </div>
  );
};

// ─── validate step error ──────────────────────────────────────────────────────
// The store holds data that fails validation.

const validateErrorStore = StorageStore.create({
  key:      "error_validate",
  store:    fromMemory({ theme: "INVALID", language: 42, notifications: "yes" }),
  validate: validateUserPrefs,
  // no defaultValue — goes through validate and throws
});

const ValidateErrorDisplay = () => {
  const { data } = useStorageSuspenseQuery(validateErrorStore);
  return <p>{String(data)}</p>;
};

export const ValidateError = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary fallback={(e: Error) => <PipelineFallback error={e} />}>
      <Suspense fallback={<p>Loading…</p>}>
        <ValidateErrorDisplay />
      </Suspense>
    </ErrorBoundary>
  </QueryClientProvider>
);

// ─── read step error ──────────────────────────────────────────────────────────
// The store holds a value that cannot be JSON-parsed (bad JSON string).
// The read step throws before validate is even called.

const readErrorStore = StorageStore.create({
  key:      "error_read",
  store:    fromMemory("{ not valid json"),
  validate: validateUserPrefs,
});

const ReadErrorDisplay = () => {
  const { data } = useStorageSuspenseQuery(readErrorStore);
  return <p>{String(data)}</p>;
};

export const ReadError = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary fallback={(e: Error) => <PipelineFallback error={e} />}>
      <Suspense fallback={<p>Loading…</p>}>
        <ReadErrorDisplay />
      </Suspense>
    </ErrorBoundary>
  </QueryClientProvider>
);
