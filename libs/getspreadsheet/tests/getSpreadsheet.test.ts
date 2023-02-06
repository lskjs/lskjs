/* global test expect */
import getSpreadsheet from '../src';

const testUrl = 'https://docs.google.com/spreadsheets/d/1yqEtc7VfCZRv4I3iqSiKSq9CkSDCU3fIKa-ZayyW_ys/edit#gid=0';

test('check 0', async () => {
  const res = await getSpreadsheet(testUrl);
  expect(res).not.toBe(1);
});
