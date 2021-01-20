/* eslint-disable no-console */
/* eslint-disable max-classes-per-file */
global.__DEV__ = true;

const Bluebird = require('bluebird');
const { request } = require('../build/request');

const main = async () => {
  await Bluebird.delay(1000)
  console.log('---------------------');
  console.log('request youtube-video');

  const { data } = await request({
    url: 'https://www.youtube.com/watch?v=_JTOcZ3Dvho',
    timeout: 5000,
  });

  if (!String(data).includes('"runs":[{"text":"Swimming now — Limassol, Cyprus"}]}')) throw 'INVALID_RESPONSE';

  console.log('---------------------');
  // console.log('---------------------');
  // console.log('request youtube-channel');

  // const { data: data2 } = await request({
  //   url: 'https://www.youtube.com/channel/UClTDQYzyM59Oup8EW3Vzk0g',
  //   timeout: 10000,
  // });

  // if (!String(data2).includes('"shortBylineText":{"runs":[{"text":"Igor Suvorov",')) throw 'INVALID_RESPONSE';

  // console.log('---------------------');
};

main();
