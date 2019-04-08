module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/typescript'
    // '@babel/preset-stage-0',
  ],
  plugins: [
    'transform-class-property-arrow-to-bind',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-syntax-dynamic-import',
    // '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-function-bind',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-transform-runtime',
    ["babel-plugin-root-import", {
      "rootPathPrefix": "~",
      "rootPathSuffix": "src"
    }],
    'emotion',
  ],
  env: {
    production: {
      presets: ['minify'],
    },
  },
};

// https://github.com/trayio/babel-plugin-webpack-alias
// https://github.com/babel/minify/tree/master/packages/babel-plugin-transform-remove-console