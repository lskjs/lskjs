/* eslint-disable global-require */
import range from 'lodash/range';
import flattenDeep from 'lodash/flattenDeep';
import path from 'path';
import fs from 'fs';

export default (params = {}) => {
  const {
    cwd = process.cwd(),
    dirs = 3,
    exts = ['.js', '.json'],
    name = '.env',
  } = params;

  return flattenDeep(
    range(dirs).map(deep => (
      exts.map(ext => (
        `${cwd}/${'../'.repeat(deep)}${name}${ext}`
      ))
    )),
  )
    .map(p => path.resolve(p))
    .filter(p => fs.existsSync(p));
};
