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
  modulePathIgnorePatterns: [
    '<rootDir>/lib',
    '<rootDir>/.release',
    '<rootDir>/_test',
    'node_modules',
  ],

  coverageDirectory: '.reports/coverage',
  coverageThreshold: {
    global: {
      statements: 100,
    },
  },
  coverageReporters: ['html', 'text', 'text-summary', 'cobertura'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '.reports',
        outputName: 'junit.xml',
      },
    ],
  ],
};
