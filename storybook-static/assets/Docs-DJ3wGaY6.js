import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as n}from"./index-C4iJPGah.js";import{M as s,C as a}from"./blocks-sQpChzyY.js";import{S as c,a as i}from"./WebStorage.stories-BZBe3323.js";import"./iframe-B-OYst1r.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CENyMUzU.js";import"./ErrorBoundary-B5mOmJ7m.js";import"./useStorageSuspenseQuery-x15IEHOm.js";import"./UserPrefs-CTpBp_as.js";function o(r){const t={code:"code",h1:"h1",h3:"h3",p:"p",pre:"pre",...n(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:c}),`
`,e.jsx(t.h1,{id:"web-storage",children:"Web Storage"}),`
`,e.jsxs(t.p,{children:["Pass ",e.jsx(t.code,{children:"localStorage"})," or ",e.jsx(t.code,{children:"sessionStorage"})," directly as the ",e.jsx(t.code,{children:"store"}),` option.
`,e.jsx(t.code,{children:"key"}),` is the logical identifier for your store — it is written to the browser
as `,e.jsx(t.code,{children:"storage__<key>"})," automatically to avoid collisions with other libraries."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-ts",children:`import { StorageStore } from '@tacky-org/storage';

const userPrefsStore = StorageStore.create({
  key:          'user_prefs',
  store:        localStorage,   // stored as storage__user_prefs
  validate:     withZod(UserPrefsSchema),
  defaultValue: DEFAULT_USER_PREFS,
});

const draftStore = StorageStore.create({
  key:          'draft',
  store:        sessionStorage, // cleared when the tab closes
  validate:     withZod(DraftSchema),
  defaultValue: DEFAULT_DRAFT,
});
`})}),`
`,e.jsxs(t.p,{children:[e.jsx(t.code,{children:"sessionStorage"}),` is tab-scoped — no cross-tab events fire.
`,e.jsx(t.code,{children:"localStorage"})," emits the native ",e.jsx(t.code,{children:"storage"}),` event on writes from other tabs,
which `,e.jsx(t.code,{children:"useStorageSuspenseQuery"})," and ",e.jsx(t.code,{children:"useStorageQuery"})," pick up automatically."]}),`
`,e.jsx(t.h3,{id:"custom-storage-backend",children:"Custom storage backend"}),`
`,e.jsxs(t.p,{children:[`If you need a non-standard backend (encrypted storage, IndexedDB wrapper, etc.),
implement the `,e.jsx(t.code,{children:"ExternalStore"})," interface directly and pass it as ",e.jsx(t.code,{children:"store"}),":"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-ts",children:`import { StorageStore, ExternalStore } from '@tacky-org/storage';

const encryptedStorage: ExternalStore = {
  getItem()          { /* decrypt and return */ },
  setItem(value)     { /* encrypt and store */ },
  subscribe(listener){ /* wire up change events */ ; return () => { /* unsubscribe */ }; },
};

const secretStore = StorageStore.create({
  key:      'secret',
  store:    encryptedStorage,
  validate: withZod(SecretSchema),
});
`})}),`
`,e.jsx(a,{of:i})]})}function f(r={}){const{wrapper:t}={...n(),...r.components};return t?e.jsx(t,{...r,children:e.jsx(o,{...r})}):o(r)}export{f as default};
