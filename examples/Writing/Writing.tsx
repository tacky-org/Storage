import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StorageStore, fromMemory, useStorageMutation, useStorageSuspenseQuery } from "@/index";
import { ErrorBoundary } from "../_shared/ErrorBoundary";
import { DEFAULT_USER_PREFS, UserPrefs, validateUserPrefs } from "../_shared/UserPrefs";

const queryClient = new QueryClient();

// ─── useStorageMutation ───────────────────────────────────────────────────────

const mutationStore = StorageStore.create<UserPrefs>({
  key:          "writing_mutation",
  store:        fromMemory(),
  validate:     validateUserPrefs,
  defaultValue: DEFAULT_USER_PREFS,
});

const MutationDisplay = () => {
  const { data: prefs } = useStorageSuspenseQuery(mutationStore);
  return (
    <ul>
      <li>Theme: {prefs.theme}</li>
      <li>Language: {prefs.language}</li>
      <li>Notifications: {prefs.notifications ? "On" : "Off"}</li>
    </ul>
  );
};

const MutationControls = () => {
  const mutation = useStorageMutation(mutationStore);
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <button onClick={() => mutation.set({ theme: "dark",  language: "en", notifications: true })}>
        Dark / EN / On
      </button>
      <button onClick={() => mutation.set({ theme: "light", language: "fr", notifications: false })}>
        Light / FR / Off
      </button>
      {mutation.isPending && <span> Saving…</span>}
    </div>
  );
};

export const Mutation = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <Suspense fallback={<p>Loading…</p>}>
        <MutationDisplay />
      </Suspense>
      <MutationControls />
    </ErrorBoundary>
  </QueryClientProvider>
);

// ─── patch — partial update ───────────────────────────────────────────────────

const patchStore = StorageStore.create<UserPrefs>({
  key:          "writing_patch",
  store:        fromMemory(),
  validate:     validateUserPrefs,
  defaultValue: DEFAULT_USER_PREFS,
});

const PatchDisplay = () => {
  const { data: prefs } = useStorageSuspenseQuery(patchStore);
  return (
    <ul>
      <li>Theme: {prefs.theme}</li>
      <li>Language: {prefs.language}</li>
      <li>Notifications: {prefs.notifications ? "On" : "Off"}</li>
    </ul>
  );
};

const PatchControls = () => {
  const mutation = useStorageMutation(patchStore);
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <button onClick={() => mutation.patch({ theme: "dark" })}>
        Patch theme → dark
      </button>
      <button onClick={() => mutation.patch({ language: "de" })}>
        Patch language → de
      </button>
      <button onClick={() => mutation.patch({ notifications: true })}>
        Patch notifications → on
      </button>
      <button onClick={() => mutation.set(DEFAULT_USER_PREFS)}>
        Reset all
      </button>
    </div>
  );
};

export const Patch = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <Suspense fallback={<p>Loading…</p>}>
        <PatchDisplay />
      </Suspense>
      <PatchControls />
    </ErrorBoundary>
  </QueryClientProvider>
);
