import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as t}from"./index-B5RF6Ksh.js";import{M as o,C as i}from"./blocks-C56wiXdi.js";import{S as c,C as d}from"./Sync.stories-CVO4LIAw.js";import"./iframe-SGWy_SBA.js";import"./preload-helper-Dp1pzeXC.js";import"./index-D46MmDHC.js";import"./ErrorBoundary-C2gNSl-c.js";import"./useStorageSuspenseQuery-BEXvKHHV.js";import"./useStorageMutation-DXrShwEr.js";import"./UserPrefs-CTpBp_as.js";function r(s){const n={code:"code",h1:"h1",h2:"h2",p:"p",...t(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:c}),`
`,e.jsx(n.h1,{id:"sync--cached-until-changed",children:"Sync — cached until changed"}),`
`,e.jsxs(n.p,{children:["Storage queries are cached indefinitely (",e.jsx(n.code,{children:"staleTime: Infinity"}),`).
A re-read is triggered only when the store signals a change.`]}),`
`,e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Trigger"}),e.jsx("th",{children:"How"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"In-process write"})}),e.jsxs("td",{children:[e.jsx("code",{children:"useStorageMutation"})," writes to the store and invalidates the query automatically"]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Cross-tab write"})}),e.jsxs("td",{children:[e.jsx("code",{children:"useStorageSuspenseQuery"})," / ",e.jsx("code",{children:"useStorageQuery"})," subscribe to the native ",e.jsx("code",{children:"storage"})," event and invalidate automatically"]})]})]})]}),`
`,e.jsx(n.h2,{id:"cross-tab-sync",children:"Cross-tab sync"}),`
`,e.jsxs(n.p,{children:["When backed by ",e.jsx(n.code,{children:"localStorage"}),", ",e.jsx(n.code,{children:"useStorageSuspenseQuery"})," and ",e.jsx(n.code,{children:"useStorageQuery"}),`
subscribe to the browser's native `,e.jsx(n.code,{children:"storage"}),` event. Any write from another tab
invalidates the query and triggers a single re-read — no polling, no websockets.`]}),`
`,e.jsxs(n.p,{children:["Only components that call ",e.jsx(n.code,{children:"useStorageSuspenseQuery"})," or ",e.jsx(n.code,{children:"useStorageQuery"}),` on that
store will re-render. Nothing else in the tree is affected.`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"sessionStorage"})," is tab-scoped so no cross-tab events fire."]}),`
`,e.jsx(n.p,{children:"Open this example in two tabs and click a button in one — the other updates immediately."}),`
`,e.jsx(i,{of:d}),`
`,e.jsx(n.h2,{id:"usestoragesync",children:e.jsx(n.code,{children:"useStorageSync"})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"useStorageSuspenseQuery"})," and ",e.jsx(n.code,{children:"useStorageQuery"})," call ",e.jsx(n.code,{children:"useStorageSync"}),` internally,
so you rarely need to call it directly.`]}),`
`,e.jsx(n.p,{children:`It is exported for advanced cases where you need the subscription active before
the reading component has mounted — for example, pre-warming the cache during
app initialisation before a lazy-loaded route renders.`}),`
`,e.jsxs(n.p,{children:["Note that ",e.jsx(n.code,{children:"useStorageSync"}),` itself does not cause re-renders. It only invalidates
the query, which causes components subscribed to that store to re-render.`]})]})}function b(s={}){const{wrapper:n}={...t(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(r,{...s})}):r(s)}export{b as default};
