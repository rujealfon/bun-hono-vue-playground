import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'app',
  typescript: true,
  formatters: true,
  ignores: ['**/migrations/*'],
}, {
  rules: {
    'no-console': ['warn'],
    'antfu/no-top-level-await': ['off'],
    'node/prefer-global/process': ['off'],
    'node/no-process-env': ['error'],
    'no-restricted-syntax': ['error', {
      selector: 'MemberExpression[object.name="Bun"][property.name="env"]',
      message: 'Direct access to Bun.env is not allowed. Use proper environment variable handling instead.',
    }],
    'perfectionist/sort-imports': ['error', {
      tsconfigRootDir: '.',
    }],
    'unicorn/filename-case': ['error', {
      case: 'kebabCase',
      ignore: ['README.md'],
    }],
  },
})
