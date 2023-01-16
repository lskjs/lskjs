/* eslint-disable max-len */
/* global test expect */
import './_no_colors';

import { prettyFormat } from '../src/pretty/prettyFormat';

describe('Logger strings', () => {
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

    expect(prettyFormat(data)).toMatchObject([
      '[t] • GET /api/admin/test       #1 ⧗⧖⧗',
    ]);
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

    expect(prettyFormat(data)).toMatchObject([
      '[d] • GET /api/admin/test       #1 500    6s 382B',
    ]);
  });
  test('req GET2', () => {
    const data = {
      time: null,
      reqId: '8kpzlhVFUzihr-gdYutvT',
      method: 'GET',
      host: 'localhost:8080',
      url: '/api/healthcheck',
      ua: 'curl/7.52.1',
      ip: '::ffff:127.0.0.1',
      status: 200,
      length: 295,
      duration: 2.988399,
    };

    expect(prettyFormat(data)).toMatchObject([
      '[d] ♦ GET /api/healthcheck     #8kpzlhVFUzihr-gdYutvT 200   3ms 295B',
    ]);
  });
  test('req GET3', () => {
    const data = {
      time: null,
      reqId: 'yEoDMODUXnCYx2piYdia9',
      method: 'GET',
      host: 'localhost:8080',
      url: '/api/healthcheck',
      ua: 'curl/7.74.0',
      ip: '::ffff:127.0.0.1',
      status: 200,
      length: 511,
      duration: 21.645674,
    };

    expect(prettyFormat(data)).toMatchObject([
      '[d] ♠ GET /api/healthcheck     #yEoDMODUXnCYx2piYdia9 200  22ms 511B',
    ]);
  });
  test('req GET4', () => {
    const data = {
      time: null,
      reqId: '2srlW-ycUSEJyQE8U8tZk',
      method: 'GET',
      host: 'lskjs.ru',
      url: '/youtube/channels/123/products/321',
      ua: 'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)',
      ip: '95.108.213.58, 10.101.3.140',
      status: 200,
      length: 115268,
      duration: 1287.031414,
    };

    expect(prettyFormat(data)).toMatchObject([
      '[d] § GET /youtube/channels/123/products/321 #2srlW-ycUSEJyQE8U8tZk 200    1s 115kB',
    ]);
  });
  test('req GET5', () => {
    const data = {
      time: null,
      reqId: 'eYdEJ-8Jb1tGtFfHkvWfV',
      method: 'GET',
      host: 'lskjs.ru',
      url: '/api/products/getRatings?type=youtube&productId=123&productType=site',
      referer: 'https://lskjs.ru/youtube/sites/123',
      ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',
      ip: '87.149.200.209, 10.101.3.140',
      status: 200,
      length: 149,
      duration: 110.732136,
    };

    expect(prettyFormat(data)).toMatchObject([
      '[d] ♂ GET /api/products/getRatings?type=youtube&productId=123&productType=site #eYdEJ-8Jb1tGtFfHkvWfV 200 111ms 149B',
    ]);
  });
  test('req GET6', () => {
    const data = {
      time: null,
      reqId: 'gJFUQ9C6-NNYM_VrU0UVq',
      method: 'GET',
      host: 'lskjs.ru',
      url: '/youtube/sites/123/videos',
      ua: 'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)',
      ip: '95.108.213.58, 10.101.3.140',
      status: 200,
      length: 155997,
      duration: 1770.663689,
    };

    expect(prettyFormat(data)).toMatchObject([
      '[d] ○ GET /youtube/sites/123/videos                                            #gJFUQ9C6-NNYM_VrU0UVq 200    2s 156kB',
    ]);
  });
});
