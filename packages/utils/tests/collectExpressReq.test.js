/* global test expect */
import collectExpressReq from '../src/collectExpressReq';

test('check 0', () => {
  const req = {
    protocol: 'https',
    get() {
      return 'lskjs.ru:1234';
    },
    originalUrl: '/hello/world?asd=123',
    query: {
      asd: 123,
    },
    ip: '127.0.0.7',
    xhr: true,
    cookies: 'COOKIE=true',
  };

  expect(collectExpressReq(req)).toStrictEqual({
    protocol: 'https',
    href: 'https://lskjs.ru:1234/hello/world?asd=123',
    hash: null,
    path: '/hello/world',
    pathname: '/hello/world',
    hostname: 'lskjs.ru',
    search: '?asd=123',
    query: {
      asd: 123,
    },
    ip: '127.0.0.7',
    port: 1234,
    xhr: true,
    cookies: 'COOKIE=true',
  });
});
