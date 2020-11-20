/* eslint-disable */
var path = require('path');
const user = process.env.USER;
const error = user === 'isuvorov2' ? 'off' : 'error';
const warn = user === 'isuvorov2' ? 'off' : 'warn';

const rules = {
  'max-len': [
    'error',
    {
      code: 120,
      ignoreComments: true,
    },
  ],
  'class-methods-use-this': 'off',
  'global-require': 'off',
  'lines-between-class-members': 'off',
  'func-names': 'off',
  'no-underscore-dangle': 'off',
  'no-throw-literal': 'off',
  //
  'react/prop-types': error,
  'react/forbid-prop-types': error,

  'react/state-in-constructor': 'off',
  'react/jsx-props-no-spreading': 'off',
  'react/jsx-filename-extension': [
    1,
    {
      extensions: ['.jsx', '.tsx'],
    },
  ],
  'import/extensions': [
    'error',
    'ignorePackages',
    {
      js: 'never',
      mjs: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    },
  ],
  'import/no-extraneous-dependencies': [
    'error',
    { devDependencies: false, optionalDependencies: true, peerDependencies: true },
  ],
  '@typescript-eslint/no-explicit-any': warn,
};

const res = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'airbnb', 'plugin:prettier/recommended'],
  plugins: ['import'],
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      env: { browser: true, es6: true, node: true },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'eslint:recommended',
        'airbnb',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './packages/**/tsconfig.json',
      },
      plugins: ['import', '@typescript-eslint'],
      rules,
    },
  ],
  globals: {
    __SERVER__: true,
    __CLIENT__: true,
    __DEV__: true,
    __STAGE__: true,
  },
  rules,
  settings: {
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, 'src')],
      },
    },
  },
};

module.exports = res;
