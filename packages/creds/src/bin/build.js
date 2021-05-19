#!/usr/bin/env node
import { build } from '../build';
import { addCwd } from '../utils/addCwd';

const dir = addCwd(process.argv[2] || '');
const force = process.argv[3] === '--force';
build(dir, { force }).catch((err) => {
  // eslint-disable-next-line no-console
  console.error('ERR', err);
});
