# Architecture Guide

This repository contains two apps:

- `yt2future-f2-v2` (Frontend, Next.js)
- `yt2future-be-v2` (Backend, Express + Prisma)

## Current Structure

### Backend (`yt2future-be-v2`)

- `src/modules/*/routes.ts`: feature routes (new preferred pattern)
  - `auth`, `reports`, `feedback`, `categories`
- `src/modules/*/*Service.ts`: feature business logic (Prisma queries, Cloudinary uploads, etc.)
- `src/controllers/*`: HTTP layer — read `req`, call services, map `AppError` / i18n messages
- `src/middlewares/*`: auth, validation, CORS, error handling
- `src/services/*`: shared helpers (e.g. `logService`) and legacy auth service
- `src/routes/*`: compatibility re-exports for migrated modules

Routing in `src/index.ts` now points to module routes directly.

### Frontend (`yt2future-f2-v2`)

- `features/*/api/*`: feature API layer (new preferred pattern)
  - `auth`, `reports`, `admin`, `categories`
- `services/*`: compatibility re-exports or shared transport
  - `apiClient.ts` remains the shared transport layer
- `app/*`: pages/layout/routes
- `components/*`: UI components

## API/Error Conventions

- Backend validation uses `zod` via `validateBody`, `validateQuery`, `validateParams`.
- Backend centralized error middleware handles:
  - `ZodError` -> validation response
  - `AppError` -> structured app error response
  - unknown -> generic 500
- Frontend `apiClient` parses backend error envelope and throws `ApiClientError`.

## Testing/Checks

### Backend

- `npm run lint`
- `npm run build`
- `npm run smoke:test` (basic endpoint smoke checks)

### Frontend

- `npm run lint`

## Migration Rule (for new work)

1. Add new feature endpoint/API inside `modules/*` (BE) and `features/*/api` (FE).
2. Keep old `routes/*` or `services/*` as thin re-export compatibility layers.
3. Update imports incrementally.
4. Remove compatibility layers only after all imports are migrated.
