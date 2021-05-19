#!/usr/bin/env node
import { upload } from '../upload';
import { addCwd } from '../utils/addCwd';

const dir = addCwd(process.argv[2]);
const force = process.argv[3] === '--force';
if (!dir) throw '!dir';
upload(dir, { force }).catch((err) => {
  // eslint-disable-next-line no-console
  console.error('ERR', err);
});
