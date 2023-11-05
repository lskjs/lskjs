const prettier = require('../prettier');
const { maxLen } = require('../config');

// TODO
// https://github.com/lydell/eslint-plugin-simple-import-sort/blob/main/examples/.eslintrc.js

module.exports = {
  env: {
    browser: false,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['simple-import-sort', 'prettier'],
  ignorePatterns: [
    '**/node_modules/**',
    '**/__*/**',
    '**/lib/**',
    '**/dist/**',
    '**/build/**',
    '**/coverage/**',
    '**/public/**',
    '!.gitlab-ci.js',
  ],
  rules: {
    'max-len': [
      'error',
      {
        code: maxLen,
        ignoreComments: true,
      },
    ],
    'class-methods-use-this': 'off',
    'global-require': 'off',
    'lines-between-class-members': 'off',
    'func-names': 'off',
    'no-underscore-dangle': 'off',
    'no-throw-literal': 'off',

    // ну мы же не такие тупые да?
    'no-plusplus': 'off',

    // увы в Nest.js пустые конструкторы это повсеместная практика
    'no-empty-function': 'off',

    // ну бред же https://github.com/airbnb/javascript/issues/1103
    'no-continue': 'off',

    'prettier/prettier': [
      'warn',
      {
        printWidth: maxLen,
        ...prettier,
      },
    ],

    // imports
    // 'import/extensions': 'off', // пока мораторий на правило, как только с ESM все окончательно решится, можно будет включать
    'import/extensions': [
      'error',
      'ignorePackages',
      { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
    ],
    'import/no-extraneous-dependencies': [
      'warn',
      {
        devDependencies: ['**/*.test.js', '**/*.spec.js', 'scripts/**'],
        // devDependencies: false,
        optionalDependencies: true, // mean: disabled
        peerDependencies: true, // mean: disabled
      },
    ],
    'import/prefer-default-export': 'off',
    'no-restricted-exports': 'off',

    // its for orders
    'import/order': 'off',
    'sort-imports': 'off',
    'simple-import-sort/imports': 'error',
  },
};
