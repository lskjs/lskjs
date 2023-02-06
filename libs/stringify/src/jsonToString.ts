// eslint-disable-next-line import/no-extraneous-dependencies
import { mapValues, omit } from '@lskjs/algos';
import { stringify as JSstringify } from 'javascript-stringify';

import { getCommentString } from './getCommentString';
import { jsonToYaml } from './jsonToYaml';

const KV = {
  stringify: (json: Record<string, unknown>) =>
    Object.values(mapValues(json, (value, key) => `${key}=${value}`)).join('\n'),
};

export function jsonToString(json: any, { type = 'keyval', comment = '', indent = 2 } = {}) {
  const commentString = getCommentString(comment, { type }) || null;
  if (type === 'keyval' || type === 'keyvalue' || type === 'env' || type === 'dotenv') {
    return [commentString, KV.stringify(json)].filter(Boolean).join('\n');
  }
  if (type === 'json') {
    if (typeof json === 'object' && !Array.isArray(json)) {
      // eslint-disable-next-line no-param-reassign
      json = {
        __comment: commentString,
        ...json,
      };
    }
    return JSON.stringify(json, null, indent);
  }
  if (type === 'yaml' || type === 'yml') {
    let yamlObject;
    const footer = json.__raw;
    if (Array.isArray(json)) {
      yamlObject = json;
    } else {
      yamlObject = omit(json, ['__raw']);
    }
    return [
      commentString,
      jsonToYaml(yamlObject, {
        indent,
        noRefs: true,
      }),
      footer,
    ]
      .filter(Boolean)
      .join('\n');
  }

  const moduleExports = type === 'es6' ? 'export default' : 'module.exports =';

  return [
    commentString,
    '/* eslint-disable prettier/prettier */',
    `${moduleExports} ${JSstringify(json, null, indent)};`,
  ]
    .filter(Boolean)
    .join('\n');
}

export default jsonToString;
