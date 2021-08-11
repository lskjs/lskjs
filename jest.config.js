module.exports = {
  verbose: true,
  testURL: 'http://localhost:3000',
  transform: {
    '^.+\\.jsx?$|^.+\\.tsx?$': '<rootDir>/babel-jest.config.js',
  },
  modulePathIgnorePatterns: ['build/*', 'release/*'],
  globals: {
    __DEV__: false,
  },
  collectCoverageFrom: ['packages/**/src/*.js'],
};
