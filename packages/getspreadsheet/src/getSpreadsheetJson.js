/* eslint-disable no-console */
import getSpreadsheetRaw from '@lskjs/getspreadsheet';
import Bluebird from 'bluebird';
import parse from 'csv-parse';

const parseAsync = Bluebird.promisify(parse);

export default async (url, params = { columns: true }) => {
  const spreadsheet = await getSpreadsheetRaw(url);
  return parseAsync(spreadsheet, params);
};
