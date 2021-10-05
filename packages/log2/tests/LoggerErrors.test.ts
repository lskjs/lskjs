/* global test expect */
import Err from '@lskjs/err';

import Logger from './Logger';

process.env.LOG_FORMAT = 'logrus';
process.env.LOG_DATA = '1';

describe('Logger errors', () => {
  const log = new Logger();
  test("log.error(new Error('test'))", () => {
    log.lastLoggerArgs = null;
    const err = new Error('test');
    log.error(err);
    const res = JSON.parse(log.lastLoggerArgs[0]);
    expect(res).toMatchObject({
      level: 'error',
      data: [err],
    });
  });
  // test("log.error(new Err('testCode'))", () => {
  //   log.lastLoggerArgs = null;
  //   const err = new Err('testCode');
  //   log.error(err);
  //   const res = JSON.parse(log.lastLoggerArgs[0]);
  //   expect(res).toMatchObject({
  //     level: 'error',
  //     data: [err],
  //   });
  // });
});
