import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as o}from"./index-C4iJPGah.js";import{M as s,C as a}from"./blocks-sQpChzyY.js";import{S as i,a as c}from"./Pattern.stories-DvHJyEcA.js";import"./iframe-B-OYst1r.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CENyMUzU.js";import"./ErrorBoundary-B5mOmJ7m.js";import"./useStorageSuspenseQuery-x15IEHOm.js";import"./useStorageMutation-BZG0_HEQ.js";import"./UserPrefs-CTpBp_as.js";function n(t){const r={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...o(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:i}),`
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
`,e.jsx(a,{of:c})]})}function P(t={}){const{wrapper:r}={...o(),...t.components};return r?e.jsx(r,{...t,children:e.jsx(n,{...t})}):n(t)}export{P as default};
