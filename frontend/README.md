# Vita AI Dashboard Frontend

This Vite + React + TypeScript application renders the Vita AI wellbeing dashboard shown in the design mock. The build now relies on Tailwind CSS v4 for utility styling, GSAP for entrance animations, and Recoil for shared client state.

## Stack

- React 19 with TypeScript
- Vite for bundling and dev server
- Tailwind CSS v4 via the `@tailwindcss/postcss` plugin
- GSAP for animation timelines
- Recoil for global state containers
- Axios for API calls to the Vita AI backend

## Getting started

```bash
npm install
npm run dev
```

Visit http://localhost:5173 to view the dashboard.

## Production build

```bash
npm run build
npm run preview
```

The build command runs TypeScript project references and Vite production compilation. `npm run preview` serves the generated `dist/` bundle.

## Tailwind configuration notes

- Tailwind utilities are provided by `@tailwindcss/postcss`; do not import `tailwindcss` directly in `postcss.config.js`.
- Custom colours live in `tailwind.config.js` under `theme.extend.colors`. When you need additional shades, prefer the built-in palettes (e.g. `text-slate-600`).
- Avoid `@apply` where possible; Tailwind v4 requires `@reference` blocks for CSS modules. Base styles in `index.css` now use plain CSS instead.

## Animations

The main dashboard cards animate on mount using GSAP in `App.tsx`. Use the shared `animate-card` class or register new selectors in the GSAP timeline when adding sections.

## Linting & formatting

```bash
npm run lint
```

ESLint runs with the Vite starter configuration. Extend `eslint.config.js` as needed for stricter rules.
