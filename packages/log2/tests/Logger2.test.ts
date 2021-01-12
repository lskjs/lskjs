/* global test expect */
import BaseLogger from '../src/Logger';

class Logger extends BaseLogger {
  lastLog: any[] | null;
  __log(...args: any[]): void {
    this.lastLog = args;
    super.__log(...args);
  }
  lastLogger: any[] | null;
  __logger(...args: any[]): void {
    this.lastLogger = args;
  }
}

// const logger = new Logger({
//   name: 'lsk:Module',
// });

// logger.fatal('some fatal');
// logger.error('some error');
// logger.warn('some warn');
// logger.debug('some debug');
// logger.info('some info');
// logger.trace('some trace');

// new Logger({ name: 'lsk:SomeModule' }).error('some error');
// new Logger({ name: 'lsk:AnotherModule' }).warn('some another module warn');
// new Logger({ name: 'lsk:GrantModule' }).info('some module info');

describe("Logger formats", () => {
  const log = new Logger();
  test("log.info(1, '2', 3.3)", () => {
    log.lastLog = null;
    log.info(1, '2', 3.3)
    expect(log.lastLog).toStrictEqual(['info', 1, '2', 3.3]);
  });
})

describe("new Logger()", () => {
  const log = new Logger();
  test("log.log(123)", () => {
    log.lastLog = null;
    log.log(123)
    expect(log.lastLog).toStrictEqual(['log', 123]);
  });
  test("log.trace(123)", () => {
    log.lastLog = null;
    log.trace(123)
    expect(log.lastLog).toStrictEqual(['trace', 123]);
  });
  test("log.info(123)", () => {
    log.lastLog = null;
    log.info(123)
    expect(log.lastLog).toStrictEqual(['info', 123]);
  });
  test("log.debug(123)", () => {
    log.lastLog = null;
    log.debug(123)
    expect(log.lastLog).toStrictEqual(['debug', 123]);
  });
  test("log.warn(123)", () => {
    log.lastLog = null;
    log.warn(123)
    expect(log.lastLog).toStrictEqual(['warn', 123]);
  });
  test("log.error(123)", () => {
    log.lastLog = null;
    log.error(123)
    expect(log.lastLog).toStrictEqual(['error', 123]);
  });
  test("log.fatal(123)", () => {
    log.lastLog = null;
    log.fatal(123)
    expect(log.lastLog).toStrictEqual(['fatal', 123]);
  });
});

describe("new Logger({ level: 'warn' })", () => {
  const log = new Logger({ level: 'warn' });
  test("log.canLog('log')", () => {
    expect(log.canLog('log')).toStrictEqual(true);
  });
  test("log.log(123)", () => {
    log.lastLog = null;
    log.log(123)
    expect(log.lastLog).toStrictEqual(['log', 123]);
  });
  test("log.canLog('trace')", () => {
    expect(log.canLog('trace')).toStrictEqual(false);
  });
  test("log.trace(123)", () => {
    log.lastLog = null;
    log.trace(123)
    expect(log.lastLog).toStrictEqual(null);
  });
  test("log.canLog('info')", () => {
    expect(log.canLog('info')).toStrictEqual(false);
  });
  test("log.info(123)", () => {
    log.lastLog = null;
    log.info(123)
    expect(log.lastLog).toStrictEqual(null);
  });
  test("log.canLog('debug')", () => {
    expect(log.canLog('debug')).toStrictEqual(false);
  });
  test("log.debug(123)", () => {
    log.lastLog = null;
    log.debug(123)
    expect(log.lastLog).toStrictEqual(null);
  });
  test("log.canLog('warn')", () => {
    expect(log.canLog('warn')).toStrictEqual(true);
  });
  test("log.warn(123)", () => {
    log.lastLog = null;
    log.warn(123)
    expect(log.lastLog).toStrictEqual(['warn', 123]);
  });
  test("log.canLog('error')", () => {
    expect(log.canLog('error')).toStrictEqual(true);
  });
  test("log.error(123)", () => {
    log.lastLog = null;
    log.error(123)
    expect(log.lastLog).toStrictEqual(['error', 123]);
  });
  test("log.canLog('fatal')", () => {
    expect(log.canLog('fatal')).toStrictEqual(true);
  });
  test("log.fatal(123)", () => {
    log.lastLog = null;
    log.fatal(123)
    expect(log.lastLog).toStrictEqual(['fatal', 123]);
  });
});


// ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', ]

// var extras = [];
// var details = [];
// var colors2 = colors;
// var colorStr = rec.color || rec.req_id || rec.reqId;

// var colorCode = hashCode(rec.color || rec.req_id || rec.reqId);
// var color =  colorCode === 0 ? null : colorsKeys[colorCode % Object.keys(colorsKeys).length];
// var createMarker = getMarker(rec.color || rec.req_id || rec.reqId);

// var marker = createMarker();

// var getMarker = require('@lskjs/utils/marker').default;
