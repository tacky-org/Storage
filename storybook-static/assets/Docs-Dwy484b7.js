import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as o}from"./index-B5RF6Ksh.js";import{M as d,C as n}from"./blocks-C56wiXdi.js";import{S as a,a as i,b as l,I as c}from"./Reading.stories-vKKTA2lw.js";import"./iframe-SGWy_SBA.js";import"./preload-helper-Dp1pzeXC.js";import"./index-D46MmDHC.js";import"./ErrorBoundary-C2gNSl-c.js";import"./useStorageSuspenseQuery-BEXvKHHV.js";import"./stores-CwQEJZ7K.js";import"./UserPrefs-CTpBp_as.js";function t(r){const s={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...o(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{of:a}),`
`,e.jsx(s.h1,{id:"reading",children:"Reading"}),`
`,e.jsxs(s.p,{children:["Two hooks for reading from a ",e.jsx(s.code,{children:"StorageStore"}),", matching TanStack Query's own naming:"]}),`
`,e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Hook"}),e.jsx("th",{children:"Use when"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"useStorageSuspenseQuery"})}),e.jsxs("td",{children:["You want Suspense — wrap with ",e.jsx("code",{children:"<Suspense>"})," and ",e.jsx("code",{children:"<ErrorBoundary>"})]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"useStorageQuery"})}),e.jsx("td",{children:"You want inline loading / error states, no boundaries needed"})]})]})]}),`
`,e.jsxs(s.p,{children:["Both hooks wire up cross-tab sync automatically via the native ",e.jsx(s.code,{children:"storage"})," event."]}),`
`,e.jsxs(s.h2,{id:"defaultvalue-controls-the-return-type",children:[e.jsx(s.code,{children:"defaultValue"})," controls the return type"]}),`
`,e.jsxs(s.p,{children:["The TypeScript return type of ",e.jsx(s.code,{children:"data"})," depends on whether your store has a ",e.jsx(s.code,{children:"defaultValue"}),":"]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-ts",children:`// No defaultValue — data is UserPrefs | null
const store = StorageStore.create({ key: 'prefs', store: localStorage, validate });
const { data } = useStorageSuspenseQuery(store);
// data: UserPrefs | null — must check for null

// With defaultValue — data is always UserPrefs
const store = StorageStore.create({ key: 'prefs', store: localStorage, validate, defaultValue });
const { data } = useStorageSuspenseQuery(store);
// data: UserPrefs — no null check needed
`})}),`
`,e.jsxs(s.p,{children:["An empty store is ",e.jsx(s.strong,{children:"not an error"})," — it returns ",e.jsx(s.code,{children:"null"})," (or your ",e.jsx(s.code,{children:"defaultValue"}),`).
`,e.jsx(s.code,{children:"null"}),` means "key absent" and is a valid TanStack Query result, so the query
settles immediately. `,e.jsx(s.code,{children:"undefined"}),` is TanStack's "still loading" sentinel — the
store never returns it, so the query never stays stuck in loading state.`]}),`
`,e.jsxs(s.h2,{id:"usestoragesuspensequery--with-defaultvalue",children:[e.jsx(s.code,{children:"useStorageSuspenseQuery"})," — with ",e.jsx(s.code,{children:"defaultValue"})]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.code,{children:"data"})," is always ",e.jsx(s.code,{children:"UserPrefs"}),". No ",e.jsx(s.code,{children:"null"})," check at the call site."]}),`
`,e.jsx(n,{of:i}),`
`,e.jsxs(s.h2,{id:"usestoragesuspensequery--without-defaultvalue",children:[e.jsx(s.code,{children:"useStorageSuspenseQuery"})," — without ",e.jsx(s.code,{children:"defaultValue"})]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.code,{children:"data"})," is ",e.jsx(s.code,{children:"UserPrefs | null"}),". TypeScript enforces the check."]}),`
`,e.jsx(n,{of:l}),`
`,e.jsxs(s.h2,{id:"usestoragequery--inline-states",children:[e.jsx(s.code,{children:"useStorageQuery"})," — inline states"]}),`
`,e.jsxs(s.p,{children:["No ",e.jsx(s.code,{children:"<Suspense>"})," or ",e.jsx(s.code,{children:"<ErrorBoundary>"}),` needed.
Handle `,e.jsx(s.code,{children:"isLoading"}),", ",e.jsx(s.code,{children:"isError"}),", and ",e.jsx(s.code,{children:"data"})," inline."]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`const { data: prefs, isLoading, isError, error } = useStorageQuery(userPrefsStore);

if (isLoading) return <Spinner />;
if (isError)   return <p>Error: {String(error)}</p>;
if (!prefs)    return <p>Nothing saved yet.</p>;
return <PrefsDisplay prefs={prefs} />;
`})}),`
`,e.jsx(n,{of:c})]})}function k(r={}){const{wrapper:s}={...o(),...r.components};return s?e.jsx(s,{...r,children:e.jsx(t,{...r})}):t(r)}export{k as default};
