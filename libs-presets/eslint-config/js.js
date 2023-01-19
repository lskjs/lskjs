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
    'no-plusplus': 'off',

    'prettier/prettier': ['warn', { singleQuote: true }],

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
    'import/prefer-default-export': 'off',
    'no-restricted-exports': 'off',

    // its for orders
    'import/order': 'off',
    'sort-imports': 'off',
    'simple-import-sort/imports': 'error',
  },
};
