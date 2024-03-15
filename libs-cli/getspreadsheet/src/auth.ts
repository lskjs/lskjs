/* eslint-disable camelcase */
import { createInterface } from 'node:readline/promises';

import { set } from '@lskjs/algos';
import { getLskConfig } from '@lskjs/cli-utils';
import { Err } from '@lskjs/err';
import { jsonToFile } from '@lskjs/stringify';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

import { log } from './log';

const SCOPES = [
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/spreadsheets.readonly',
];

export const setLskConfig = async (key, value, { path }: any = {}) => {
  const cwd = process.cwd();
  // eslint-disable-next-line no-param-reassign
  if (!path) path = `${cwd}/.lskjs.js`;
  let config = {};
  log.debug(`${path}`, key, value);
  try {
    // eslint-disable-next-line import/no-dynamic-require
    config = require(`${path}`);
  } catch (err) {
    log.error('[setLskConfig]', err);
    config = {};
  }
  set(config, key, value);
  await jsonToFile(`${path}`, config, { type: 'js' });
};

// 1. open google cloud
// 2. create app with oAutg 2.0 Client ID for Desktop
// 3. copy creds in .lskjs.js .getspreadsheet.app

export async function auth2(): Promise<OAuth2Client> {
  const lskjsrc = getLskConfig();
  if (!lskjsrc?.getspreadsheet) throw new Err('!lskjsrc.getspreadsheet');
  if (!lskjsrc?.getspreadsheet?.app) {
    throw new Err('!lskjsrc.getspreadsheet.app');
  }
  const { client_secret, client_id, redirect_uris } = lskjsrc?.getspreadsheet?.app || {};

  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  let token = lskjsrc?.getspreadsheet?.token;
  if (!token) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    log.warn('Authorize this app by visiting this url:\n\n', authUrl, '\n\n');
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const code = await rl.question('Enter the code from that page here: ');
    const { tokens } = await oAuth2Client.getToken(code);
    token = tokens;
    await setLskConfig('getspreadsheet.token', token, { path: lskjsrc.path });
    const cwd = process.cwd();
    log.debug('Token stored to', `${cwd}/.lskjs.js`);
  }
  oAuth2Client.setCredentials(token);
  return oAuth2Client;
}

export default auth2;
