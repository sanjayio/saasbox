# Eckokit

Eckokit is an all in one platform to build and maintain AI Voice agents and automations.

## Core Commands

• Type-check and lint: `bun lint`
• Auto-fix style: `bun lint --fix`
• Start dev servers (frontend + backend): `bun dev`
• Build for production: `bun build`

All other scripts wrap these six tasks.

## Project Layout

This is a monorepo.

├─ src/app → NextJS 16 frontend and Tanstack + Hono backend.

• Public pages lives **only** in `src/app/(landing)`
• Protected pages lives **only** in `src/app/eckokit/`
• Shared components belong in `src/components`
• DB scripts and migrations belong in `src/drizzle`
• Server backend code belongs in `src/server`
• Thirdparty components belongs in `src/lib`
• Hooks that perform DB queries belongs in `src/hooks`

## Development Patterns & Constraints

Coding style
• TypeScript strict mode, single quotes, trailing commas, with semicolons.
• 100-char line limit, tabs for indent (2-space YAML/JSON/MD).
• Use interfaces for public APIs; avoid `@ts-ignore`.
• Visual diff loop for UI tweaks.
• Never introduce new runtime deps without explanation in PR description.

## Git Workflow Essentials

1. Branch from `main` with a descriptive name: `feature/<slug>` or `bugfix/<slug>`.
2. Keep commits atomic; prefer checkpoints (`feat: …`, `test: …`).

## Evidence Required for Every PR

A pull request is reviewable when it includes:

- Lint & type check pass (`bun lint`)
- Diff confined to agreed paths (see section 2)
- **Proof artifact**
  • Bug fix → failing test added first, now passes
  • Feature → new tests or visual snapshot demonstrating behavior
- One-paragraph commit / PR description covering intent & root cause
- No drop in coverage, no unexplained runtime deps

# Build & Lint

- Build: `bun run build`
- Lint: `bun run lint`
- Lint fix: `bun run lint --fix`

# Run Locally

- Dev: `bun run dev`

# Conventions

- Use `zod` for request validation

# External Services

- Better Auth for Authentication
- Arcjet for security and rate limiting
- Resend for email sending
- Stripe for payments
- Elevenlabs for voice agents
