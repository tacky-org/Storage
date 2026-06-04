import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StorageStore, useStorageMutation, useStorageSuspenseQuery } from "@/index";
import { ErrorBoundary } from "../_shared/ErrorBoundary";
import { DEFAULT_USER_PREFS, UserPrefs, validateUserPrefs } from "../_shared/UserPrefs";

// ─── src/stores/userPrefsStore.ts ─────────────────────────────────────────────
// Define your store once. Import it anywhere — no prop drilling, no context.

export const userPrefsStore = StorageStore.create<UserPrefs>({
  key:          "user_prefs",
  store:        localStorage,
  validate:     validateUserPrefs,
  defaultValue: DEFAULT_USER_PREFS,
});

// ─── src/components/ThemeToggle.tsx ──────────────────────────────────────────

const ThemeToggle = () => {
  const { data: prefs } = useStorageSuspenseQuery(userPrefsStore);
  const mutation = useStorageMutation(userPrefsStore);

  return (
    <button onClick={() => mutation.set({ ...prefs, theme: prefs.theme === "dark" ? "light" : "dark" })}>
      Switch to {prefs.theme === "dark" ? "light" : "dark"} mode
    </button>
  );
};

// ─── src/components/PrefsDisplay.tsx ─────────────────────────────────────────

const PrefsDisplay = () => {
  const { data: prefs } = useStorageSuspenseQuery(userPrefsStore);
  return (
    <ul>
      <li>Theme: {prefs.theme}</li>
      <li>Language: {prefs.language}</li>
      <li>Notifications: {prefs.notifications ? "On" : "Off"}</li>
    </ul>
  );
};

// ─── App ─────────────────────────────────────────────────────────────────────

const queryClient = new QueryClient();

export const AppPattern = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <Suspense fallback={<p>Loading…</p>}>
        <PrefsDisplay />
        <ThemeToggle />
      </Suspense>
    </ErrorBoundary>
  </QueryClientProvider>
);
