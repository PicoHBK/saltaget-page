# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server with HMR.
- `npm run build` — type-check (`tsc -b`) then produce a production build into `dist/`.
- `npm run lint` — run ESLint over the whole project.
- `npm run preview` — serve the built `dist/` locally.

There is no test runner configured in this project.

## Architecture

Single-page marketing/demo site for "SaltaGet" built with React 19 + Vite + TypeScript, Tailwind CSS v4, and shadcn/ui (new-york style). UI copy is in Spanish.

### Entry and routing

- `src/main.tsx` mounts `<App>` wrapped in a single TanStack Query `QueryClientProvider` (the client lives in `src/providers/queryProvider.ts`).
- `src/App.tsx` renders `RoutesWeb`, which uses `react-router-dom` v7 `createBrowserRouter`. The router defines a `Layout` (`<Header /> + <Outlet />`) with two routes: `/` → `pages/home/Home` and `/chat` → `pages/AIChat`. `Header` hides its nav on the home page based on `location.pathname`.
- Note: `src/routes/RoutesWeb.tsx` is currently deleted in the working tree while `App.tsx` still imports it, so the app does not build as-is. Restore or recreate this file (its prior content is in git history) before expecting `npm run dev`/`build` to succeed.

### Two separate backends

The app talks to **two distinct APIs**, each its own Axios instance reading a different env var. Use the matching instance — do not cross them:

- `src/api/saltagetApi.ts` — base URL `VITE_API_URL` (main SaltaGet backend). Used by the contact form (`POST /email/send_email` in `pages/home/forms/FormContacto.tsx`).
- `src/api/AIChat.ts` — base URL `VITE_API_CHAT_URL` (separate Django AI-chat service on Render). Used by the chat demo (`POST /api/chat/`) and product lookups (`POST /api/products/by-ids/` via `hooks/useProductsByIds.ts`).

Both URLs are configured in `.env` (`VITE_*` vars, exposed to the client).

### Data flow conventions

- All network calls go through TanStack Query `useMutation` (this is a forms-and-actions app, not a query-cache-heavy one). Components define the `mutationFn` inline or import a hook like `useProductsByIds`.
- The AI chat flow in `pages/AIChat.tsx` is two-staged: the chat response may include `front_end_data: { model: "Product", ids: [...] }`; when present the component fires a second mutation to resolve those IDs into product cards. Conversation state is intentionally trimmed to the most recent exchange (`slice(-2)`). A `429` from the chat API is handled specially with a "demo is tired" message.

### UI / styling

- Tailwind v4 via `@tailwindcss/vite` (no `tailwind.config` file; config is CSS-driven in `src/index.css`).
- shadcn/ui components live in `src/components/ui/` (config in `components.json`). Add new ones with the shadcn CLI; `iconLibrary` is `lucide`.
- `cn()` in `src/lib/utils.ts` (clsx + tailwind-merge) is the standard className helper.
- `framer-motion` is used heavily for hero animations; Lottie JSON assets live in `src/assets/`.
- The `@` alias maps to `src/` (configured in both `vite.config.ts` and `tsconfig`).

### Build artifacts

`dist/` is committed to the repo and tracked in git, so production builds show up as diffs — regenerate it with `npm run build` when shipping rather than hand-editing.
