# Task Catalog

A drag-and-drop task board styled like a library card catalog — drawers instead of columns, index cards instead of tickets. Built to show frontend fundamentals: component architecture, custom hooks, state management, and a design that isn't a default template.

**Live demo:** https://Firqan.github.io/task-catalog/

## Features

- **Drag and drop** — move cards between drawers using the native HTML5 drag API (no extra dependency)
- **Custom drawers** — add, rename, or remove columns to fit any workflow
- **Priority tagging** — low / medium / high, shown as a color-coded dot on each card
- **Persistence** — everything saves to `localStorage`; refresh and your board is exactly where you left it
- **Dark mode** — manual toggle, remembers your preference
- **Tested** — the board's core logic (add/edit/move/delete tasks and columns) is covered by unit tests, independent of the UI
- **CI/CD** — every push to `main` runs the test suite and deploys to GitHub Pages automatically via GitHub Actions

## Tech stack

React 19, TypeScript, Vite, Tailwind CSS v4, Vitest + Testing Library.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
```

Run tests:

```bash
npm test
```

Build for production:

```bash
npm run build
npm run preview   # serve the production build locally
```

## Design notes

The visual language borrows from library card catalogs: each column is a "drawer" with a die-cut tab label, and each card carries a sequential catalog number (`No. 001`, `No. 002`, ...) in the same way a library index card would. It's a deliberate alternative to the generic "sticky note" look most task boards default to.

State is split into a pure reducer (`src/store/boardReducer.ts`) and a thin `localStorage`-syncing hook (`src/store/useBoardStore.ts`). The reducer has no dependency on the DOM or React, which is what makes it possible to unit test task/column logic directly, without rendering any components.

## Project structure

```
src/
  components/   UI components (Board, Column, TaskCard, TaskForm, ThemeToggle)
  store/        State: the reducer, the localStorage-backed hook, the theme hook
  utils/        Small formatting helpers (priority labels, catalog numbers, dates)
  types.ts      Shared TypeScript types
```

## License

MIT
