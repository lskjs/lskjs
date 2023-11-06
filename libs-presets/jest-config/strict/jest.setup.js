/* eslint-disable no-undef */
// process.env.TZ = 'UTC';
jest.setTimeout(15000);
const args = process.argv.slice(2);

const isSilent = !!process.env.LSK_SILENT || args.includes('--silent');

if (isSilent) {
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
