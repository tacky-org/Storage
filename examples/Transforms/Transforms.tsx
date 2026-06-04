import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StorageStore, fromMemory, useStorageMutation, useStorageSuspenseQuery } from "@/index";
import { ErrorBoundary } from "../_shared/ErrorBoundary";

// ─── types ────────────────────────────────────────────────────────────────────

/** Shape written to storage — fully serialisable. */
interface StoredNote {
  text: string;
  updatedAt: number; // Unix ms timestamp
}

/** Runtime shape — richer, with derived fields. Never written to storage. */
interface Note {
  text: string;
  updatedAt: Date;
  updatedAtLabel: string;
}

const DEFAULT_NOTE: Note = {
  text: "Buy groceries",
  updatedAt: new Date(0),
  updatedAtLabel: new Date(0).toLocaleTimeString(),
};

// ─── store ────────────────────────────────────────────────────────────────────

const noteStore = StorageStore.create<StoredNote, Note>({
  key:          "transforms_note",
  store:        fromMemory(),
  defaultValue: DEFAULT_NOTE,

  validate: (raw) => {
    const r = raw as StoredNote;
    if (typeof r?.text !== "string") throw new Error("Invalid text");
    if (typeof r?.updatedAt !== "number") throw new Error("Invalid updatedAt");
    return r;
  },

  // stored → runtime: inflate timestamp into Date + formatted label
  map: ({ text, updatedAt }) => ({
    text,
    updatedAt: new Date(updatedAt),
    updatedAtLabel: new Date(updatedAt).toLocaleTimeString(),
  }),

  // runtime → stored: deflate back to serialisable shape
  unmap: ({ text, updatedAt }) => ({
    text,
    updatedAt: updatedAt.getTime(),
  }),
});

// ─── components ───────────────────────────────────────────────────────────────

const queryClient = new QueryClient();

const Display = () => {
  const { data: note } = useStorageSuspenseQuery(noteStore);
  return (
    <ul>
      <li>Text: {note.text}</li>
      <li>Updated: {note.updatedAtLabel}</li>
      <li><small>Raw updatedAt: <code>{note.updatedAt.getTime()}</code> (stored as number)</small></li>
    </ul>
  );
};

const Controls = () => {
  const mutation = useStorageMutation(noteStore);
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <button
        onClick={() =>
          mutation.set({ text: "Walk the dog", updatedAt: new Date(), updatedAtLabel: "" })
        }
      >
        Set new note
      </button>
      <button onClick={() => mutation.patch({ text: "Buy groceries", updatedAt: new Date() })}>
        Patch text only
      </button>
    </div>
  );
};

export const Transforms = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <Suspense fallback={<p>Loading…</p>}>
        <Display />
      </Suspense>
      <Controls />
    </ErrorBoundary>
  </QueryClientProvider>
);
