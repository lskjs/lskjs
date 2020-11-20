module.exports = {
  verbose: true,
  testURL: 'http://localhost:3000',
  transform: {
    '^.+\\.jsx?$|^.+\\.tsx?$': '<rootDir>/babel-jest.config.js',
  },
  globals: {
    __DEV__: false,
  },
  collectCoverageFrom: ['packages/**/src/*.js'],
};