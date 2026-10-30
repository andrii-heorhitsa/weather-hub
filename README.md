# Weather Hub

A weather app with AI clothing advice, built with Next.js (App Router) and TypeScript.

**Live demo:** https://weather-hub-umber.vercel.app

## Features

- Current weather and a 7-day forecast for any city
- City search with debounced autocomplete
- Geolocation: on first visit the app asks for your location and shows the weather for your city
- AI clothing advice for the current weather (Groq LLM), with a rule-based fallback when the AI is unavailable
- GSAP animations: weather icon animation that depends on the weather condition, animated temperature counter; respects `prefers-reduced-motion`
- °C / °F toggle and light / dark / system theme
- Loading skeletons and Error Boundaries (`error.tsx`, `global-error.tsx`)
- Header and footer content from Contentful CMS

## Tech stack

- Next.js 16 (App Router, Route Handlers), React 19, TypeScript (strict, no `any`)
- TanStack Query (server state, SSR prefetch + `HydrationBoundary`), Zustand (client state)
- Tailwind CSS v4
- GSAP + `@gsap/react` (`useGSAP`)
- Vitest + React Testing Library
- APIs: Open-Meteo (weather, geocoding), OpenStreetMap Nominatim (reverse geocoding), Groq (LLM), Contentful (CMS)
- CI: GitHub Actions (lint, type check, tests, build); deployed on Vercel

## Project structure

```
src/
  app/          routes, layouts, error boundaries, API route handlers (app/api/*)
  features/     feature modules (current-weather, city-search, clothing-advice, ...)
  components/   shared UI components
  hooks/        React Query and utility hooks
  lib/
    service/    server-side calls to external APIs (keys stay on the server)
    client/     browser-side calls to the app's own API routes
  store/        Zustand stores
  types/        shared types
```

## Getting started

Requirements: Node.js 22 and npm.

```bash
git clone https://github.com/andrii-heorhitsa/weather-hub.git
cd weather-hub
npm install
```

Create `.env.local` in the project root:

```bash
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token
GROQ_API_KEY=your_groq_api_key
```

| Variable                                         | Where to get it                                                                                                                                                                   |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN` | Contentful → Settings → API keys (Content Delivery API). The space needs entries of content types `header` (`siteTitle`, `tagline`) and `footer` (`copyrightText`, `footerNote`). |
| `GROQ_API_KEY`                                   | https://console.groq.com/keys. Without it the app still works and shows the rule-based advice.                                                                                    |

Open-Meteo and Nominatim need no keys.

Run the dev server and open http://localhost:3000:

```bash
npm run dev
```

## Scripts

| Command            | What it does             |
| ------------------ | ------------------------ |
| `npm run dev`      | Start the dev server     |
| `npm run build`    | Production build         |
| `npm start`        | Run the production build |
| `npm run lint`     | ESLint                   |
| `npx tsc --noEmit` | Type check               |
| `npm test`         | Tests in watch mode      |
| `npm run test:run` | Tests once (as in CI)    |
