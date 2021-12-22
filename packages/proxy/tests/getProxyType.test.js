/* global test expect describe */

import { getProxyType } from '../src/utils/parseProxyParam';

const tests = [
  [
    'Proxy is null',
    {
      proxy: null,
      callback: (response) => {
        expect(response).toBe(null);
      },
    },
  ],
  [
    'Proxy is undefined',
    {
      callback: (response) => {
        expect(response).toBe(null);
      },
    },
  ],
  [
    'Proxy hub 1',
    {
      proxy: 'http://proxy.lskjs.ru/proxy.txt',
      callback: (response) => {
        expect(response).toBe('hub');
      },
    },
  ],
  [
    'Proxy hub 2',
    {
      proxy: 'https://proxy.lskjs.ru/some.txt',
      callback: (response) => {
        expect(response).toBe('hub');
      },
    },
  ],
  [
    'Proxy hub 3',
    {
      proxy: 'http://proxy.lskjs.ru/some.txt',
      callback: (response) => {
        expect(response).toBe('hub');
      },
    },
  ],
  [
    'Proxy hub 4',
    {
      proxy: 'http://proxy.lskjs.ru/some.json',
      callback: (response) => {
        expect(response).toBe('hub');
      },
    },
  ],
  [
    'Proxy hub 5',
    {
      proxy: 'http://proxy.lskjs.ru/proxies',
      callback: (response) => {
        expect(response).toBe('hub');
      },
    },
  ],
  [
    'Proxy hub 6',
    {
      proxy: 'http://lskjs:pass@proxy.lskjs.ru/proxtList',
      callback: (response) => {
        expect(response).toBe('hub');
      },
    },
  ],
  [
    'Proxy hub 7',
    {
      proxy: 'proxy.lskjs.ru/some.json',
      callback: (response) => {
        expect(response).toBe('hub');
      },
    },
  ],
  [
    'Proxy file 1',
    {
      proxy: '/home/lskjs/proxy.txt',
      callback: (response) => {
        expect(response).toBe('file');
      },
    },
  ],
  [
    'Proxy file 2',
    {
      proxy: './lskjs/proxy.txt',
      callback: (response) => {
        expect(response).toBe('file');
      },
    },
  ],
  [
    'Proxy proxy 1',
    {
      proxy: 'ftp://proxy.lskjs.ru/some.json',
      callback: (response) => {
        expect(response).toBe('proxy');
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

describe('getProxyType', () => {
  test.each(tests)(
    '[getProxyType]: %s',
    async (name, { proxy, callback }) => {
      const response = getProxyType(proxy);
      callback(response);
    },
    10000,
  );
});
