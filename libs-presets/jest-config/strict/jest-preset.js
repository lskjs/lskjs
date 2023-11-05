const omitNull = (obj) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] != null) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

const tsconfig = process.env.JEST_TSCONFIG;

module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  setupFilesAfterEnv: [`${__dirname}/jest.setup.js`],
  transform: {
    '^.+\\.(t|j)sx?$': [
      'ts-jest',
      omitNull({
        useESM: true,
        isolatedModules: true,
        tsconfig,
      }),
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
