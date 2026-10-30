# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev              # Next.js dev server on http://localhost:3000
npm run build            # production build
npm run lint             # ESLint (flat config, eslint-config-next core-web-vitals + typescript)
npx tsc --noEmit         # type check (run in CI)
npm test                 # Vitest in watch mode
npm run test:run         # Vitest single run (what CI uses)
npx vitest run src/features/current-weather/current-weather.test.tsx   # single test file
npx vitest run -t "renders skeleton"                                   # tests by name
```

CI (`.github/workflows/ci.yml`, Node 22) runs lint → `tsc --noEmit` → `test:run` → build on pushes/PRs to `main` and `develop`. `develop` is the integration branch for PRs.

Environment variables (`.env.local`): `GROQ_API_KEY` (LLM clothing advice), `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN` (header/footer CMS content).

## Stack

Next.js 16 App Router + React 19, TypeScript, Tailwind CSS v4 (CSS-first config in `src/styles/globals.css`, no `tailwind.config`), TanStack Query v5, Zustand v5, GSAP (`@gsap/react`), lucide-react icons. Vitest + Testing Library with jsdom and globals; `@/*` maps to `src/*`.

## Architecture

**Layered data access.** External APIs are only called from server-side code; the browser talks to the app's own route handlers:

- `src/lib/service/*` — server-only calls to third parties (Open-Meteo forecast + geocoding, Nominatim reverse geocoding, Groq chat completions, Contentful CDN). Each service defines a `*Dto` type for the raw response and a `map*DtoToDomain` function; domain types live in `src/types/`.
- `src/app/api/*/route.ts` — thin route handlers (`weather`, `cities`, `reverse-geocode`, `clothing-advice`) that validate params and call services.
- `src/lib/client/*` — browser `fetch` wrappers hitting `/api/*`.
- `src/hooks/use-*.ts` — TanStack Query hooks around the client functions.

**SSR + hydration of weather.** `src/app/(home)/page.tsx` reads the selected city from the `city` cookie (`getCityFromCookie`, falling back to `DEFAULT_CITY`), prefetches weather by calling the service directly, and passes it through `HydrationBoundary`. The prefetch query key `["weather", lat, lon]` must stay identical to the one in `useWeather`. `getQueryClient` returns a fresh client per request on the server and a singleton in the browser.

**State.**
- City: a per-request Zustand store (`createCityStore`) provided via React context in `CityStoreProvider`, seeded with the cookie city; read it with `useCityStore(selector)`. Two components that render nothing, mounted by `WeatherWidget`, keep it in sync: `CitySync` writes the selection back to the `city` cookie (so the next SSR uses it), and `GeolocationSync` replaces the default city with the browser's location via reverse geocoding.
- Temperature unit: a global Zustand store persisted to localStorage (`unit-store`). Components that depend on it gate rendering on `useHasHydrated()` to avoid hydration mismatches; convert with `lib/weather/convert-temperature`.

**Clothing advice.** `POST /api/clothing-advice` asks Groq for a short suggestion and falls back to `getRuleBasedAdvice` on any failure, so the endpoint always returns `{ advice }`.

**Layout.** `Header` and `Footer` are async Server Components fetching Contentful content (ISR `revalidate: 3600`) with hard-coded fallbacks, rendered outside `<Providers>` in `layout.tsx` — they can't use React Query or the city store.

**Component conventions.** `src/components/` holds shared UI; `src/features/` holds feature modules. Features are often split into a container (`index.tsx`, hooks/state) and a presentational `*.view.tsx`, with a separate `*-skeleton` for loading states. Tests sit next to the component (`*.test.tsx`) and mock hooks/stores/GSAP with `vi.mock` rather than hitting the network.

**Styling & theming.** Use the design tokens from `globals.css` (`bg-paper`, `bg-canvas`, `bg-surface`, `bg-skeleton`, `text-ink`, `text-ink-muted`, `text-danger`, `border-hairline`, `font-display` = Cormorant Garamond, `font-sans` = Roboto). Weather accent colors are CSS variables (`--accent-*`) returned as `var(...)` strings by `weatherCodeToAccent`. Theme choice (light / dark / system) lives in the `theme` cookie: `layout.tsx` reads it via `getThemeFromCookie` and sets `data-theme` on `<html>` (no attribute = follow `prefers-color-scheme`), and `ThemeToggle` updates the attribute and cookie on the client. Don't use Tailwind `dark:` variants (they only follow the OS preference and ignore the manual choice); add any new color as a token with values for both themes.
