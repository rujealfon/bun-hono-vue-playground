import { createConfig } from "@bun-hono-vue-playground/eslint-config";

// Root ESLint configuration for the monorepo
export default createConfig({
  // Enable all relevant features for monorepo root
  vue: true,
  typescript: true,
  node: true,

  // Additional ignores for monorepo root
  ignores: [
    "**/dist/**",
    "**/coverage/**",
    "**/node_modules/**",
    "apps/*/dist/**",
    "packages/*/dist/**",
    "**/.next/**",
    "**/.nuxt/**",
    "**/.vercel/**",
    "**/.netlify/**",
  ],
});
