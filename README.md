# Bun + Hono + Vue Playground Monorepo

A monorepo setup using Bun workspaces with a Hono API and Vue + Vite client.

## Features

- Run tasks in parallel across apps / packages with Bun
- Hono API with Vue.js frontend
- Shared TypeScript and ESLint configurations
- Bun workspaces for dependency management
- Cypress E2E testing

## Tech Stack

### API (`apps/api`)

- Hono
- TypeScript
- Bun runtime

### Web (`apps/web`)

- Vue 3
- Vite
- TypeScript
- Pinia for state management
- Vue Router
- Cypress for E2E testing
- Vitest for unit testing

### Shared Packages (`packages/`)

- `@bun-hono-vue-playground/eslint-config` - Shared ESLint configuration
- `@bun-hono-vue-playground/typescript-config` - Shared TypeScript configurations

## Project Structure

```
bun-hono-vue-playground/
├── apps/
│   ├── api/          # Hono API server
│   └── web/          # Vue.js frontend
├── packages/
│   ├── eslint-config/    # Shared ESLint config
│   └── typescript-config/ # Shared TypeScript configs
├── package.json      # Root workspace configuration
└── bunfig.toml      # Bun configuration
```

## Local Setup

### Install dependencies

```bash
bun install
```

### Start development servers

```bash
# Start both API and web in parallel
bun run dev

# Or start individually
bun run dev:web   # Vue.js frontend on http://localhost:5173
bun run dev:api   # Hono API on http://localhost:8787
```

### Build applications

```bash
# Build both apps
bun run build

# Or build individually
bun run build:web
bun run build:api
```

### Run tests

```bash
# Run all tests
bun run test

# Run E2E tests
bun run test:e2e
```

### Lint and format

```bash
# Lint all apps
bun run lint

# Format all apps
bun run format

# Type check all apps
bun run typecheck
```

## Available Scripts

All scripts are run from the root of the monorepo:

- `bun run dev` - Start all apps in development mode
- `bun run build` - Build all apps for production
- `bun run test` - Run all tests
- `bun run lint` - Lint all apps
- `bun run format` - Format all apps
- `bun run typecheck` - Type check all apps
- `bun run clean` - Clean all build artifacts

## Adding New Apps

To add a new app to the monorepo:

1. Create a new directory in `apps/`
2. Initialize with `bun init`
3. Update the app's `package.json` name to follow the pattern: `@bun-hono-vue-playground/app-name`
4. Use shared configurations from `packages/` where appropriate

## Adding New Packages

To add a new shared package:

1. Create a new directory in `packages/`
2. Add a `package.json` with name following the pattern: `@bun-hono-vue-playground/package-name`
3. Set `"private": true` for internal packages
4. Reference the new package in apps using `"workspace:*"` version
