const jsRules = {
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

  // imports
  'import/extensions': [
    'error',
    'ignorePackages',
    { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
  ],
  'import/no-extraneous-dependencies': [
    'error',
    {
      devDependencies: false,
      optionalDependencies: true,
      peerDependencies: true,
    },
  ],
  // its for orders
  'import/order': 'off',
  'sort-imports': 'off',
  'simple-import-sort/imports': 'error',
};
const jsConfig = {
  env: {
    browser: false,
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:simple-import-sort',
    'plugin:prettier',
  ],
  rules: jsRules,
};

const reactRules = {
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
};
const reactConfig = {
  ...jsConfig,
  extends: [...jsConfig.extends, 'plugin:react/recommended'],
  rules: {
    ...jsConfig.rules,
    ...reactRules,
  },
};

const tsRules = {
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

const tsConfig = {
  ...reactConfig,
  extends: [
    ...reactConfig.extends,
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      typescript: {
        // always try to resolve types under `<root>@types` directory even it doesn't contain any source code,
        // like `@types/unist`
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    ...jsRules,
    ...reactRules,
    ...tsRules,
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
  configs: {
    js: {
      rules: jsRules,
    },
  },
};

module.exports = {
  // ...jsConfig,
  configs: {
    js: jsConfig,
    react: reactConfig,
    ts: tsConfig,
  },
};

// TODO: разобрать
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
