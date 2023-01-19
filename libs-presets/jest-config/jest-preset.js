module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  setupFilesAfterEnv: [`${__dirname}/jest.setup.js`],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        isolatedModules: true,
      },
    ],
  },

  coverageDirectory: '.reports/coverage',
  coverageThreshold: {
    global: {
      _statements: 100,
      statements: 50,
    },
  },
  coverageReporters: ['html', 'text', 'text-summary', 'cobertura'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '.reports',
        outputName: 'asdasd.xml',
      },
    ],
  ],
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
