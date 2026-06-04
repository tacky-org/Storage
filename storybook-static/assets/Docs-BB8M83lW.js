import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as s}from"./index-B5RF6Ksh.js";import{M as d,C as a}from"./blocks-C56wiXdi.js";import{S as i,M as o}from"./Transforms.stories-Cy9xaYCH.js";import"./iframe-SGWy_SBA.js";import"./preload-helper-Dp1pzeXC.js";import"./index-D46MmDHC.js";import"./ErrorBoundary-C2gNSl-c.js";import"./useStorageSuspenseQuery-BEXvKHHV.js";import"./useStorageMutation-DXrShwEr.js";import"./stores-CwQEJZ7K.js";function r(n){const t={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{of:i}),`
`,e.jsxs(t.h1,{id:"map-and-unmap",children:[e.jsx(t.code,{children:"map"})," and ",e.jsx(t.code,{children:"unmap"})]}),`
`,e.jsxs(t.p,{children:["Use ",e.jsx(t.code,{children:"map"})," and ",e.jsx(t.code,{children:"unmap"}),` when the shape you want to work with in components
differs from the shape you can safely serialise to storage.`]}),`
`,e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Option"}),e.jsx("th",{children:"Direction"}),e.jsx("th",{children:"Purpose"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"map"})}),e.jsx("td",{children:"stored → runtime"}),e.jsxs("td",{children:["Inflate raw data — e.g. turn a timestamp number into a ",e.jsx("code",{children:"Date"})]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"unmap"})}),e.jsx("td",{children:"runtime → stored"}),e.jsx("td",{children:"Deflate back to a serialisable shape before writing"})]})]})]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.code,{children:"map"})," and ",e.jsx(t.code,{children:"unmap"})," must always be provided together — TypeScript will error if one is missing."]}),`
`,e.jsxs(t.p,{children:["The full read pipeline: ",e.jsx(t.code,{children:"getItem → validate → map → TRuntime"})]}),`
`,e.jsxs(t.p,{children:["The full write pipeline: ",e.jsx(t.code,{children:"TRuntime → unmap → setItem"})]}),`
`,e.jsx(t.h2,{id:"example--timestamps-as-date-objects",children:"Example — timestamps as Date objects"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-ts",children:`interface StoredNote { text: string; updatedAt: number }   // stored
interface Note       { text: string; updatedAt: Date; updatedAtLabel: string } // runtime

const noteStore = StorageStore.create<StoredNote, Note>({
  key:   'note',
  store: localStorage,
  validate: withZod(StoredNoteSchema),

  map: ({ text, updatedAt }) => ({
    text,
    updatedAt:      new Date(updatedAt),
    updatedAtLabel: new Date(updatedAt).toLocaleTimeString(),
  }),

  unmap: ({ text, updatedAt }) => ({
    text,
    updatedAt: updatedAt.getTime(),   // Date → number for storage
  }),
});
`})}),`
`,e.jsxs(t.p,{children:[e.jsx(t.code,{children:"updatedAtLabel"}),` is derived on every read and never persisted —
only `,e.jsx(t.code,{children:"text"})," and ",e.jsx(t.code,{children:"updatedAt: number"})," are in storage."]}),`
`,e.jsxs(t.h2,{id:"patch-with-transforms",children:[e.jsx(t.code,{children:"patch"})," with transforms"]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.code,{children:"patch"})," still goes through ",e.jsx(t.code,{children:"unmap"})," on write, so it's safe to use with transforms:"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-ts",children:`// reads current → merges partial → unmaps → stores
noteStore.patch({ text: 'New text', updatedAt: new Date() });
`})}),`
`,e.jsx(a,{of:o})]})}function b(n={}){const{wrapper:t}={...s(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(r,{...n})}):r(n)}export{b as default};
