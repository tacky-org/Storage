import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as a}from"./index-B5RF6Ksh.js";import{M as s,C as n}from"./blocks-C56wiXdi.js";import{S as i,M as c,P as d}from"./Writing.stories-WudWB6x4.js";import"./iframe-SGWy_SBA.js";import"./preload-helper-Dp1pzeXC.js";import"./index-D46MmDHC.js";import"./ErrorBoundary-C2gNSl-c.js";import"./useStorageSuspenseQuery-BEXvKHHV.js";import"./useStorageMutation-DXrShwEr.js";import"./stores-CwQEJZ7K.js";import"./UserPrefs-CTpBp_as.js";function o(r){const t={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...a(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:i}),`
`,e.jsx(t.h1,{id:"writing",children:"Writing"}),`
`,e.jsxs(t.p,{children:[e.jsx(t.code,{children:"useStorageMutation"})," returns a ",e.jsx(t.code,{children:"set"})," method, a ",e.jsx(t.code,{children:"patch"}),` method, and TanStack
Query mutation status — all in one object. Both methods write to the store
and invalidate the query automatically.`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-tsx",children:`const mutation = useStorageMutation(userPrefsStore);

mutation.set({ theme: 'dark', language: 'en', notifications: true });  // full replace
mutation.patch({ theme: 'dark' });                                       // partial update
`})}),`
`,e.jsx(t.h2,{id:"error-handling",children:"Error handling"}),`
`,e.jsxs(t.p,{children:["Any error thrown during the write pipeline — ",e.jsx(t.code,{children:"unmap"}),", ",e.jsx(t.code,{children:"setItem"}),`, etc. — is a
`,e.jsx(t.code,{children:"StoragePipelineError"}),". TanStack's mutation catches it automatically:"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-tsx",children:`const mutation = useStorageMutation(userPrefsStore);

if (mutation.isError) {
  const err = mutation.error;
  if (err instanceof StoragePipelineError) {
    console.error(\`Write failed at step "\${err.step}":\`, err.cause);
  }
}
`})}),`
`,e.jsxs(t.h2,{id:"set--full-replace",children:[e.jsx(t.code,{children:"set"})," — full replace"]}),`
`,e.jsx(t.p,{children:"Replaces the entire stored value. Every field must be provided."}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-tsx",children:`mutation.set({ theme: 'dark', language: 'en', notifications: true });
`})}),`
`,e.jsx(n,{of:c}),`
`,e.jsxs(t.h2,{id:"patch--partial-update",children:[e.jsx(t.code,{children:"patch"})," — partial update"]}),`
`,e.jsxs(t.p,{children:[`Shallow-merges a partial value into the current state.
Under the hood: `,e.jsx(t.code,{children:"get()"})," → merge → ",e.jsx(t.code,{children:"set()"})," → invalidate."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-tsx",children:`mutation.patch({ theme: 'dark' });  // language and notifications are preserved
`})}),`
`,e.jsx(t.h2,{id:"store-granularity-and-re-renders",children:"Store granularity and re-renders"}),`
`,e.jsxs(t.p,{children:["Every write — whether ",e.jsx(t.code,{children:"set"})," or ",e.jsx(t.code,{children:"patch"}),` — invalidates the store's query and
re-renders `,e.jsx(t.strong,{children:"every component subscribed to that store"}),"."]}),`
`,e.jsx(t.p,{children:`If you store unrelated data together, an update to one field causes components
that only care about another field to re-render unnecessarily.`}),`
`,e.jsx(t.p,{children:e.jsx(t.strong,{children:"Prefer one store per concern:"})}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-ts",children:`// ✗ one big store — changing theme re-renders the language selector and vice versa
const userPrefsStore = StorageStore.create({ key: 'user_prefs', store: localStorage, ... });

// ✓ one store per concern — each component only re-renders when its data changes
const themeStore        = StorageStore.create({ key: 'theme',        store: localStorage, ... });
const languageStore     = StorageStore.create({ key: 'language',     store: localStorage, ... });
const notificationsStore = StorageStore.create({ key: 'notifications', store: localStorage, ... });
`})}),`
`,e.jsx(t.p,{children:`A good rule of thumb: if two pieces of data are always changed together, they belong
in the same store. If they are ever changed independently, split them.`}),`
`,e.jsx(n,{of:d})]})}function w(r={}){const{wrapper:t}={...a(),...r.components};return t?e.jsx(t,{...r,children:e.jsx(o,{...r})}):o(r)}export{w as default};
