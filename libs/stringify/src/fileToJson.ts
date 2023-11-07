import { fromPairs } from '@lskjs/algos';
import { Err } from '@lskjs/err';
import { existsSync as exists } from 'fs';
import { readFile } from 'fs/promises';
import yaml from 'js-yaml';

export async function fileToJson(filename: string, { type = 'keyval' } = {}) {
  if (!exists(filename)) return null;
  try {
    if (type === 'js') {
      // eslint-disable-next-line import/no-dynamic-require
      const data = require(filename);
      delete require.cache[require.resolve(filename)];
      return data;
    }
    const str = (await readFile(filename)).toString();
    if (type === 'json') {
      return JSON.parse(str);
    }
    if (type === 'keyval' || type === 'keyvalue' || type === 'env' || type === 'dotenv') {
      if (!str) return [];
      const keyvalues = String(str)
        .split('\n')
        .map((a) => {
          const s = a.trim();
          if (s[0] === '#') return null;
          if (s.indexOf('=') === -1) return null;
          const delimiter = s.indexOf('=');
          const key = s.substr(0, delimiter);
          if (!key) return null;
          const value = s.substr(delimiter + 1);
          return [key, value];
        })
        .filter(Boolean) as [string, string][];
      // console.log({ str, keyvalues });
      return fromPairs(keyvalues);
    }
    if (type === 'yaml' || type === 'yml') {
      return yaml.load(str);
    }
    throw new Err('!type', { data: { type } });
  } catch (err) {
    // TODO: обработать ошибку если
    // eslint-disable-next-line no-console
    console.error('fileToJson err', err, { filename, type });
    return null;
  }
}

export default fileToJson;
