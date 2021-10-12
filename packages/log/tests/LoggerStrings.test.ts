/* global test expect */
import './_no_colors';

import { prettyFormat } from '../src/pretty/prettyFormat';
import Logger from './Logger';

describe('Logger strings', () => {
  const log = new Logger();
  // test("default(lsk) log.info(1, '2', 3.3)", () => {
  //   // process.env.LOG_FORMAT = 'bunyan'; // default bunyan
  //   process.env.LOG_DATA = '1';
  //   log.lastLoggerArgs = null;
  //   log.info(1, '2', 3.3);
  //   const res = log.lastLoggerArgs[0];
  //   expect(typeof res.time).toStrictEqual('string');
  //   expect(res).toMatchObject({
  //     level: 30,
  //     msg: '1 2 3.3',
  //   });
  // });
  test('req GET start', () => {
    const data = {
      reqId: 1,
      method: 'GET',
      host: 'localhost:8088',
      url: '/api/admin/test',
      // eslint-disable-next-line max-len
      ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36',
      ip: '::1',
    };

    expect(prettyFormat(log, data)).toMatchObject(['[d] • GET /api/admin/test       #1 ⧖…⧗']);
  });
  test('req GET', () => {
    const data = {
      time: null,
      reqId: 1,
      method: 'GET',
      host: 'localhost:8088',
      url: '/api/admin/test',
      // eslint-disable-next-line max-len
      ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36',
      ip: '::1',
      status: 500,
      length: 382,
      duration: 6020,

      code: 'ERR_123',
      message: 'errors.ERR_123',
    };

    expect(prettyFormat(log, data)).toMatchObject(['[t] • GET /api/admin/test       #1 500   6s  382b']);
  });
});
