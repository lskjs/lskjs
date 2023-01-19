const preset = () => ({
  presets: [
    require('@babel/preset-env'),
    require('@babel/preset-react'),
    require('@babel/preset-typescript'),
  ],
  plugins: [
    [require('@babel/plugin-proposal-decorators'), { legacy: true }],
    [require('@babel/plugin-proposal-class-properties'), { loose: true }],
    [require('@babel/plugin-proposal-private-methods'), { loose: true }],
    [
      require('@babel/plugin-proposal-private-property-in-object'),
      { loose: true },
    ],
    require('@babel/plugin-syntax-dynamic-import'),
    require('@babel/plugin-proposal-function-bind'),
    require('@babel/plugin-proposal-export-namespace-from'),
    require('@babel/plugin-transform-modules-commonjs'),
    require('@babel/plugin-transform-runtime'),
    [
      require('@emotion/babel-plugin'),
      {
        sourceMap: true,
        autoLabel: 'dev-only',
        labelFormat: '[filename]--[local]',
        cssPropOptimization: true,
      },
    ],
  ],
});

module.exports = preset;
