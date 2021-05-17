import fs from 'fs';
import isEqual from 'lodash/isEqual';

import { fileToJson } from './fileToJson';
import { jsonToString } from './jsonToString';

export async function jsonToFile(filename, json, { type = 'keyval', comment, compare = true } = {}) {
  const data = await fileToJson(filename, { type });
  if (compare && isEqual(json, data)) {
    // // eslint-disable-next-line no-console
    // console.log('isEqual', filename);
    return;
  }
  fs.writeFileSync(filename, jsonToString(json, { type, comment }));
}

export default jsonToFile;
