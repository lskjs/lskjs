/* global test expect */
import { downloadAndSave } from '../src';

const testUrl =
  'https://docs.google.com/spreadsheets/d/1yqEtc7VfCZRv4I3iqSiKSq9CkSDCU3fIKa-ZayyW_ys/edit#gid=0';

let i = 0;

describe('downloadAndSave', () => {
  test('type=array format=json', async () => {
    const filename = `${__dirname}/spreadsheet-${++i}.json`;
    await downloadAndSave(testUrl, { out: filename, type: 'array', format: 'json' });
    // eslint-disable-next-line import/no-dynamic-require
    const res = require(filename);
    expect(res.slice(0, 3)).toEqual([
      ['a', 'b', 'c.d'],
      ['1', '2', '3'],
      ['4', '5', '6'],
    ]);
  });
  test('type=array format=js', async () => {
    const filename = `${__dirname}/spreadsheet-${++i}.js`;
    await downloadAndSave(testUrl, { out: filename, type: 'array', format: 'js' });
    // eslint-disable-next-line import/no-dynamic-require
    const res = require(filename);
    expect(res.slice(0, 3)).toEqual([
      ['a', 'b', 'c.d'],
      ['1', '2', '3'],
      ['4', '5', '6'],
    ]);
  });
  test('type=objects format=json', async () => {
    const filename = `${__dirname}/spreadsheet-${++i}.json`;
    await downloadAndSave(testUrl, { out: filename, type: 'objects', format: 'json' });
    // eslint-disable-next-line import/no-dynamic-require
    const res = require(filename);
    expect(res.slice(0, 2)).toEqual([
      {
        a: '1',
        b: '2',
        'c.d': '3',
      },
      {
        a: '4',
        b: '5',
        'c.d': '6',
      },
    ]);
  });
  test('type=objects format=json nested', async () => {
    const filename = `${__dirname}/spreadsheet-${++i}.json`;
    await downloadAndSave(testUrl, {
      out: filename,
      type: 'objects',
      format: 'json',
      nested: true,
    });
    // eslint-disable-next-line import/no-dynamic-require
    const res = require(filename);
    expect(res.slice(0, 2)).toEqual([
      {
        a: '1',
        b: '2',
        c: {
          d: '3',
        },
      },
      {
        a: '4',
        b: '5',
        c: {
          d: '6',
        },
      },
    ]);
  });
  test('type=object format=json nested', async () => {
    const filename = `${__dirname}/spreadsheet-${++i}.json`;
    await downloadAndSave(testUrl, {
      out: filename,
      type: 'object',
      format: 'json',
      nested: true,
    });
    // eslint-disable-next-line import/no-dynamic-require
    const { __comment, ...res } = require(filename);
    expect(res).toEqual({
      a: '1',
      b: '2',
      c: {
        d: '3',
      },
    });
  });
});
