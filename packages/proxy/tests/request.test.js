/* eslint-disable max-classes-per-file */
/* global test expect */

import { request } from '../src/request';

test('request youtube-video', async () => {
  const { data } = await request('https://www.youtube.com/watch?v=_JTOcZ3Dvho');
  expect(String(data).includes('"runs":[{"text":"Swimming now — Limassol, Cyprus"}]}')).toEqual(true);
});

test('request youtube-channel', async () => {
  const { data } = await request('https://www.youtube.com/channel/UClTDQYzyM59Oup8EW3Vzk0g');
  expect(String(data).includes('"shortBylineText":{"runs":[{"text":"Igor Suvorov",')).toEqual(true);
});
