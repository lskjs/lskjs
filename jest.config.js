module.exports = {
  verbose: true,
  testURL: 'http://localhost:3000',
  transform: {
    '^.+\\.jsx?$': '<rootDir>/babel-jest.config.js',
  },
  globals: {
    __DEV__: false,
  },
};
