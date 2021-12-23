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
        expect(response).toStrictEqual({
          client: {
            baseURL: 'http://lskjs:sdjfb2634@lsk.js.io:1111/',
          },
        });
      },
    },
  ],
  [
    'Proxy txt 2',
    {
      proxy: 'lsk.js.io:1111:lskjs',
      callback: (response) => {
        expect(response).toStrictEqual({
          client: {
            baseURL: 'http://lskjs@lsk.js.io:1111/',
          },
        });
      },
    },
  ],
  [
    'Proxy txt 3',
    {
      proxy: 'lsk.js.io:1111',
      callback: (response) => {
        expect(response).toStrictEqual({
          client: {
            baseURL: 'http://lsk.js.io:1111/',
          },
        });
      },
    },
  ],
  [
    'Proxy txt 4',
    {
      proxy: 'lsk.js.io',
      callback: (response) => {
        expect(response).toStrictEqual({
          client: {
            baseURL: 'http://lsk.js.io/',
          },
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
