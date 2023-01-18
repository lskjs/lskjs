import fs from 'fs/promises';
import isEqual from 'lodash/isEqual';
import path from 'path';

import { fileToJson } from './fileToJson';
import { jsonToString } from './jsonToString';

export async function jsonToFile(
  filename,
  json,
  { type = 'keyval', comment, compare = true } = {}
) {
  const data = await fileToJson(filename, { type });
  if (compare && isEqual(json, data)) {
    // // eslint-disable-next-line no-console
    // console.log('isEqual', filename);
    return;
  }
  await fs.mkdir(path.dirname(filename), { recursive: true });
  await fs.writeFile(filename, jsonToString(json, { type, comment }));
}

export default jsonToFile;
