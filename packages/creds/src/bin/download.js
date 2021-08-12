#!/usr/bin/env node
import Err from '@lskjs/err';

import { download } from '../download';
import { addCwd } from '../utils/addCwd';

const argsStartIndex = 2;

const dir = addCwd(process.argv[argsStartIndex]);
const force = process.argv[argsStartIndex + 1] === '--force';
if (!dir) throw new Err('!dir');
download(dir, { force }).catch((err) => {
  // eslint-disable-next-line no-console
  console.error('ERR', err);
});
