#!/usr/bin/env node
import { getComment, jsonToFile } from '@lskjs/stringify';

import getSpreadsheetJson from './getSpreadsheetJson';
import getSpreadsheetRaw from './getSpreadsheetRaw';
import { log } from './log';

export type Options = {
  out?: string;
  format?: 'csv' | 'json' | 'js' | 'yml';
  type?: 'array' | 'objects' | 'object';
  mapper?: (any) => any;
  nested?: boolean;
};

export async function downloadAndSave(
  url,
  { out, format = 'csv', nested, type = 'objects', mapper = (a) => a }: Options = {},
) {
  if (url.indexOf('#') === -1) {
    // eslint-disable-next-line no-param-reassign
    url += '#gid=0';
  }
  if (!out) {
    // eslint-disable-next-line no-param-reassign
    out = `spreadsheet.${format}`;
  }
  const filename = (out[0] !== '~' && out[0] !== '/' ? `${process.cwd()}/` : '') + out;
  // log.trace('options', url, out, filename, format);
  let res;
  const columns = type === 'objects' || type === 'object';
  if (format === 'csv') {
    res = await getSpreadsheetRaw(url);
  } else {
    res = await getSpreadsheetJson(url, { columns: Boolean(+columns), type, nested, mapper });
  }
  await jsonToFile(filename, res, {
    type: format,
    comment: getComment({
      name: out,
      url,
    }),
  });
  log.debug('[save]', url, out);
}

export default downloadAndSave;
