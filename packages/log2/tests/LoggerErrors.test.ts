/* global test expect */
import Err from '@lskjs/err';

import Logger from './Logger';

process.env.LOG_FORMAT = 'bunyan';

describe('Logger errors', () => {
  const log = new Logger();
  test("log.error(new Error('test'))", () => {
    log.lastLogger = null;
    log.error(new Error('test'));
    expect(log.lastLogger).toMatchObject([
      {
        level: 'error',
        content: new Error('test'),
      },
    ]);
  });
  test("log.error(new Err('testCode'))", () => {
    log.lastLogger = null;
    log.error(new Err('testCode'));
    expect(log.lastLogger).toMatchObject([
      {
        level: 'error',
        content: [1, '2', 3.3],
      },
    ]);
  });
});
