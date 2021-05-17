import fs from 'fs';
import yaml from 'js-yaml';

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
    if (type === 'yaml') {
      return yaml.load(str);
    }
    throw '!type';
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(1111, err);
    return null;
  }
}

export default fileToJson;
