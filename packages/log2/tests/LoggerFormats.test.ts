/* global test expect */
import Logger from './Logger';

describe('Logger formats', () => {
  const log = new Logger();
  test("bunyan log.info(1, '2', 3.3)", () => {
    process.env.LOG_FORMAT = 'bunyan';
    process.env.LOG_DATA = '1';
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
  test("logrus log.info(1, '2', 3.3)", () => {
    process.env.LOG_FORMAT = 'logrus';
    process.env.LOG_DATA = '1';
    log.lastLogger = null;
    log.info(1, '2', 3.3);
    expect(typeof log.lastLogger[0].time).toStrictEqual('number');
    expect(log.lastLogger).toMatchObject([
      {
        level: 'info',
        data: [1, '2', 3.3],
      },
    ]);
  });
  test("lsk log.info(1, '2', 3.3)", () => {
    process.env.LOG_FORMAT = 'lsk';
    process.env.LOG_DATA = '1';
    log.lastLogger = null;
    log.info(1, '2', 3.3);
    expect(typeof log.lastLogger[0].time).toStrictEqual('number');
    expect(log.lastLogger).toMatchObject([
      {
        level: 'info',
        data: [1, '2', 3.3],
      },
    ]);
  });
});
