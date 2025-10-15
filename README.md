# UrbanConnect – Citizen Driven Smart City Planner

Inclusive, transparent, and participatory planning platform.

## Quick Start

1. Install deps
   - `npm install`
2. Configure env
   - Copy `ENV.sample` to `.env` and adjust values
3. Run dev server
   - `npm run dev`

## Scripts

- `npm run dev` – start dev server
- `npm run build` – build for production
- `npm run preview` – preview production build
- `npm run test` – run unit tests (Vitest)

## Structure

- `src/context` – `AuthContext.jsx`, `ThemeContext.jsx`, `UserContext.jsx`
- `src/components` – `Navbar`, `Sidebar`, `Footer`, `Loader`, `MapView`, charts
- `src/pages` – Home, Auth, Citizen, Planner, Transparency, NotFound
- `src/hooks` – `useAuth`, `useFetch`, `useMap`
- `src/services` – `api.js`, citizen/planner/analytics services
- `src/utils` – constants, formatters, mockData
- `src/styles` – `globals.css`, `theme.css`
- `src/tests` – Testing Library + Vitest setup

## Env

Expected variables:

```
VITE_API_BASE_URL=http://localhost:4000/api
VITE_MAP_PROVIDER=leaflet
```

## Notes

- Routing is intentionally deferred in this scaffold per request. Add routes in `src/routes/AppRoutes.jsx` and wire into `App.jsx` when ready.

