/* eslint-disable prefer-regex-literals */
/* eslint-disable no-console */
import { Err } from '@lskjs/err';
import axios from 'axios';
import { google } from 'googleapis';
import { json2csv } from 'json-2-csv';

import { auth2 } from './auth';
// import { log } from './log';

export async function getFileWithAuth(spreadsheetId: string, sheetId = 0) {
  const token = await auth2();
  // @ts-ignore
  const sheets = google.sheets({
    version: 'v4',
    auth: token,
  });

  const spreadSheetResult = await sheets.spreadsheets.get({
    spreadsheetId,
  });
  const sheetsArray = spreadSheetResult?.data?.sheets;
  if (!sheetsArray) throw new Err('!sheets');
  const range = sheetsArray.find((sheet) => String(sheet.properties.sheetId) === String(sheetId));
  if (!range) throw new Err('!range');
  const rangeTitle = range.properties.title;
  const result: any = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: rangeTitle,
  });
  const csv = json2csv(result.data.values, {
    emptyFieldValue: '',
    prependHeader: false,
  });
  return csv;
}

export async function getSpreadsheetRaw(url) {
  try {
    const s = new RegExp('/spreadsheets/d/([a-zA-Z0-9-_]+)').exec(url);
    let spreadsheetId;
    if (s) {
      // eslint-disable-next-line prefer-destructuring
      spreadsheetId = s[1];
    } else {
      throw new Error('invalid url');
    }
    const sh = new RegExp('[#&]gid=([0-9]+)').exec(url);
    let sheetId;
    if (sh) {
      // eslint-disable-next-line prefer-destructuring
      sheetId = sh[1];
    } else {
      throw new Error('invalid gid');
    }
    const exportURL = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?gid=${sheetId}&format=csv`;
    const response = await axios(exportURL, {
      validateStatus(status) {
        return (status >= 200 && status < 300) || status === 401;
      },
    });
    let { data } = response;
    if (response.status === 401) {
      // log.debug('need auth');
      // sheetId
      data = await getFileWithAuth(spreadsheetId, sheetId || 0);
    }
    return data;
  } catch (e) {
    if (e && e.statusCode === '404') {
      console.log('File not found');
    } else {
      console.log(e);
    }
  }
  return null;
}

export default getSpreadsheetRaw;
