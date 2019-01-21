// require('babel-core/register');
// require('@babel/register');

module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  globals: {
    __SERVER__: true,
    __CLIENT__: true,
    __STAGE__: true,
    __DEV__: true,
    document: true,
    FormData: true,
    window: true,
    navigator: true,
    screen: true,
    If: true,
    DEV: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  rules: {
    'no-console': 1,
    'arrow-body-style': 0,
    'func-names': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'global-require': 0, // 1
    'guard-for-in': 0,
    'no-restricted-syntax': [2, 'WithStatement'],
    'no-use-before-define': [2, {
      functions: false,
      classes: true,
    }],
    'no-throw-literal': 0,
    'new-cap': 0,
    'one-var': 0,
    'one-var-declaration-per-line': 0,
    'max-len': [2, 120],
    'import/no-extraneous-dependencies': 0,
    'import/no-webpack-loader-syntax': 0,
    'react/prop-types': 1,
    'react/forbid-prop-types': 0,
    'react/react-in-jsx-scope': 1,
    'react/jsx-first-prop-new-line': 1,
    'react/prefer-stateless-function': 0,
    // isuvorov
    'class-methods-use-this': 0,
    'prefer-rest-params': 0,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: require('./build/webpack.config'),
        // config: require('./tools/webpack.config'),
        'config-index': 0,
      },
    },
  },
};
