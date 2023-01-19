module.exports = {
  extends: ['./js', 'plugin:react/recommended'],
  rules: {
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
  },
  settings: {
    react: {
      version: '18.2',
    },
  },
};
