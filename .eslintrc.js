module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  ignorePatterns: ['node_modules', '/*.js', 'dist', 'coverage'],
  rules: {
    camelcase: 'error',
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    'no-console': 'error',
    'import/no-unresolved': 'error',
    'import/no-named-as-default-member': 'off',
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
    'no-useless-constructor': 'off',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['external', ['parent', 'sibling', 'index']],
        pathGroups: [
          {
            pattern: '/^@/',
            group: 'external',
          },
        ],
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
