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

## Resume Uploads

The public Resume nav link points at `/resume`. That route redirects to the latest resume uploaded to Vercel Blob, and falls back to `public/David_Duong_Resume.pdf` when Blob metadata is not available.

To enable uploads:

1. Create a Vercel Blob store connected to this Vercel project.
2. Make sure `BLOB_READ_WRITE_TOKEN` is available to the environments where uploads should work.
3. Open `/admin/resume` from a Vercel-authenticated deployment URL, not from the public production alias.

The admin upload route is intentionally disabled on the public production domain. Vercel Authentication with Standard Protection protects preview and generated deployment URLs while keeping the public portfolio URL open.

## Planning

- `docs/website-plan.md`: product, content, motion, and deployment plan

## Next Steps

1. Configure the Vercel Blob store for resume uploads.
2. Add automated resume parsing if the site should update experience and skills from future PDFs.
