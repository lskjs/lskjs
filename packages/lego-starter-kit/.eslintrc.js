var path = require('path');
const __DEV__ = true;
const user = process.env.USER;

const warn = user === 'isuvorov' ? 'off' : 'warn';
const визуальнаяХуйня = [
  'jsx-a11y/no-static-element-interactions',
  'jsx-a11y/click-events-have-key-events',
  'jsx-a11y/anchor-is-valid',
  'jsx-a11y/label-has-for',
  'jsx-a11y/accessible-emoji',
  'react/jsx-no-target-blank',
  // 'max-len',
  'import/no-unresolved',
  'import/extensions',
]

const res =  {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true
  },
  extends: ['eslint:recommended', 'airbnb'],
  plugins: ['import'],
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true
    }
  },
  globals: {
    __SERVER__: true,
    __CLIENT__: true,
    __PROD__: true,
    __DEV__: true,

    __INSTANCE: true,
    __STAGE: true,
    __VERSION: true,
    __MASTER: true,

    document: true,
    FormData: true,
    window: true,
    screen: true,
    If: true,
    DEV: true
  },
  rules: {
    // Lego-Starter-Kit
    'object-curly-newline': 'off',
    'no-console': 'error',
    // 'no-console': __DEV__ ? 'off' : 'error',
    'arrow-body-style': 'off',
    'func-names': 'off',
    'no-param-reassign': 'off', // ??
    'no-underscore-dangle': 'off',
    'global-require': 'off', // 1
    'guard-for-in': 'off',
    'no-restricted-syntax': ['error', 'WithStatement'],
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
      },
    ],
    'no-throw-literal': 'off',
    'new-cap': 'off',
    'one-var': 'off',
    'one-var-declaration-per-line': 'off',
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
      }
    ],
    'import/no-webpack-loader-syntax': 'off',
    'react/prop-types': warn,
    'react/forbid-prop-types': 'off',
    'react/react-in-jsx-scope': warn,
    'react/jsx-first-prop-new-line': warn,
    'react/prefer-stateless-function': 'off',
    'react/jsx-no-undef': [
      warn,
      {
        allowGlobals: warn,
      },
    ],
    // @andruxa
    // @natavts
    'function-paren-newline': ['error', 'consistent'],
    // @isuvorov
    'no-else-return': 'off',
    'class-methods-use-this': 'off',
    'prefer-rest-params': 'off',
    'no-unused-expressions': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-mixed-operators': 'off',
    'react/jsx-filename-extension': [warn, { extensions: ['.js', '.jsx'] }],
    'prefer-destructuring': ['error', { object: true, array: false }],
    'import/no-extraneous-dependencies': 'off',
    'react/default-props-match-prop-types': warn,
    'jsx-a11y/alt-text': warn,
    // yukioru
    "jsx-a11y/label-has-for": 'off', // Обязательный htmlFor для label https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md
    // 'no-plusplus': 'off',
    // давайте не использовать, где можно, есть += 1; если очень нужно использовать (для циклов прописал)
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-continue': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['~', path.resolve('./src/')],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json']
      },
    }
  }
}
if (user === 'isuvorov') {
  визуальнаяХуйня.forEach(x => {
    res.rules[x] = 'off';
  })
}
module.exports = res;
