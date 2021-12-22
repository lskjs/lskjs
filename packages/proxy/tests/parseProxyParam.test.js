/* global test expect describe */

import { parseProxyParam } from '../src/utils/parseProxyParam';

const tests = [
  [
    'Proxy is null',
    {
      proxy: null,
      callback: (response) => {
        expect(response).toStrictEqual({
          disabled: true,
        });
      },
    },
  ],
  [
    'Proxy is undefined',
    {
      callback: (response) => {
        expect(response).toStrictEqual({
          disabled: true,
        });
      },
    },
  ],
  [
    'Proxy hub 1',
    {
      proxy: 'http://proxy.lskjs.ru/proxy.txt',
      callback: (response) => {
        expect(response).toStrictEqual({
          client: {
            baseURL: 'http://proxy.lskjs.ru/proxy.txt',
            options: {},
          },
        });
      },
    },
  ],
  [
    'Proxy hub 2',
    {
      proxy: 'https://proxy.lskjs.ru/some.txt',
      callback: (response) => {
        expect(response).toStrictEqual({
          client: {
            baseURL: 'https://proxy.lskjs.ru/some.txt',
            options: {},
          },
        });
      },
    },
  ],
  [
    'Proxy hub 3',
    {
      proxy: 'http://proxy.lskjs.ru/some.txt',
      callback: (response) => {
        expect(response).toStrictEqual({
          client: {
            baseURL: 'http://proxy.lskjs.ru/some.txt',
            options: {},
          },
        });
      },
    },
  ],
  [
    'Proxy hub 4',
    {
      proxy: 'http://proxy.lskjs.ru/some.json',
      callback: (response) => {
        expect(response).toStrictEqual({
          client: {
            baseURL: 'http://proxy.lskjs.ru/some.json',
            options: {},
          },
        });
      },
    },
  ],
  [
    'Proxy hub 5',
    {
      proxy: 'http://proxy.lskjs.ru/proxies',
      callback: (response) => {
        expect(response).toStrictEqual({
          client: {
            baseURL: 'http://proxy.lskjs.ru/proxies',
            options: {},
          },
        });
      },
    },
  ],
  [
    'Proxy hub 6',
    {
      proxy: 'http://lskjs:pass@proxy.lskjs.ru/proxtList',
      callback: (response) => {
        expect(response).toStrictEqual({
          client: {
            baseURL: 'http://lskjs:pass@proxy.lskjs.ru/proxtList',
            options: {},
          },
        });
      },
    },
  ],
  [
    'Proxy hub 7',
    {
      proxy: 'proxy.lskjs.ru/some.json',
      callback: (response) => {
        expect(response).toStrictEqual({
          client: {
            baseURL: 'http://proxy.lskjs.ru/some.json',
            options: {},
          },
        });
      },
    },
  ],
  [
    'Proxy proxy 1',
    {
      proxy: 'ftp://proxy.lskjs.ru/some.json',
      callback: (response) => {
        expect(response).toMatchObject({
          proxies: [
            {
              host: 'proxy.lskjs.ru',
              key: 'proxy_lskjs_ru',
              port: '',
              provider: 'env',
              stats: {},
              type: 'ftp',
              uri: 'ftp://proxy.lskjs.ru',
            },
          ],
        });
      },
    },
  ],
  [
    'Proxy file 1',
    {
      proxy: './tests/proxy.txt',
      callback: (response) => {
        expect(response).toMatchObject({
          proxies: 'lskjs:pass@lskjs.ru:1234',
        });
      },
    },
  ],
  [
    'Proxy file 2',
    {
      proxy: './tests/some.txt',
      callback: (response) => {
        expect(response).toMatchObject({
          proxies: 'lskjs:pass@lskjs.ru:1234,lskjs:pass@lskjs.ru:15675',
        });
      },
    },
  ],
  [
    'Proxy random chars 1',
    {
      proxy: 'jdgfhsgdfhgvsdhg',
      callback: (response) => {
        // error
      },
    },
  ],
  [
    'Proxy random chars 2',
    {
      proxy: 'google.com',
      callback: (response) => {
        // error
      },
    },
  ],
  [
    'Proxy random chars 3',
    {
      proxy: 'blablabla-test/',
      callback: (response) => {
        // error
      },
    },
  ],
];

describe('parseProxyParam', () => {
  test.each(tests)(
    '[parseProxyParam]: %s',
    async (name, { proxy, callback }) => {
      const response = parseProxyParam(proxy);
      callback(response);
    },
    10000,
  );
});
