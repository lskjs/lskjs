const config = require('./strict/jest-preset');

module.exports = {
  ...config,
  coverageThreshold: {
    ...config.coverageThreshold,
    global: {
      ...config.coverageThreshold.global,
      statements: 50,
    },
  },
};

//
// "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
// "test:e2e": "jest --config ./test/jest-e2e.json",

// nest

// "jest": {
//   "moduleFileExtensions": [
//     "js",
//     "json",
//     "ts"
//   ],
//   "rootDir": "src",
//   "testRegex": ".*\\.spec\\.ts$",
//   "transform": {
//     ".+\\.(t|j)s$": "ts-jest"
//   },
//   "collectCoverageFrom": [
//     "**/*.(t|j)s"
//   ],
//   "coverageDirectory": "../coverage",
//   "testEnvironment": "node"
// }

// nest 2

// {
//   "moduleFileExtensions": ["js", "json", "ts"],
//   "rootDir": ".",
//   "testEnvironment": "node",
//   "testRegex": ".e2e-spec.ts$",
//   "transform": {
//     "^.+\\.(t|j)s$": "ts-jest"
//   }
// }
