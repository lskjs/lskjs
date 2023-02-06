/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import parse from 'csv-parse';
import dot from 'dot-object';

import { getSpreadsheetRaw } from './getSpreadsheetRaw';

export async function getSpreadsheetJson(
  url,
  { columns = true, nested = false, type = 'objects', mapper = (a) => a, ...params } = {},
) {
  const spreadsheet = await getSpreadsheetRaw(url);
  return new Promise((resolve, reject) => {
    parse(spreadsheet, { columns, ...params }, (err, res) => {
      if (err) return reject(err);
      if (nested) {
        res = res.map((item) => dot.object(item));
      }
      res = res.map((item) => mapper(item));
      if (type === 'object') {
        // eslint-disable-next-line prefer-destructuring
        res = res[0];
      }
      return resolve(res);
    });
  });
}

export default getSpreadsheetJson;
