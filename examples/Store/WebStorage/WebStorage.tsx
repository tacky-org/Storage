import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StorageStore, useStorageSuspenseQuery } from "@/index";
import { ErrorBoundary } from "../../_shared/ErrorBoundary";
import { DEFAULT_USER_PREFS, UserPrefs, validateUserPrefs } from "../../_shared/UserPrefs";

// Pass localStorage or sessionStorage directly as `store`.
// The key is written to the browser as `storage__<key>` to avoid collisions.

const localStore = StorageStore.create<UserPrefs>({
  key:          "prefs_local",
  store:        localStorage,
  validate:     validateUserPrefs,
  defaultValue: DEFAULT_USER_PREFS,
});

const sessionStore = StorageStore.create<UserPrefs>({
  key:          "prefs_session",
  store:        sessionStorage,
  validate:     validateUserPrefs,
  defaultValue: DEFAULT_USER_PREFS,
});

const queryClient = new QueryClient();

const Row = ({ label, store }: { label: string; store: StorageStore<UserPrefs, UserPrefs, UserPrefs> }) => {
  const { data: p } = useStorageSuspenseQuery(store);
  return (
    <tr>
      <td><code>{label}</code></td>
      <td>{p.theme}</td>
      <td>{p.language}</td>
      <td>{p.notifications ? "On" : "Off"}</td>
    </tr>
  );
};

const Display = () => (
  <table>
    <thead><tr><th>Store</th><th>Theme</th><th>Language</th><th>Notifications</th></tr></thead>
    <tbody>
      <Row label="localStorage"   store={localStore} />
      <Row label="sessionStorage" store={sessionStore} />
    </tbody>
  </table>
);

export const WebStorage = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <Suspense fallback={<p>Loading…</p>}>
        <Display />
      </Suspense>
    </ErrorBoundary>
  </QueryClientProvider>
);
