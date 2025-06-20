# Bun + Hono + Vue Playground

A full-stack web application playground featuring:

- **Frontend**: Vue 3 with TypeScript, Vue Router, Pinia, and Vite
- **Backend**: Hono (lightweight web framework) running on Bun
- **Runtime**: Bun for fast package management and execution

## 📁 Project Structure

```
bun-hono-vue-playground/
├── client/                 # Vue 3 frontend application
│   ├── src/
│   │   ├── components/     # Vue components
│   │   ├── views/          # Vue route views
│   │   ├── router/         # Vue Router configuration
│   │   ├── stores/         # Pinia stores
│   │   └── assets/         # Static assets
│   ├── cypress/            # E2E tests
│   └── package.json
├── server/                 # Hono backend API
│   ├── src/
│   │   └── index.ts        # Main server entry point
│   └── package.json
└── package.json           # Root package with workspace scripts
```

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) installed on your system

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd bun-hono-vue-playground
```

2. Install dependencies for all packages

```bash
bun run install:all
```

### Development

Start both frontend and backend in development mode:

```bash
bun run dev
```

This will start:

- **Frontend**: http://localhost:5173 (Vue + Vite dev server)
- **Backend**: http://localhost:3000 (Hono API server)

### Individual Development Servers

Start only the frontend:

```bash
bun run dev:client
```

Start only the backend:

```bash
bun run dev:server
```

## 🛠️ Available Scripts

### Root Level Commands

- `bun run dev` - Start both client and server in development mode
- `bun run dev:client` - Start only the frontend development server
- `bun run dev:server` - Start only the backend development server
- `bun run build` - Build both client and server for production
- `bun run build:client` - Build only the frontend
- `bun run build:server` - Build only the backend
- `bun run start` - Start both client and server in production mode
- `bun run install:all` - Install dependencies for both client and server
- `bun run test` - Run unit tests
- `bun run test:e2e` - Run end-to-end tests
- `bun run lint` - Lint the codebase
- `bun run format` - Format the codebase

## 🎯 Frontend (Vue 3)

### Tech Stack

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Vue Router** for routing
- **Pinia** for state management
- **Vite** for build tooling
- **Vitest** for unit testing
- **Cypress** for E2E testing
- **ESLint + Prettier** for code quality

### Features

- Modern Vue 3 setup with `<script setup>` syntax
- TypeScript support with proper type checking
- Hot module replacement (HMR)
- Component testing with Vitest
- E2E testing with Cypress
- Code linting and formatting

## ⚡ Backend (Hono)

### Tech Stack

- **Hono** - Lightweight, fast web framework
- **Bun** - JavaScript runtime and package manager
- **TypeScript** for type safety

### API Endpoints

- `GET /` - Hello world endpoint
- `GET /api/health` - Health check endpoint

### Features

- Hot reloading during development
- Fast startup and execution with Bun
- TypeScript support
- Lightweight and fast API responses

## 📦 Package Management

This project uses **Bun** as the package manager and runtime. Bun provides:

- Fast package installation
- Built-in bundler and transpiler
- Hot reloading
- Native TypeScript support

## 🧪 Testing

### Unit Tests

```bash
bun run test
```

### End-to-End Tests

```bash
# Development mode (with GUI)
bun run test:e2e:dev

# Production mode (headless)
bun run test:e2e
```

## 🏗️ Building for Production

Build both frontend and backend:

```bash
bun run build
```

The frontend will be built to `client/dist/` and the backend to `server/dist/`.

## 🚀 Production Deployment

Start the production servers:

```bash
bun run start
```

This will serve:

- Frontend: Built static files served via preview server
- Backend: Compiled Hono application

## 📖 Development Notes

- The project uses Bun's native hot reloading for both frontend and backend development
- Frontend and backend run on different ports during development to enable CORS and independent development
- Both applications support TypeScript out of the box
- ESLint and Prettier are configured for consistent code style

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

---

Happy coding! 🎉
