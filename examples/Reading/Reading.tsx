import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StorageStore, fromMemory, useStorageQuery, useStorageSuspenseQuery } from "@/index";
import { ErrorBoundary } from "../_shared/ErrorBoundary";
import { DEFAULT_USER_PREFS, UserPrefs, validateUserPrefs } from "../_shared/UserPrefs";

const queryClient = new QueryClient();

// ─── with defaultValue — data is always TRuntime ──────────────────────────────

const storeWithDefault = StorageStore.create<UserPrefs>({
  key:          "reading_with_default",
  store:        fromMemory(),
  validate:     validateUserPrefs,
  defaultValue: DEFAULT_USER_PREFS,  // get() → UserPrefs (never null)
});

const SuspenseWithDefault = () => {
  const { data: prefs } = useStorageSuspenseQuery(storeWithDefault);
  // TypeScript: data is UserPrefs — no null check needed
  return <p>Theme: <strong>{prefs.theme}</strong> | Language: <strong>{prefs.language}</strong></p>;
};

export const WithDefaultValue = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <Suspense fallback={<p>Loading…</p>}>
        <SuspenseWithDefault />
      </Suspense>
    </ErrorBoundary>
  </QueryClientProvider>
);

// ─── without defaultValue — data is TRuntime | null ──────────────────────────
// null means "key absent" — distinct from undefined which means "still loading"

const storeWithoutDefault = StorageStore.create<UserPrefs>({
  key:      "reading_no_default",
  store:    fromMemory(),  // empty — returns null on first read
  validate: validateUserPrefs,
  // no defaultValue → get() returns UserPrefs | null
});

const SuspenseWithoutDefault = () => {
  const { data: prefs } = useStorageSuspenseQuery(storeWithoutDefault);
  // TypeScript: data is UserPrefs | null — must handle null
  if (prefs === null) return <p><em>Nothing saved yet.</em></p>;
  return <p>Theme: <strong>{prefs.theme}</strong></p>;
};

export const WithoutDefaultValue = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <Suspense fallback={<p>Loading…</p>}>
        <SuspenseWithoutDefault />
      </Suspense>
    </ErrorBoundary>
  </QueryClientProvider>
);

// ─── useStorageQuery — inline loading + error states ─────────────────────────

const inlineStore = StorageStore.create<UserPrefs>({
  key:          "reading_inline",
  store:        fromMemory(),
  validate:     validateUserPrefs,
  defaultValue: DEFAULT_USER_PREFS,
});

const InlineDisplay = () => {
  const { data: prefs, isLoading, isError, error } = useStorageQuery(inlineStore);

  if (isLoading) return <p>Loading…</p>;
  if (isError)   return <p style={{ color: "red" }}>Error: {String(error)}</p>;
  if (!prefs)    return <p><em>Nothing saved yet.</em></p>;

  return <p>Theme: <strong>{prefs.theme}</strong> | Language: <strong>{prefs.language}</strong></p>;
};

export const InlineStates = () => (
  <QueryClientProvider client={queryClient}>
    <InlineDisplay />
  </QueryClientProvider>
);
