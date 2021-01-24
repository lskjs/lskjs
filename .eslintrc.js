const rulesJsOnly = {
  '@typescript-eslint/explicit-module-boundary-types': 'off',
};
const rules = {
  'max-len': [
    'error',
    {
      code: 120,
      ignoreComments: true,
    },
  ],
  'prettier/prettier': 'warn',
  'class-methods-use-this': 'off',
  'global-require': 'off',
  'lines-between-class-members': 'off',
  'func-names': 'off',
  'no-underscore-dangle': 'off',
  'no-throw-literal': 'off',

  // React
  'react/prop-types': 'error',
  'react/forbid-prop-types': 'error',

  'react/state-in-constructor': 'off',
  'react/jsx-props-no-spreading': 'off',
  'react/jsx-filename-extension': [
    1,
    {
      extensions: ['.jsx', '.tsx'],
    },
  ],

  // imports
  'import/extensions': ['error', 'ignorePackages', { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' }],
  'import/no-extraneous-dependencies': [
    'error',
    { devDependencies: false, optionalDependencies: true, peerDependencies: true },
  ],
  // its for orders
  'import/order': 'off',
  'sort-imports': 'off',
  'simple-import-sort/imports': 'error',

  // its fix
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': ['error'],
  'no-use-before-define': 'off',
  '@typescript-eslint/no-use-before-define': ['error'],

  // ts
  '@typescript-eslint/ban-ts-comment': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/no-var-requires': 'off',
  '@typescript-eslint/ban-types': [
    'error',
    {
      types: {
        object: {
          fixWith: 'Record<string, unknown>',
        },
      },
      extendDefaults: true,
    },
  ],
};

module.exports = {
  env: {
    browser: false,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'simple-import-sort', 'prettier'],
  settings: {
    'import/resolver': {
      typescript: {
        // always try to resolve types under `<root>@types` directory even it doesn't contain any source code,
        // like `@types/unist`
        alwaysTryTypes: true,
      },
    },
  },
  // rules: {
  //   'prettier/prettier': 'error',
  //   '@typescript-eslint/ban-ts-comment': 'off',
  //   'no-shadow': 'off',
  //   '@typescript-eslint/no-shadow': 'error',
  //   'no-use-before-define': ['error', { functions: false }],
  //   'import/extensions': [
  //     'error',
  //     'ignorePackages',
  //     {
  //       js: 'never',
  //       ts: 'never',
  //     },
  //   ],
  //   'no-restricted-imports': [
  //     'error',
  //     {
  //       name: 'config',
  //       message: 'Please use getConfigValue util instead',
  //     },
  //   ],
  //   'import/prefer-default-export': 'off',
  //   'import/no-default-export': 'error',
  //   'import/order': 'off',
  //   'sort-imports': 'off',
  //   'simple-import-sort/sort': 'error',
  // },
  rules,
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: rulesJsOnly,
    },
  ],
};
