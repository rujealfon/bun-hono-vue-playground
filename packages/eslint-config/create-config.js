import antfu from "@antfu/eslint-config";

export function createConfig(options = {}) {
  return antfu(
    {
      // Enable stylistic formatting rules
      stylistic: true,

      // Enable TypeScript support
      typescript: true,

      // Enable Vue support
      vue: true,

      // Enable React support if needed (set to false for Vue-only)
      react: false,

      // Enable Node.js specific rules
      node: true,

      // Disable some opinionated rules that might not fit all projects
      lessOpinionated: false,

      // Enable auto-fixing where possible
      autoSort: true,

      // Enable type checking (requires tsconfig.json)
      typeChecked: false,

      // Files to ignore
      ignores: [
        "**/dist/**",
        "**/coverage/**",
        "**/node_modules/**",
        "**/.nuxt/**",
        "**/.next/**",
        "**/.vercel/**",
        "**/.netlify/**",
      ],

      // Override default options
      ...options,
    },
    {
      // Custom rules for the monorepo
      rules: {
        // Allow console in development
        "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",

        // Vue specific customizations
        "vue/multi-word-component-names": "off",
        "vue/no-v-html": "off",

        // TypeScript customizations
        "@typescript-eslint/no-unused-vars": [
          "error",
          { argsIgnorePattern: "^_" },
        ],

        // Import sorting (antfu has this built-in, but we can customize)
        "antfu/if-newline": "error",
        "antfu/import-dedupe": "error",

        // Style preferences
        curly: ["error", "multi-line"],
        quotes: ["error", "single"],
        "quote-props": ["error", "consistent-as-needed"],
      },
    },
    {
      // Specific rules for TypeScript files only
      files: ["**/*.ts", "**/*.tsx", "**/*.vue"],
      rules: {
        "@typescript-eslint/consistent-type-imports": "error",
      },
    },
    {
      // Disable TypeScript-specific rules for JSON files
      files: ["**/*.json", "**/*.jsonc"],
      rules: {
        "@typescript-eslint/consistent-type-imports": "off",
        "ts/consistent-type-imports": "off",
      },
    }
  );
}

export default createConfig;
