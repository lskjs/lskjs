/* eslint-disable no-console */
import axios from 'axios';

import auth from './auth';
import get from './get';

export default async (url) => {
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
    // console.log(`Try to get ${exportURL}`);

    const response = await axios(exportURL);
    let { data } = response;
    const { responseUrl = '' } = response.request.res;
    // console.log(`response.request.res.fetchedUrls:`, response.request.res);
    // response.request.res.fetchedUrls
    // if (response.url.includes('ServiceLogin')) {
    if (responseUrl.includes('ServiceLogin')) {
      console.log('need auth');
      const a = await auth();
      data = await get(a, { fileId: spreadsheetId, gid: sheetId });
    }
    // console.log('data', data);
    // if (filename) {
    //   fs.writeFileSync(`${filename}`, body, 'utf8');
    // } else {
    //   console.log(body);
    // }
    return data;
  } catch (e) {
    if (e && e.statusCode === '404') {
      console.log('File not found');
    } else {
      console.log(e);
    }
  }
  return null;
};
