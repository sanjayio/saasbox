# Eckokit

Eckokit is an all-in-one platform to build and maintain AI Voice agents and automations.

## Tech Stack

- **Frontend**: Next.js 16 with React 19
- **Backend**: Tanstack Query + Hono
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth with Passkey support
- **Security**: Arcjet for rate limiting and protection
- **Email**: Resend
- **Payments**: Stripe
- **Voice AI**: Elevenlabs

## Getting Started

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Build for production
bun build

# Type-check and lint
bun lint

# Auto-fix linting issues
bun lint --fix
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

This is a monorepo with the following layout:

```
src/
├── app/                    # Next.js 16 frontend and backend
│   ├── (landing)/         # Public pages
│   └── eckokit/           # Protected pages
├── components/            # Shared UI components
├── drizzle/              # Database schemas and migrations
├── server/               # Backend API code
├── lib/                  # Third-party integrations
└── hooks/                # React hooks (including DB queries)
```

## Database Commands

```bash
# Generate migrations
bun db:generate

# Run migrations
bun db:migrate

# Push schema changes
bun db:push

# Open Drizzle Studio
bun db:studio

# Generate auth schema
bun auth:generate
```

## Development Guidelines

### Coding Style

- TypeScript strict mode with single quotes, trailing commas, and semicolons
- 100-character line limit
- Tabs for indentation (2-space for YAML/JSON/MD)
- Use interfaces for public APIs
- Avoid `@ts-ignore`

### Conventions

- Use `zod` for request validation
- Follow existing patterns and libraries already in the project
- Never introduce new runtime dependencies without explanation in PR description

### Git Workflow

1. Branch from `main` with descriptive names: `feature/<slug>` or `bugfix/<slug>`
2. Keep commits atomic with conventional commit messages (`feat:`, `fix:`, `test:`, etc.)
3. Every PR must include:
   - Passing lint & type checks (`bun lint`)
   - Tests for new features or bug fixes
   - One-paragraph description covering intent and root cause
   - No drop in coverage

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines and [AGENTS.md](AGENTS.md) for AI agent development patterns.
