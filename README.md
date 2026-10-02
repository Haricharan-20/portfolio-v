# Hari Charan Portfolio

A premium editorial React/Vite portfolio rebuilt from the supplied Hari Charan reference and Canva source design.

## Development

```bash
pnpm install
pnpm run dev
```

The managed preview uses port `3000`. The production build is generated with:

```bash
pnpm run build
```

## Implementation notes

- Full-bleed hero video uses `public/assets/hero.mp4` with `hero-poster.jpg` as the poster fallback.
- The 3D security-core accent is lazy-loaded from `src/components/MorphScene.tsx` and degrades naturally when motion is reduced.
- Portfolio content is data-driven in `src/data.ts`.
- The site is a single accessible scroll route with `public/manus-routes.json` for managed routing.

## Deployment

The project is prepared for Vercel with `vercel.json` and the managed Webdev static build configuration. No server or database is required.
