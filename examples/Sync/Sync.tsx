import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StorageStore, useStorageMutation, useStorageSuspenseQuery } from "@/index";
import { ErrorBoundary } from "../_shared/ErrorBoundary";
import { DEFAULT_USER_PREFS, UserPrefs, validateUserPrefs } from "../_shared/UserPrefs";

// useStorageSuspenseQuery and useStorageQuery wire up the native `storage` event
// automatically. When another tab writes to the same localStorage key, the
// query invalidates and re-reads here with no extra code.

const localStore = StorageStore.create<UserPrefs>({
  key:          "sync_cross_tab",
  store:        localStorage,
  validate:     validateUserPrefs,
  defaultValue: DEFAULT_USER_PREFS,
});

const queryClient = new QueryClient();

const CrossTabDisplay = () => {
  const { data: prefs } = useStorageSuspenseQuery(localStore);
  return (
    <ul>
      <li>Theme: {prefs.theme}</li>
      <li>Language: {prefs.language}</li>
      <li>Notifications: {prefs.notifications ? "On" : "Off"}</li>
    </ul>
  );
};

const CrossTabControls = () => {
  const mutation = useStorageMutation(localStore);
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <button onClick={() => mutation.set({ theme: "dark",  language: "en", notifications: true })}>
        Dark / EN / On
      </button>
      <button onClick={() => mutation.set({ theme: "light", language: "fr", notifications: false })}>
        Light / FR / Off
      </button>
    </div>
  );
};

export const CrossTab = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <Suspense fallback={<p>Loading…</p>}>
        <CrossTabDisplay />
      </Suspense>
      <CrossTabControls />
      <p><small>Open this page in a second tab and click a button there — this tab updates automatically.</small></p>
    </ErrorBoundary>
  </QueryClientProvider>
);
