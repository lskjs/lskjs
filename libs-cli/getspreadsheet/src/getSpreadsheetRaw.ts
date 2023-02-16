/* eslint-disable prefer-regex-literals */
/* eslint-disable no-console */
import axios from 'axios';
import { google } from 'googleapis';

import { auth2 } from './auth';
import { log } from './log';

export async function getFileWithAuth(fileId: string) {
  const token = await auth2();
  // gid
  // console.log('google', auth, fileId);
  const drive = google.drive({ version: 'v3', auth: token });
  // console.log('drive', drive);
  return new Promise((resolve, reject) => {
    drive.files.export(
      {
        fileId,
        mimeType: 'text/csv',
      },
      (err, res) => {
        if (err) return reject(err);
        return resolve(res.data);
      },
    );
  });
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
    const response = await axios(exportURL);
    let { data } = response;
    const { responseUrl = '' } = response.request.res;
    if (responseUrl.includes('ServiceLogin')) {
      // log.debug('need auth');
      // sheetId
      data = await getFileWithAuth(spreadsheetId);
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
