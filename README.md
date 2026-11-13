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

## Build and Deployment

Vercel is responsible for production builds and deployments through its Git integration with this repository. Connect the repository to the `personal-website` Vercel project and set `main` as the production branch.

- Pushes to `main` trigger a production build and deployment on Vercel.
- Pull requests receive Vercel preview deployments.
- Configure build settings and environment variables in the Vercel project. The Next.js build command is `npm run build`.
- Check Vercel's Deployments page for build logs and deployment status. A production deployment is live when its status is Ready and it is assigned to the production domain.

GitHub Actions is used only for validation (typecheck, lint, unit tests, and Playwright E2E). Deployment does not depend on GitHub Actions. The separate GitHub Actions Vercel deployment workflow has been removed to avoid duplicate deployment paths.

To inspect deployments with the Vercel CLI:

```bash
vercel login
vercel link
vercel list personal-website --environment production
vercel inspect <deployment-url>
```

When a manual deployment is needed, run `vercel` for a preview or `vercel --prod` for production. These commands upload the source and let Vercel build it. Local `npm run build` remains available for verification; a local prebuilt deployment is not required.

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
