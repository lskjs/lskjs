#!/usr/bin/env node
import { build } from '../build';
import { addCwd } from '../utils/addCwd';

const argsStartIndex = 2;

const dir = addCwd(process.argv[argsStartIndex] || '');
const force = process.argv[argsStartIndex + 1] === '--force';
build(dir, { force }).catch((err) => {
  // eslint-disable-next-line no-console
  console.error('ERR', err);
});
