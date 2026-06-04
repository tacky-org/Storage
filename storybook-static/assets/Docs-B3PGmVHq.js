import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as s}from"./index-C4iJPGah.js";import{M as i,C as n}from"./blocks-sQpChzyY.js";import{S as a,W as d,U as c}from"./ErrorWrite.stories-Blm59fAq.js";import"./iframe-B-OYst1r.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CENyMUzU.js";import"./ErrorBoundary-B5mOmJ7m.js";import"./useStorageMutation-BZG0_HEQ.js";import"./stores-4wrvUV6J.js";import"./UserPrefs-CTpBp_as.js";function o(t){const r={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{of:a}),`
`,e.jsx(r.h1,{id:"write-errors",children:"Write errors"}),`
`,e.jsxs(r.p,{children:["Write errors are caught by TanStack's mutation and exposed on ",e.jsx(r.code,{children:"mutation.isError"}),`
and `,e.jsx(r.code,{children:"mutation.error"}),". No ",e.jsx(r.code,{children:"<ErrorBoundary>"}),` needed — the component stays mounted
and you can display the error inline next to the button that triggered it.`]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-tsx",children:`const mutation = useStorageMutation(userPrefsStore);

return (
  <div>
    <button onClick={() => mutation.set({ theme: 'dark', language: 'en', notifications: true })}>
      Save
    </button>

    {mutation.isError && mutation.error instanceof StoragePipelineError && (
      <p>Write failed at step "{mutation.error.step}": {String(mutation.error.cause)}</p>
    )}
  </div>
);
`})}),`
`,e.jsxs(r.p,{children:["Write errors always carry a ",e.jsx(r.code,{children:"step"})," that tells you where in the pipeline it failed:"]}),`
`,e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Step"}),e.jsx("th",{children:"Cause"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"unmap"})}),e.jsxs("td",{children:["The ",e.jsx("code",{children:"unmap"})," function threw — e.g. value failed a constraint"]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"write"})}),e.jsxs("td",{children:["The external store threw — e.g. ",e.jsx("code",{children:"QuotaExceededError"})]})]})]})]}),`
`,e.jsxs(r.h2,{id:"write-step--storage-quota-exceeded",children:[e.jsx(r.code,{children:"write"})," step — storage quota exceeded"]}),`
`,e.jsxs(r.p,{children:["The store below uses a custom ",e.jsx(r.code,{children:"ExternalStore"})," whose ",e.jsx(r.code,{children:"setItem"}),` always throws a
`,e.jsx(r.code,{children:"QuotaExceededError"}),". The error surfaces on ",e.jsx(r.code,{children:"mutation.error"}),` without unmounting
the component.`]}),`
`,e.jsx(n,{of:d}),`
`,e.jsxs(r.h2,{id:"unmap-step--unmap-throws",children:[e.jsx(r.code,{children:"unmap"})," step — unmap throws"]}),`
`,e.jsxs(r.p,{children:["The store below has an ",e.jsx(r.code,{children:"unmap"})," function that always throws. The ",e.jsx(r.code,{children:"write"}),` step is
never reached — the error is caught at `,e.jsx(r.code,{children:"unmap"}),"."]}),`
`,e.jsx(n,{of:c})]})}function E(t={}){const{wrapper:r}={...s(),...t.components};return r?e.jsx(r,{...t,children:e.jsx(o,{...t})}):o(t)}export{E as default};
