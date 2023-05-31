module.exports = {
  env: {
    browser: true,
    es2022: true,
    jest: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['src'],
      },
    },
  },
  ignorePatterns: ['node_modules/*', '!.prettierrc.js'], // We don't want to lint generated files nor node_modules, but we want to lint .prettierrc.js (ignored by default by eslint)
  extends: [
    'react-app',
    'plugin:prettier/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
  ],
  plugins: ['prettier', '@typescript-eslint', 'eslint-comments', 'jest'],
  rules: {
    // Prettier rules
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        usePrettierrc: true,
      },
    ],

    // Best practices
    'no-console': 'off',
    'no-nested-ternary': 'off',
    'no-plusplus': 'off',

    // Stylistic issues
    'arrow-body-style': 'warn',
    'arrow-parens': 'off',
    'comma-dangle': ['warn', 'always-multiline'],
    'eol-last': 'warn',
    'func-names': 'off',
    'import/no-default-export': 'off',
    'import/no-unresolved': ['error'],
    'jsx-quotes': 'warn',
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
      },
    ],
    'no-trailing-spaces': [
      'error',
      {
        ignoreComments: false,
        skipBlankLines: true,
      },
    ],
    'no-unneeded-ternary': [
      'error',
      {
        defaultAssignment: false,
      },
    ],
    'object-curly-spacing': ['error', 'always'],
    semi: ['error', 'never'],
    'space-before-function-paren': [
      'warn',
      {
        anonymous: 'never',
        asyncArrow: 'always',
        named: 'never',
      },
    ],

    // React-specific rules
    'jsx-a11y/anchor-is-valid': 'warn',
    'react/jsx-first-prop-new-line': ['warn', 'multiline'],
    'react/jsx-indent-props': ['warn', 2],
    'react/jsx-key': 'error',
    'react/no-array-index-key': 'warn',
    'react/no-danger': 'warn',
    'react/no-unescaped-entities': 'warn',
    'react/prop-types': 'off',
  },
}
