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
    'Proxy list 1',
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
    'Proxy list 2',
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
    'Proxy list 3',
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
    'Proxy list 4',
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
    'Proxy list 5',
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
    'Proxy list 6',
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
    'Proxy list 7',
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
    'Proxy list 8',
    {
      proxy: 'ftp://proxy.lskjs.ru/some.json',
      callback: (response) => {
        expect(response).toStrictEqual({
          client: {
            baseURL: 'ftp://proxy.lskjs.ru/some.json',
            options: {},
          },
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
    'Proxy txt 1',
    {
      proxy: 'lsk.js.io:1111:lskjs:sdjfb2634',
      callback: (response) => {
        expect(response).toMatchObject({
          proxies: [
            {
              host: 'lsk.js.io',
              key: 'lsk_js_io_1111',
              password: 'sdjfb2634',
              port: '1111',
              provider: 'env',
              type: 'http',
              uri: 'http://lskjs:sdjfb2634@lsk.js.io:1111',
              user: 'lskjs',
            },
          ],
        });
      },
    },
  ],
  [
    'Proxy txt 2',
    {
      proxy: 'lsk.js.io:1111:lskjs:sdjfb2634?provider=smart',
      callback: (response) => {
        expect(response).toMatchObject({
          proxies: [
            {
              host: 'lsk.js.io',
              key: 'lsk_js_io_1111',
              password: 'sdjfb2634',
              port: '1111',
              provider: 'smart',
              type: 'http',
              uri: 'http://lskjs:sdjfb2634@lsk.js.io:1111',
              user: 'lskjs',
            },
          ],
        });
      },
    },
  ],
  [
    'Proxy txt 3',
    {
      proxy: 'lsk.js.io:1111:lskjs',
      callback: (response) => {
        expect(response).toMatchObject({
          proxies: [
            {
              host: 'lsk.js.io',
              key: 'lsk_js_io_1111',
              port: '1111',
              provider: 'env',
              type: 'http',
              uri: 'http://lskjs@lsk.js.io:1111',
              user: 'lskjs',
            },
          ],
        });
      },
    },
  ],
  [
    'Proxy txt 4',
    {
      proxy: 'lsk.js.io:1111:lskjs?provider=smart',
      callback: (response) => {
        expect(response).toMatchObject({
          proxies: [
            {
              host: 'lsk.js.io',
              key: 'lsk_js_io_1111',
              port: '1111',
              provider: 'smart',
              type: 'http',
              uri: 'http://lskjs@lsk.js.io:1111',
              user: 'lskjs',
            },
          ],
        });
      },
    },
  ],
  [
    'Proxy txt 5',
    {
      proxy: 'lsk.js.io:1111',
      callback: (response) => {
        expect(response).toMatchObject({
          proxies: [
            {
              host: 'lsk.js.io',
              key: 'lsk_js_io_1111',
              port: '1111',
              provider: 'env',
              type: 'http',
              uri: 'http://lsk.js.io:1111',
            },
          ],
        });
      },
    },
  ],
  [
    'Proxy txt 6',
    {
      proxy: 'lsk.js.io:1111?provider=smart',
      callback: (response) => {
        expect(response).toMatchObject({
          proxies: [
            {
              host: 'lsk.js.io',
              key: 'lsk_js_io_1111',
              port: '1111',
              provider: 'smart',
              type: 'http',
              uri: 'http://lsk.js.io:1111',
            },
          ],
        });
      },
    },
  ],
  [
    'Proxy txt 7',
    {
      proxy: 'lsk.js.io',
      callback: (response) => {
        expect(response).toMatchObject({
          proxies: [
            {
              host: 'lsk.js.io',
              key: 'lsk_js_io',
              port: '',
              provider: 'env',
              type: 'http',
              uri: 'http://lsk.js.io',
            },
          ],
        });
      },
    },
  ],
  [
    'Proxy txt 8',
    {
      proxy: 'lsk.js.io?provider=smart',
      callback: (response) => {
        expect(response).toMatchObject({
          proxies: [
            {
              host: 'lsk.js.io',
              key: 'lsk_js_io',
              port: '',
              provider: 'smart',
              type: 'http',
              uri: 'http://lsk.js.io',
            },
          ],
        });
      },
    },
  ],
  [
    'Proxy 1',
    {
      proxy: 'lskjs-uk:sjhdfhjs123@lsk.proxy.io:7000?provider=smart',
      callback: (response) => {
        expect(response).toMatchObject({
          proxies: [
            {
              host: 'lsk.proxy.io',
              key: 'lsk_proxy_io_7000',
              port: '7000',
              provider: 'smart',
              type: 'http',
              uri: 'http://lskjs-uk:sjhdfhjs123@lsk.proxy.io:7000',
            },
          ],
        });
      },
    },
  ],
  [
    'Proxy 2',
    {
      proxy: 'lsk-uk:asjfh123;;;;@proxy.lsk.com:9000?provider=smart',
      callback: (response) => {
        expect(response).toMatchObject({
          proxies: [
            {
              host: 'proxy.lsk.com',
              key: 'proxy_lsk_com_9000',
              port: '9000',
              provider: 'smart',
              type: 'http',
              uri: 'http://lsk-uk:asjfh123;;;;@proxy.lsk.com:9000',
            },
          ],
        });
      },
    },
  ],
  [
    'Proxy random chars 1',
    {
      proxy: 'jdgfhsgdfhgvsdhg',
      callback: (response) => {
        expect(response).toStrictEqual({
          disabled: true,
        });
      },
    },
  ],
  [
    'Proxy random chars 2',
    {
      proxy: 'google.com',
      callback: (response) => {
        expect(response).toStrictEqual({
          disabled: true,
        });
      },
    },
  ],
  [
    'Proxy random chars 3',
    {
      proxy: 'blablabla-test/',
      callback: (response) => {
        expect(response).toStrictEqual({
          disabled: true,
        });
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
