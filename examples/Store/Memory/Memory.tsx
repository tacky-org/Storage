import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StorageStore, fromMemory, useStorageMutation, useStorageSuspenseQuery } from "@/index";
import { ErrorBoundary } from "../../_shared/ErrorBoundary";
import { DEFAULT_USER_PREFS, UserPrefs, validateUserPrefs } from "../../_shared/UserPrefs";

// fromMemory is an in-memory ExternalStore.
// No browser storage, no network — ideal for tests and Storybook.
// Subscribers are notified synchronously on every write.

const store = StorageStore.create<UserPrefs>({
  key:          "memory_prefs",
  store:        fromMemory(),
  validate:     validateUserPrefs,
  defaultValue: DEFAULT_USER_PREFS,
});

const queryClient = new QueryClient();

const Display = () => {
  const { data: prefs } = useStorageSuspenseQuery(store);
  return (
    <ul>
      <li>Theme: {prefs.theme}</li>
      <li>Language: {prefs.language}</li>
      <li>Notifications: {prefs.notifications ? "On" : "Off"}</li>
    </ul>
  );
};

const Controls = () => {
  const mutation = useStorageMutation(store);
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <button onClick={() => mutation.set({ theme: "dark",  language: "en", notifications: true })}>
        Dark / EN / On
      </button>
      <button onClick={() => mutation.set({ theme: "light", language: "fr", notifications: false })}>
        Light / FR / Off
      </button>
    </div>
  );
};

export const MemoryStore = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <Suspense fallback={<p>Loading…</p>}>
        <Display />
      </Suspense>
      <Controls />
    </ErrorBoundary>
  </QueryClientProvider>
);
