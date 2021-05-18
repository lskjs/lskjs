import Err from '@lskjs/utils/Err';
import fs from 'fs';
import yaml from 'js-yaml';
import fromPairs from 'lodash/fromPairs';

export async function fileToJson(filename, { type = 'keyval' } = {}) {
  try {
    if (type === 'js') {
      // eslint-disable-next-line import/no-dynamic-require
      const data = require(filename);
      return data;
    }
    const str = fs.readFileSync(filename);
    if (type === 'json') {
      return JSON.parse(str);
    }
    if (type === 'keyval' || type === 'keyvalue' || type === 'env') {
      const keyvalues = str
        .split('\n')
        .map((a) => {
          const s = a.trim();
          if (s[0] === '#') return null;
          if (s.indexOf('=') === -1) return null;
          const delimiter = s.indexOf('=');
          const key = s.substr(0, delimiter);
          const value = s.substr(delimiter + 1);
          return [key, value];
        })
        .filter(Boolean);
      return fromPairs(keyvalues);
    }
    if (type === 'yaml' || type === 'yml') {
      return yaml.load(str);
    }
    throw new Err('!type', { data: { type } });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('fileToJson err', err);
    return null;
  }
}

export default fileToJson;
