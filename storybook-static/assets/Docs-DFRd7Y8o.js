import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as d}from"./index-B5RF6Ksh.js";import{M as o,C as t}from"./blocks-C56wiXdi.js";import{S as i,V as a,R as c}from"./Errors.stories-Cvfag2aa.js";import"./iframe-SGWy_SBA.js";import"./preload-helper-Dp1pzeXC.js";import"./index-D46MmDHC.js";import"./ErrorBoundary-C2gNSl-c.js";import"./useStorageSuspenseQuery-BEXvKHHV.js";import"./stores-CwQEJZ7K.js";import"./UserPrefs-CTpBp_as.js";function s(n){const r={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...d(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:i}),`
`,e.jsxs(r.h1,{id:"errors-and-storagepipelineerror",children:["Errors and ",e.jsx(r.code,{children:"StoragePipelineError"})]}),`
`,e.jsxs(r.p,{children:["Every step of the read and write pipeline throws a ",e.jsx(r.code,{children:"StoragePipelineError"}),` on failure.
Catch it in an `,e.jsx(r.code,{children:"<ErrorBoundary>"})," and inspect ",e.jsx(r.code,{children:"error.step"})," to know exactly where it failed."]}),`
`,e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Step"}),e.jsx("th",{children:"Pipeline"}),e.jsx("th",{children:"When"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"read"})}),e.jsx("td",{children:"read"}),e.jsx("td",{children:"External store threw — e.g. invalid JSON in localStorage"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"validate"})}),e.jsx("td",{children:"read"}),e.jsxs("td",{children:[e.jsx("code",{children:"validate"})," function threw — data shape is wrong"]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"map"})}),e.jsx("td",{children:"read"}),e.jsxs("td",{children:[e.jsx("code",{children:"map"})," function threw"]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"unmap"})}),e.jsx("td",{children:"write"}),e.jsxs("td",{children:[e.jsx("code",{children:"unmap"})," function threw during a write"]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"write"})}),e.jsx("td",{children:"write"}),e.jsx("td",{children:"External store threw during write — e.g. QuotaExceededError"})]})]})]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-tsx",children:`import { StoragePipelineError } from '@tacky-org/storage';

const fallback = (error: Error) => {
  if (error instanceof StoragePipelineError) {
    return (
      <div>
        <p>Failed at step: <strong>{error.step}</strong></p>
        <p>{error.message}</p>
      </div>
    );
  }
  return <p>{error.message}</p>;
};

<ErrorBoundary fallback={fallback}>
  <Suspense fallback={<p>Loading…</p>}>
    <MyComponent />
  </Suspense>
</ErrorBoundary>
`})}),`
`,e.jsx(r.h2,{id:"empty-store-is-not-an-error",children:"Empty store is not an error"}),`
`,e.jsxs(r.p,{children:["When a key is absent, ",e.jsx(r.code,{children:"get()"})," returns ",e.jsx(r.code,{children:"undefined"})," (or your ",e.jsx(r.code,{children:"defaultValue"}),`).
Only corrupt or invalid data throws. This mirrors React context behaviour.`]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-ts",children:`// Empty store → undefined, no error
const store = StorageStore.create({ key: 'prefs', store: localStorage, validate });
store.get(); // → undefined

// Corrupt store → StoragePipelineError('validate', ...)
localStorage.setItem('storage__prefs', '{"theme":"INVALID"}');
store.get(); // throws
`})}),`
`,e.jsxs(r.h2,{id:"validate-step-error",children:[e.jsx(r.code,{children:"validate"})," step error"]}),`
`,e.jsxs(r.p,{children:["The store below holds corrupt data. ",e.jsx(r.code,{children:"validate"})," throws and the ",e.jsx(r.code,{children:"<ErrorBoundary>"})," catches it."]}),`
`,e.jsx(t,{of:a}),`
`,e.jsxs(r.h2,{id:"read-step-error",children:[e.jsx(r.code,{children:"read"})," step error"]}),`
`,e.jsxs(r.p,{children:["The store below holds a string that cannot be JSON-parsed. The ",e.jsx(r.code,{children:"read"}),` step throws
before `,e.jsx(r.code,{children:"validate"})," is even called."]}),`
`,e.jsx(t,{of:c})]})}function y(n={}){const{wrapper:r}={...d(),...n.components};return r?e.jsx(r,{...n,children:e.jsx(s,{...n})}):s(n)}export{y as default};
