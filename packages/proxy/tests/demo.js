/* eslint-disable no-console */
/* eslint-disable max-classes-per-file */
import Err from '@lskjs/err';

global.__DEV__ = true;

const Bluebird = require('bluebird');
const { request } = require('../build/request');

const req0 = async () => {
  console.log('---------------------');
  let data1;
  try {
    ({ data } = await request({
      url: 'https://myip.ru/index_small.php',
      timeout: 5000,
    }));
    data1 = data;
  } catch (err) {
    throw err.message || err;
  }

  if (!String(data).includes('<td>2a00')) {
    throw new Err('INVALID_RESPONSE');
  }

  console.log('---OK---OK---OK----OK---');
};
const req1 = async () => {
  console.log('---------------------');
  let data1;
  try {
    ({ data } = await request({
      url: 'https://www.youtube.com/watch?v=_JTOcZ3Dvho',
      timeout: 5000,
    }));
    data1 = data;
  } catch (err) {
    throw err.message || err;
  }

  if (!String(data).includes('"runs":[{"text":"Swimming now — Limassol, Cyprus"}]}')) throw new Err('INVALID_RESPONSE');

  console.log('---OK---OK---OK----OK---');
};

const req2 = async () => {
  console.log('---------------------');
  let data1;
  try {
    ({ data } = await request({
      url: 'https://www.youtube.com/channel/UClTDQYzyM59Oup8EW3Vzk0g',
      timeout: 5000,
    }));
    data1 = data;
  } catch (err) {
    throw err.message || err;
  }

  if (!String(data).includes('"shortBylineText":{"runs":[{"text":"Igor Suvorov",')) throw new Err('INVALID_RESPONSE');

  console.log('---OK---OK---OK----OK---');
};

const main = async () => {
  await Bluebird.delay(1000);
  await req0();
  await req1();
  await req2();
};

main();
