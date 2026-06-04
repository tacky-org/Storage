import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as n}from"./index-C4iJPGah.js";import{M as s,C as a}from"./blocks-sQpChzyY.js";import{S as c,a as i}from"./Memory.stories-oEi4cMoS.js";import"./iframe-B-OYst1r.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CENyMUzU.js";import"./ErrorBoundary-B5mOmJ7m.js";import"./useStorageSuspenseQuery-x15IEHOm.js";import"./useStorageMutation-BZG0_HEQ.js";import"./stores-4wrvUV6J.js";import"./UserPrefs-CTpBp_as.js";function t(o){const r={code:"code",h1:"h1",p:"p",pre:"pre",strong:"strong",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:c}),`
`,e.jsx(r.h1,{id:"frommemory",children:e.jsx(r.code,{children:"fromMemory"})}),`
`,e.jsxs(r.p,{children:[e.jsx(r.code,{children:"fromMemory"})," creates an in-memory ",e.jsx(r.code,{children:"ExternalStore"}),` — no browser storage, no network.
Use it as the `,e.jsx(r.code,{children:"store"}),` option in tests and Storybook where you want controlled,
predictable state without side effects.`]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-ts",children:`import { StorageStore, fromMemory } from '@tacky-org/storage';

const userPrefsStore = StorageStore.create({
  key:          'user_prefs',
  store:        fromMemory(),
  validate:     withZod(UserPrefsSchema),
  defaultValue: DEFAULT_USER_PREFS,
});
`})}),`
`,e.jsxs(r.p,{children:["Subscribers are notified ",e.jsx(r.strong,{children:"synchronously"})," on every ",e.jsx(r.code,{children:"set()"})," or ",e.jsx(r.code,{children:"mutation.set()"}),` call,
so `,e.jsx(r.code,{children:"useStorageSuspenseQuery"}),", ",e.jsx(r.code,{children:"useStorageQuery"}),", and ",e.jsx(r.code,{children:"useStorageMutation"}),` behave
exactly as they would against real browser storage.`]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-ts",children:`// In a test — swap localStorage for fromMemory to keep tests isolated
const testStore = StorageStore.create({
  key:      'user_prefs',
  store:    fromMemory({ theme: 'dark', language: 'fr', notifications: true }),
  validate: withZod(UserPrefsSchema),
});
`})}),`
`,e.jsx(a,{of:i})]})}function M(o={}){const{wrapper:r}={...n(),...o.components};return r?e.jsx(r,{...o,children:e.jsx(t,{...o})}):t(o)}export{M as default};
