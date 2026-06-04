import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as n}from"./index-B5RF6Ksh.js";import{M as s,C as a}from"./blocks-C56wiXdi.js";import{S as i,a as c}from"./Pattern.stories-Ccdn3EsS.js";import"./iframe-SGWy_SBA.js";import"./preload-helper-Dp1pzeXC.js";import"./index-D46MmDHC.js";import"./ErrorBoundary-C2gNSl-c.js";import"./useStorageSuspenseQuery-BEXvKHHV.js";import"./useStorageMutation-DXrShwEr.js";import"./UserPrefs-CTpBp_as.js";function o(t){const r={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:i}),`
`,e.jsx(r.h1,{id:"app-structure-pattern",children:"App structure pattern"}),`
`,e.jsxs(r.p,{children:["The recommended pattern is a ",e.jsx(r.code,{children:"stores/"}),` folder with one file per store.
Each file exports the store. Components import the store directly — no prop drilling, no context.`]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{children:`src/
  stores/
    userPrefsStore.ts
    themeStore.ts
    draftStore.ts
  components/
    ThemeToggle.tsx
    PrefsForm.tsx
`})}),`
`,e.jsx(r.h2,{id:"storesuserprefsstorets",children:e.jsx(r.code,{children:"stores/userPrefsStore.ts"})}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-ts",children:`import { StorageStore } from '@tacky-org/storage';
import { withZod } from '@tacky-org/storage';
import { z } from 'zod';

const UserPrefsSchema = z.object({
  theme:         z.enum(['light', 'dark']),
  language:      z.string(),
  notifications: z.boolean(),
});

type UserPrefs = z.infer<typeof UserPrefsSchema>;

export const userPrefsStore = StorageStore.create<UserPrefs>({
  key:          'user_prefs',        // stored as storage__user_prefs
  store:        localStorage,
  validate:     withZod(UserPrefsSchema),
  defaultValue: { theme: 'light', language: 'en', notifications: false },
});
`})}),`
`,e.jsx(r.h2,{id:"componentsthemetoggletsx",children:e.jsx(r.code,{children:"components/ThemeToggle.tsx"})}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-tsx",children:`import { useStorageSuspenseQuery, useStorageMutation } from '@tacky-org/storage';
import { userPrefsStore } from '../stores/userPrefsStore';

export function ThemeToggle() {
  const { data: prefs } = useStorageSuspenseQuery(userPrefsStore);
  const mutation = useStorageMutation(userPrefsStore);

  return (
    <button onClick={() => mutation.set({ ...prefs, theme: prefs.theme === 'dark' ? 'light' : 'dark' })}>
      Switch to {prefs.theme === 'dark' ? 'light' : 'dark'} mode
    </button>
  );
}
`})}),`
`,e.jsx(r.p,{children:`Any number of components can import the same store. When one writes, all re-render.
No provider, no context — just import and use.`}),`
`,e.jsxs(r.h2,{id:"tanstack-router--beforeload",children:["TanStack Router — ",e.jsx(r.code,{children:"beforeLoad"})]}),`
`,e.jsxs(r.p,{children:["Use ",e.jsx(r.code,{children:"prefetchStorage"})," in ",e.jsx(r.code,{children:"beforeLoad"})," or ",e.jsx(r.code,{children:"loader"}),` to ensure storage data is in the
cache before the route renders. Components calling `,e.jsx(r.code,{children:"useStorageSuspenseQuery"}),` will
never suspend — the data is already there.`]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-ts",children:`import { createFileRoute } from '@tanstack/react-router';
import { prefetchStorage } from '@tacky-org/storage';
import { userPrefsStore } from '../stores/userPrefsStore';

export const Route = createFileRoute('/app')({
  beforeLoad: ({ context: { queryClient } }) =>
    prefetchStorage(userPrefsStore, queryClient),
});
`})}),`
`,e.jsx(r.p,{children:"Mix Config and Storage prefetching in parallel:"}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-ts",children:`import { prefetchConfig } from '@tacky-org/config';
import { prefetchStorage } from '@tacky-org/storage';

beforeLoad: ({ context: { queryClient } }) =>
  Promise.all([
    prefetchConfig(appConfigLoader,  queryClient),
    prefetchStorage(userPrefsStore,  queryClient),
    prefetchStorage(themeStore,      queryClient),
  ]),
`})}),`
`,e.jsx(a,{of:c})]})}function y(t={}){const{wrapper:r}={...n(),...t.components};return r?e.jsx(r,{...t,children:e.jsx(o,{...t})}):o(t)}export{y as default};
