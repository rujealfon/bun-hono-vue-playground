import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import oxlint from "eslint-plugin-oxlint";
import vitest from "@vitest/eslint-plugin";

export default [
  {
    name: "app/files-to-lint",
    files: ["**/*.{ts,mts,tsx,vue,js,jsx}"],
  },
  {
    name: "app/files-to-ignore",
    ignores: [
      "**/dist/**",
      "**/dist-ssr/**",
      "**/coverage/**",
      "**/node_modules/**",
    ],
  },

  js.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  ...vueTsEslintConfig(),
  oxlint.configs["flat/recommended"],

  {
    ...vitest.configs.recommended,
    files: ["src/**/__tests__/*"],
  },

  {
    rules: {
      // Custom rules for the monorepo
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "vue/multi-word-component-names": "off",
    },
  },
];
