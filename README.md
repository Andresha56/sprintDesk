# SprintDesk

SprintDesk is a focused sprint management workspace built with React, TypeScript, Vite, Zustand, Recharts, and responsive accessible UI patterns.

## Run locally

```bash
npm install
npm run dev
```

Demo login values are prefilled (`emilys` / `emilyspass`). Run `npm run build` for the production check and `npm run test` for the test suite.

## Architecture

- `src/store.ts` owns persisted client state for tasks, notifications, and theme.
- The routed workspace lives in `src/App.tsx` with dashboard, board, analytics, login, drawer, and modal surfaces.
- Board metrics and charts are derived directly from Zustand task state, so additions and deletions update analytics immediately.
- Notifications poll JSONPlaceholder on authenticated shell mount and persist through the same store.

## Assessment notes

This delivery prioritizes a coherent product surface in an empty workspace. The authentication form uses a local demo session so the app remains usable offline; the production follow-up is to move DummyJSON login, refresh-token interception, and mock-data seeding into a dedicated API/query layer. The board supports accessible click-based status updates in addition to the planned `@dnd-kit` interaction. Route components remain in the app module for the initial delivery; extracting them to lazy-loaded modules is the next performance pass before deployment.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
