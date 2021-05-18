#!/usr/bin/env node
import { build } from '../build';

const dir = process.argv[2] || `${__dirname}/..`;
const force = process.argv[3] === '--force';
build(dir, { force }).catch((err) => {
  // eslint-disable-next-line no-console
  console.error('ERR', err);
});
