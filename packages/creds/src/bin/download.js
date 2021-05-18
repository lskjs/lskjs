#!/usr/bin/env node
import { download } from '../download';

const dir = process.argv[2];
const force = process.argv[3] === '--force';
if (!dir) throw '!dir';
download(dir, { force }).catch((err) => {
  // eslint-disable-next-line no-console
  console.error('ERR', err);
});
