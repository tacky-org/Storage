import React, { Suspense, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StorageStore, ExternalStore, prefetchStorage, useStorageSuspenseQuery } from "@/index";
import { ErrorBoundary } from "../_shared/ErrorBoundary";
import { DEFAULT_USER_PREFS, UserPrefs, validateUserPrefs } from "../_shared/UserPrefs";

// Simulate an async ExternalStore (e.g. IndexedDB) with a short read delay.
const slowMemoryStore: ExternalStore = {
  getItem:    () => new Promise((resolve) => setTimeout(() => resolve(DEFAULT_USER_PREFS), 800)) as never,
  setItem:    () => {},
  removeItem: () => {},
  subscribe:  () => () => {},
};

const userPrefsStore = StorageStore.create<UserPrefs>({
  key:          "prefetch_demo",
  store:        slowMemoryStore,
  validate:     validateUserPrefs,
  defaultValue: DEFAULT_USER_PREFS,
});

const Display = () => {
  const { data: prefs } = useStorageSuspenseQuery(userPrefsStore);
  return (
    <ul>
      <li>Theme: {prefs.theme}</li>
      <li>Language: {prefs.language}</li>
    </ul>
  );
};

// ─── without prefetch — Suspense fallback shows for ~800ms ───────────────────

const withoutQueryClient = new QueryClient();

export const WithoutPrefetch = () => (
  <QueryClientProvider client={withoutQueryClient}>
    <ErrorBoundary>
      <Suspense fallback={<p><em>Loading prefs… (no prefetch)</em></p>}>
        <Display />
      </Suspense>
    </ErrorBoundary>
  </QueryClientProvider>
);

// ─── with loader — router waits, then renders without suspend ─────────────────

const loaderQueryClient = new QueryClient();

export const WithLoader = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Simulates: loader: ({ context: { queryClient } }) => prefetchStorage(userPrefsStore, queryClient)
    prefetchStorage(userPrefsStore, loaderQueryClient).then(() => setReady(true));
  }, []);

  if (!ready) return <p><em>Route loader running…</em></p>;

  return (
    <QueryClientProvider client={loaderQueryClient}>
      <ErrorBoundary>
        <Suspense fallback={<p>This should not appear</p>}>
          <Display />
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

// ─── loader with return value — data also available via useLoaderData() ───────

const loaderDataQueryClient = new QueryClient();

const DisplayFromLoaderData = ({ prefs }: { prefs: UserPrefs }) => (
  <div>
    <p><strong>From useLoaderData():</strong></p>
    <ul>
      <li>Theme: {prefs.theme}</li>
      <li>Language: {prefs.language}</li>
    </ul>
  </div>
);

export const WithLoaderData = () => {
  const [loaderData, setLoaderData] = useState<UserPrefs | null>(null);

  useEffect(() => {
    // Simulates:
    // loader: async ({ context: { queryClient } }) => {
    //   const prefs = await prefetchStorage(userPrefsStore, queryClient);
    //   return { prefs };
    // }
    prefetchStorage(userPrefsStore, loaderDataQueryClient).then((prefs) => {
      if (prefs) setLoaderData(prefs);
    });
  }, []);

  if (!loaderData) return <p><em>Route loader running…</em></p>;

  return (
    <QueryClientProvider client={loaderDataQueryClient}>
      <ErrorBoundary>
        <DisplayFromLoaderData prefs={loaderData} />
        <p><strong>From useStorageSuspenseQuery() — same cached value:</strong></p>
        <Suspense fallback={null}>
          <Display />
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};
