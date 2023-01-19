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
