/* eslint-disable max-classes-per-file */
/* global test expect */

import { extract } from '../src/extract';

test('extract youtubeVideo', async () => {
  const res = await extract('https://www.youtube.com/watch?v=_JTOcZ3Dvho');
  expect(res).toEqual([
    {
      type: 'youtubeVideo',
      provider: 'youtube',
      id: '_JTOcZ3Dvho',
      url: 'https://www.youtube.com/watch?v=_JTOcZ3Dvho',
    },
  ]);
});

test('extract youtubeChannel', async () => {
  const res = await extract('https://www.youtube.com/channel/UClTDQYzyM59Oup8EW3Vzk0g');
  expect(res).toEqual([
    {
      type: 'youtubeChannel',
      provider: 'youtube',
      id: 'UClTDQYzyM59Oup8EW3Vzk0g',
      url: 'https://www.youtube.com/channel/UClTDQYzyM59Oup8EW3Vzk0g',
    },
  ]);
});
