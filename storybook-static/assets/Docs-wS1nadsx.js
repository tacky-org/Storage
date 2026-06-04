import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as o}from"./index-B5RF6Ksh.js";import{M as a,C as n}from"./blocks-C56wiXdi.js";import{S as d,W as i,L as c,a as h}from"./Prefetch.stories-CrYCHpV_.js";import"./iframe-SGWy_SBA.js";import"./preload-helper-Dp1pzeXC.js";import"./index-D46MmDHC.js";import"./ErrorBoundary-C2gNSl-c.js";import"./useStorageSuspenseQuery-BEXvKHHV.js";import"./UserPrefs-CTpBp_as.js";function s(t){const r={code:"code",em:"em",h1:"h1",h2:"h2",hr:"hr",p:"p",pre:"pre",strong:"strong",...o(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:d}),`
`,e.jsx(r.h1,{id:"prefetchstorage",children:e.jsx(r.code,{children:"prefetchStorage"})}),`
`,e.jsxs(r.p,{children:[`Populates the TanStack Query cache before a component tree renders.
When `,e.jsx(r.code,{children:"useStorageSuspenseQuery"}),` then runs, the data is already there —
no Suspense fallback, no loading state.`]}),`
`,e.jsxs(r.p,{children:["Uses ",e.jsx(r.code,{children:"ensureQueryData"}),` internally — if the data is already cached it returns
immediately, so navigating back to a route costs nothing.`]}),`
`,e.jsx(r.hr,{}),`
`,e.jsxs(r.h2,{id:"beforeload-vs-loader",children:[e.jsx(r.code,{children:"beforeLoad"})," vs ",e.jsx(r.code,{children:"loader"})]}),`
`,e.jsxs(r.p,{children:["Both receive ",e.jsx(r.code,{children:"{ context: { queryClient } }"})," and work identically with ",e.jsx(r.code,{children:"prefetchStorage"}),"."]}),`
`,e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{}),e.jsx("th",{children:e.jsx("code",{children:"beforeLoad"})}),e.jsx("th",{children:e.jsx("code",{children:"loader"})})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Runs"}),e.jsx("td",{children:"Before route activates — top-down, in series"}),e.jsx("td",{children:"When route is about to render — in parallel with sibling loaders"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Use for"}),e.jsx("td",{children:"Auth guards, redirects, context that child routes depend on"}),e.jsx("td",{children:"Data fetching — preferred for performance"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Return value"}),e.jsx("td",{children:"Not used for data"}),e.jsxs("td",{children:["Available via ",e.jsx("code",{children:"Route.useLoaderData()"})]})]})]})]}),`
`,e.jsxs(r.p,{children:["For storage prefetching, ",e.jsxs(r.strong,{children:[e.jsx(r.code,{children:"loader"})," is the right choice"]})," — it runs in parallel with other loaders and doesn't block sibling routes."]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-ts",children:`export const Route = createFileRoute('/app')({
  loader: ({ context: { queryClient } }) =>
    prefetchStorage(userPrefsStore, queryClient),
});
`})}),`
`,e.jsx(r.p,{children:"Mix Config and Storage in parallel:"}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-ts",children:`import { prefetchConfig } from '@tacky-org/config';
import { prefetchStorage } from '@tacky-org/storage';

loader: ({ context: { queryClient } }) =>
  Promise.all([
    prefetchConfig(appConfigLoader, queryClient),
    prefetchStorage(userPrefsStore,  queryClient),
    prefetchStorage(themeStore,      queryClient),
  ]),
`})}),`
`,e.jsx(r.h2,{id:"without-prefetch",children:"Without prefetch"}),`
`,e.jsx(r.p,{children:"The Suspense fallback shows until the store finishes reading (~800ms here)."}),`
`,e.jsx(n,{of:i}),`
`,e.jsxs(r.h2,{id:"with-loader",children:["With ",e.jsx(r.code,{children:"loader"})]}),`
`,e.jsxs(r.p,{children:[e.jsx(r.code,{children:"prefetchStorage"}),` runs in the loader before the component tree mounts.
By the time `,e.jsx(r.code,{children:"useStorageSuspenseQuery"}),` runs the data is already in the cache —
the Suspense fallback never appears.`]}),`
`,e.jsx(n,{of:c}),`
`,e.jsxs(r.h2,{id:"loader-return-value--useloaderdata",children:[e.jsx(r.code,{children:"loader"})," return value — ",e.jsx(r.code,{children:"useLoaderData"})]}),`
`,e.jsxs(r.p,{children:[e.jsx(r.code,{children:"loader"})," can also ",e.jsx(r.em,{children:"return"}),` the prefetched data, making it available via
`,e.jsx(r.code,{children:"Route.useLoaderData()"})," alongside ",e.jsx(r.code,{children:"useStorageSuspenseQuery"}),`.
Both read from the same cached value — no duplicate read.`]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-ts",children:`export const Route = createFileRoute('/app')({
  loader: async ({ context: { queryClient } }) => {
    const prefs = await prefetchStorage(userPrefsStore, queryClient);
    return { prefs };
  },
});

// In the component — two ways to read the same data:
const { prefs } = Route.useLoaderData();                        // direct, type-safe
const { data: prefs } = useStorageSuspenseQuery(userPrefsStore); // works anywhere in the tree
`})}),`
`,e.jsxs(r.p,{children:["Prefer ",e.jsx(r.code,{children:"useStorageSuspenseQuery"})," for deeply nested components and ",e.jsx(r.code,{children:"useLoaderData"}),`
when you want the data available at the route level without importing the store.`]}),`
`,e.jsx(n,{of:h})]})}function b(t={}){const{wrapper:r}={...o(),...t.components};return r?e.jsx(r,{...t,children:e.jsx(s,{...t})}):s(t)}export{b as default};
