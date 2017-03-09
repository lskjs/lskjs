import fs from 'fs';
import set from 'lodash/set';

export function parse(src) {
  const obj = {};
  src.toString().split('\n').forEach((line) => {
    const keyValueArr = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/);
    if (keyValueArr != null) {
      const key = keyValueArr[1];
      let value = keyValueArr[2] ? keyValueArr[2] : '';
      const len = value ? value.length : 0;
      if (len > 0 && value.charAt(0) === '"' && value.charAt(len - 1) === '"') {
        value = value.replace(/\\n/gm, '\n');
      }
      value = value.replace(/(^['"]|['"]$)/g, '').trim();
      obj[key] = value;
    }
  });

  return obj;
}

function systemEnv() {
  const env = {};
  for (const key in process.env) {
    set(env, key, process.env[key]);
  }
  return env;
}

function projectEnv(path, encoding) {
  const parsedObj = parse(fs.readFileSync(path, { encoding }));
  const env = {};
  for (const key in parsedObj) {
    set(env, key, parsedObj[key]);
  }
  return env;
}

export function config(options) {
  let path = '.env';
  let encoding = 'utf8';
  if (options) {
    if (options.path) {
      path = options.path;
    }
    if (options.encoding) {
      encoding = options.encoding;
    }
  }
  try {
    const env = Object.assign(systemEnv(), projectEnv(path, encoding));
    return env;
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.log('.env file not found!');
      return systemEnv();
    }
    return {
      error: e,
    };
  }
}
