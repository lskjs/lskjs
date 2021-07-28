/* global test expect */
import Logger from './Logger';

describe('Logger formats', () => {
  const log = new Logger();
  test("log.info(1, '2', 3.3)", () => {
    process.env.LOG_FORMAT = 'bunyan';
    log.lastLogger = null;
    log.info(1, '2', 3.3);
    expect(typeof log.lastLogger[0].time).toStrictEqual('string');
    expect(log.lastLogger).toMatchObject([
      {
        level: 30,
        msg: '1 2 3.3',
      },
    ]);
  });
  test("log.info(1, '2', 3.3)", () => {
    process.env.LOG_FORMAT = 'json';
    log.lastLogger = null;
    log.info(1, '2', 3.3);
    expect(typeof log.lastLogger[0].time).toStrictEqual('number');
    expect(log.lastLogger).toMatchObject([
      {
        level: 'info',
        content: [1, '2', 3.3],
      },
    ]);
  });
});
