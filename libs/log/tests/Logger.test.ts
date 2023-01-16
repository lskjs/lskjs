/* global test expect */
import Logger from './Logger';

process.env.LOG_FORMAT = 'none';
process.env.LOG_LEVEL = 'trace';

describe('new Logger()', () => {
  const log = new Logger();
  test('log.trace(123)', () => {
    log.lastLogArgs = null;
    log.trace(123);
    expect(log.lastLogArgs).toStrictEqual(['trace', 123]);
  });
  test('log.info(123)', () => {
    log.lastLogArgs = null;
    log.info(123);
    expect(log.lastLogArgs).toStrictEqual(['info', 123]);
  });
  test('log.debug(123)', () => {
    log.lastLogArgs = null;
    log.debug(123);
    expect(log.lastLogArgs).toStrictEqual(['debug', 123]);
  });
  test('log.warn(123)', () => {
    log.lastLogArgs = null;
    log.warn(123);
    expect(log.lastLogArgs).toStrictEqual(['warn', 123]);
  });
  test('log.error(123)', () => {
    log.lastLogArgs = null;
    log.error(123);
    expect(log.lastLogArgs).toStrictEqual(['error', 123]);
  });
  test('log.fatal(123)', () => {
    log.lastLogArgs = null;
    log.fatal(123);
    expect(log.lastLogArgs).toStrictEqual(['fatal', 123]);
  });
});

describe("new Logger({ level: 'warn' })", () => {
  const log = new Logger({ level: 'warn' });
  test("log.canLog('log')", () => {
    expect(log.canLog('log')).toStrictEqual(true);
  });
  test("log.canLog('trace')", () => {
    expect(log.canLog('trace')).toStrictEqual(false);
  });
  test('log.trace(123)', () => {
    log.lastLogArgs = null;
    log.trace(123);
    expect(log.lastLogArgs).toStrictEqual(null);
  });
  test("log.canLog('info')", () => {
    expect(log.canLog('info')).toStrictEqual(false);
  });
  test('log.info(123)', () => {
    log.lastLogArgs = null;
    log.info(123);
    expect(log.lastLogArgs).toStrictEqual(null);
  });
  test("log.canLog('debug')", () => {
    expect(log.canLog('debug')).toStrictEqual(false);
  });
  test('log.debug(123)', () => {
    log.lastLogArgs = null;
    log.debug(123);
    expect(log.lastLogArgs).toStrictEqual(null);
  });
  test("log.canLog('warn')", () => {
    expect(log.canLog('warn')).toStrictEqual(true);
  });
  test('log.warn(123)', () => {
    log.lastLogArgs = null;
    log.warn(123);
    expect(log.lastLogArgs).toStrictEqual(['warn', 123]);
  });
  test("log.canLog('error')", () => {
    expect(log.canLog('error')).toStrictEqual(true);
  });
  test('log.error(123)', () => {
    log.lastLogArgs = null;
    log.error(123);
    expect(log.lastLogArgs).toStrictEqual(['error', 123]);
  });
  test("log.canLog('fatal')", () => {
    expect(log.canLog('fatal')).toStrictEqual(true);
  });
  test('log.fatal(123)', () => {
    log.lastLogArgs = null;
    log.fatal(123);
    expect(log.lastLogArgs).toStrictEqual(['fatal', 123]);
  });
});
