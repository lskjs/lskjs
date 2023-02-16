#!/usr/bin/env node
import Err from '@lskjs/err';

import { hooks } from '../hooks';
import { addCwd } from '../utils/addCwd';

const argsStartIndex = 2;

const dir = addCwd(process.argv[argsStartIndex]);
const force = process.argv[argsStartIndex + 1] === '--force';
if (!dir) throw new Err('!dir');
hooks(dir, { force }).catch((err) => {
  // eslint-disable-next-line no-console
  console.error('ERR', err);
});
