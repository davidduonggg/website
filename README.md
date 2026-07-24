# Personal Website

This repository contains the planning and implementation work for my personal website, built with Next.js.

## Goals

- Present a clear professional profile
- Showcase selected projects and writing
- Provide a simple contact path
- Keep the site fast, maintainable, and easy to update

## Stack

- Next.js App Router
- React
- `animejs` for DOM choreography
- `three` for the homepage signal field
- Vercel for deployment

## Local Development

```bash
npm install
npm run dev
```

The site runs at `http://127.0.0.1:3000` when using the Playwright test server.

## Verification

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run e2e
```

## Deployment

Vercel CLI is used for deployment checks and deploy commands:

```bash
npm run vercel:pull
npm run vercel:build
npm run vercel:deploy:preview
npm run vercel:deploy:production
```

GitHub Actions includes CI for typecheck, lint, unit tests, build, and Playwright E2E. Vercel preview and production deploy jobs run when `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` are configured as repository secrets.

## Planning

- `docs/website-plan.md`: product, content, motion, and deployment plan

## Next Steps

1. Replace placeholder contact details with real links.
2. Replace placeholder project categories with real project entries.
3. Link the GitHub repository to Vercel and configure the deployment secrets.
