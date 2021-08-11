#!/usr/bin/env node
import { upload } from '../upload';
import { addCwd } from '../utils/addCwd';

const argsStartIndex = 2;

const dir = addCwd(process.argv[argsStartIndex]);
const force = process.argv[argsStartIndex + 1] === '--force';
if (!dir) throw '!dir';
upload(dir, { force }).catch((err) => {
  // eslint-disable-next-line no-console
  console.error('ERR', err);
});
