/* eslint-disable no-console */
import Bluebird from 'bluebird';
import parse from 'csv-parse';

import { getSpreadsheetRaw } from './getSpreadsheetRaw';

const parseAsync = Bluebird.promisify(parse);

export async function getSpreadsheetJson(url, params = { columns: true }) {
  const spreadsheet = await getSpreadsheetRaw(url);
  return parseAsync(spreadsheet, params);
}

export default getSpreadsheetJson;
