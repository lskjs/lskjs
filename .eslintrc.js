var path = require('path');
const user = process.env.USER;
// const error = user === 'isuvorov' ? 'off' : 'error';
const error = 'error';
const warn = user === 'isuvorov' ? 'off' : 'warn';

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

  'react/state-in-constructor': 'off', // ну нахера?
  'react/jsx-props-no-spreading': 'off', // задолбаемся
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
  '@typescript-eslint/no-explicit-any': warn, // вырубаю на переходный период, задолбаемся
  // 'react/button-has-type': error,
  // "object-curly-newline": "off" // очень странное правило, почитать почему
};

const res = {
  parser: 'babel-eslint',
  // parser: '@typescript-eslint/parser',
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
    //  https://github.com/typescript-eslint/typescript-eslint/issues/109#issuecomment-536160947
    {
      files: ['**/*.ts', '**/*.tsx'],
      env: { browser: true, es6: true, node: true },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'eslint:recommended',
        'airbnb',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
        // "eslint:recommended",
        //   "plugin:react/recommended",
        //   "plugin:@typescript-eslint/eslint-recommended",
        //   "plugin:@typescript-eslint/recommended"
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2018,
        sourceType: 'module',
        // project: "./tsconfig.json"
        project: './packages/**/tsconfig.json',
      },
      plugins: ['import', '@typescript-eslint'],
      rules,
      // plugins: ["react", "@typescript-eslint"],
      // rules: {
      //   indent: ["error", 2, { SwitchCase: 1 }],
      //   "linebreak-style": ["error", "unix"],
      //   quotes: ["error", "single"],
      //   "comma-dangle": ["error", "always-multiline"],
      //   "@typescript-eslint/no-explicit-any": 0
      // },
      // settings: { react: { version: "detect" } }
    },
  ],
  globals: {
    __SERVER__: true,
    __CLIENT__: true,
    __DEV__: true,
  },
  rules,
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': [
        {
          rootPathPrefix: '~',
          rootPathSuffix: './src',
        },
      ],
    },
  },
};

module.exports = res;
