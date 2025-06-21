import config from "@monorepo/eslint-config";

// Server-specific config
export default [
  ...config,
  {
    rules: {
      // Allow console in server
      "no-console": "off",
    },
  },
];
