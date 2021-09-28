/* global test expect */
import Err from '@lskjs/err';

import Logger from './Logger';

process.env.LOG_FORMAT = 'bunyan';
process.env.LOG_DATA = '1';
process.env.NO_COLOR = '1';

describe('Logger errors', () => {
  const log = new Logger();
  test("log.error(new Error('test'))", () => {
    log.lastLoggerArgs = null;
    const err = new Error('test');
    log.error(err);
    expect(log.lastLoggerArgs).toMatchObject([
      {
        level: 'error',
        data: [err],
      },
    ]);
  });
  test("log.error(new Err('testCode'))", () => {
    log.lastLoggerArgs = null;
    const err = new Err('testCode');
    log.error(err);
    expect(log.lastLoggerArgs).toMatchObject([
      {
        level: 'error',
        content: [err],
      },
    ]);
  });
});
