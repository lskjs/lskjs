/* eslint-disable no-console */
import parse from 'csv-parse';
import Bluebird from 'bluebird';
import getSpreadsheetRaw from '@lskjs/getspreadsheet';

const parseAsync = Bluebird.promisify(parse);

export default async (url, params = { columns: true }) => {
  const spreadsheet = await getSpreadsheetRaw(url);
  return parseAsync(spreadsheet, params);
};
