/* eslint-disable no-undef */
process.env.TZ = 'UTC';
jest.setTimeout(15000);
if (process.argv.includes('--silent') || process.argv.includes('--prod')) {
  global.console = {
    ...console,
    // uncomment to ignore a specific log level
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };
}
