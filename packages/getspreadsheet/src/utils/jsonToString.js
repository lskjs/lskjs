import JS from 'javascript-stringify';
import mapValues from 'lodash/mapValues';

import { getCommentString } from './getCommentString';
import { jsonToYaml } from './jsonToYaml';

const KV = {
  stringify: (json) => Object.values(mapValues(json, (value, key) => `${key}=${value}`)).join('\n'),
};

export function jsonToString(json, { type = 'keyval', comment, indent = 2 } = {}) {
  const commentString = getCommentString(comment, { type }) || null;
  if (type === 'keyval') {
    return [commentString, KV.stringify(json)].filter(Boolean).join('\n');
  }
  if (type === 'json') {
    return JSON.stringify(
      {
        __comment: commentString,
        ...json,
      },
      null,
      indent,
    );
  }
  if (type === 'yaml') {
    const { __raw: footer = '', ...yamlObject } = json;
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

  return [
    commentString,
    '/* eslint-disable prettier/prettier */',
    `module.exports = ${JS.stringify(json, null, indent)};`,
  ]
    .filter(Boolean)
    .join('\n');
}

export default jsonToString;
