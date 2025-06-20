# Bun + Hono + Vue Monorepo Playground

A modern monorepo setup using Bun workspaces, featuring a Hono API server and Vue.js client with shared TypeScript types and utilities.

## 🏗️ Monorepo Structure

```
bun-hono-vue-playground/
├── apps/
│   ├── client/          # Vue.js frontend application
│   └── server/          # Hono API server
├── packages/
│   └── shared/          # Shared types, utilities, and constants
├── package.json         # Root workspace configuration
└── README.md
```

## 📦 Workspaces

- **`apps/client`** - Vue 3 + TypeScript + Vite frontend
- **`apps/server`** - Hono API server with Bun runtime
- **`packages/shared`** - Shared TypeScript package with:
  - Common types and interfaces
  - API endpoint constants
  - Utility functions
  - HTTP status codes

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh) >= 1.0.0

### Installation

```bash
# Install all dependencies for all workspaces
bun install

# Build the shared package first
cd packages/shared && bun run build && cd ../..
```

### Development

```bash
# Start both client and server in development mode
bun run dev

# Or start them individually
bun run dev:client  # Vue dev server on http://localhost:5173
bun run dev:server  # Hono server on http://localhost:3000
```

### Building

```bash
# Build all packages
bun run build

# Or build individually
bun run build:shared
bun run build:client
bun run build:server
```

### Testing

```bash
# Run client tests
bun run test

# Run end-to-end tests
bun run test:e2e
```

## 🔄 Shared Package Usage

The `@monorepo/shared` package provides common functionality used by both client and server:

### Types

```typescript
import { User, ApiResponse, HealthResponse } from "@monorepo/shared";
```

### Constants

```typescript
import { API_ENDPOINTS, HTTP_STATUS } from "@monorepo/shared";
```

### Utilities

```typescript
import { createSuccessResponse, isValidEmail } from "@monorepo/shared";
```

## 🎯 Features Demonstrated

- **Bun Workspaces**: Efficient monorepo dependency management
- **Shared Types**: Type-safe API contracts between client and server
- **Cross-workspace imports**: Direct imports from shared package
- **API Integration**: Vue client consuming Hono API with shared types
- **Development workflow**: Hot reload for both client and server
- **TypeScript**: Full type safety across the entire monorepo

## 📁 Adding New Packages

To add a new shared package:

```bash
mkdir packages/new-package
cd packages/new-package
# Create package.json with workspace dependencies
```

To add a new app:

```bash
mkdir apps/new-app
cd apps/new-app
# Create package.json with workspace dependencies
```

## 🛠️ Scripts

### Root Level

- `bun run dev` - Start client and server concurrently
- `bun run build` - Build all packages
- `bun run clean` - Clean all node_modules and dist folders
- `bun run type-check` - Run TypeScript checks across all packages

### Client (`apps/client`)

- `bun run dev` - Start Vite dev server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run test:unit` - Run unit tests
- `bun run test:e2e` - Run E2E tests

### Server (`apps/server`)

- `bun run dev` - Start server with hot reload
- `bun run build` - Build for production
- `bun run start` - Start production server

### Shared (`packages/shared`)

- `bun run build` - Build TypeScript to JavaScript
- `bun run type-check` - Check types without emitting files
- `bun run dev` - Build in watch mode

## 🔧 Configuration

- **TypeScript**: Configured with path mapping for shared packages
- **Vite**: Includes proxy configuration for API calls
- **ESLint/Prettier**: Consistent code formatting across workspaces
- **Bun**: Native TypeScript support and fast installs

## 🌟 Benefits of This Setup

1. **Code Sharing**: Eliminate duplication between client and server
2. **Type Safety**: Shared interfaces ensure API contract consistency
3. **Fast Development**: Bun's speed for installs and hot reload
4. **Scalability**: Easy to add new apps or packages
5. **Maintainability**: Centralized dependency management
6. **Developer Experience**: Excellent TypeScript support and tooling
