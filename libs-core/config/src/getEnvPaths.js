import fs from 'fs';
import flattenDeep from 'lodash/flattenDeep';
import range from 'lodash/range';
import path from 'path';

export const getEnvPaths = (params = {}) => {
  const { cwd = process.cwd(), dirs = 3, exts = ['.js', '.json'], name = '.env' } = params;

  return flattenDeep(range(dirs).map((deep) => exts.map((ext) => `${cwd}/${'../'.repeat(deep)}${name}${ext}`)))
    .map((p) => path.resolve(p))
    .filter((p) => fs.existsSync(p))
    .reverse();
};

export default getEnvPaths;
