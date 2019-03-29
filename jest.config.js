module.exports = {
  verbose: true,
  testURL: 'http://localhost:3000',
  transform: {
    // '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.jsx?$': '<rootDir>/jest.preprocess.js',
  },
  globals: {
    __DEV__: false,
  },
};
