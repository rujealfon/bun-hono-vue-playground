import { createConfig } from "@bun-hono-vue-playground/eslint-config";

// Server-specific ESLint configuration
export default createConfig({
  // Server-specific overrides
  vue: false, // Disable Vue rules for server
  react: false, // Disable React rules for server
  node: true, // Enable Node.js specific rules
});
