/* eslint-disable no-undef */
// process.env.TZ = 'UTC';
jest.setTimeout(15000);
const args = process.argv.slice(2);

const isProd = !isDev || !!process.env.LSK_PROD || args.includes('--prod');
const isSilent = !!process.env.LSK_SILENT || args.includes('--silent') || isCI;

if (isProd || isSilent) {
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
