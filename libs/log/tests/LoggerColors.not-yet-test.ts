/* global test expect */
import Logger from './Logger';

describe('Logger colors', () => {
  test("lsk log.info(1, '2', 3.3)", () => {
    const log = new Logger({
      ns: '1:2:3',
      name: '4',
    });
    log.info('test', 'me');
    const res = log.lastLoggerArgs[0];
    console.log({res})
    expect(typeof res.time).toStrictEqual('number');
    expect(res).toMatchObject({
      level: 'info',
      msg: '123',
    });
  });
});
