#!/usr/bin/env node
import { upload } from '../upload';

const dir = process.argv[2];
const force = process.argv[3] === '--force';
if (!dir) throw '!dir';
upload(dir, { force }).catch((err) => {
  // eslint-disable-next-line no-console
  console.error('ERR', err);
});
