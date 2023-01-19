// eslint-disable-next-line import/no-extraneous-dependencies
import { mapValues, omit } from '@lskjs/algos';
import { stringify as JSstringify } from 'javascript-stringify';

import { getCommentString } from './getCommentString';
import { jsonToYaml } from './jsonToYaml';

const KV = {
  stringify: (json) => Object.values(mapValues(json, (value, key) => `${key}=${value}`)).join('\n'),
};

export function jsonToString(json, { type = 'keyval', comment, indent = 2 } = {}) {
  const commentString = getCommentString(comment, { type }) || null;
  if (type === 'keyval' || type === 'keyvalue' || type === 'env') {
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
  if (type === 'yaml' || type === 'yml') {
    let yamlObject;
    let footer;
    if (Array.isArray(json)) {
      yamlObject = json;
      footer = json.__raw;
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

  return [
    commentString,
    '/* eslint-disable prettier/prettier */',
    `module.exports = ${JSstringify(json, null, indent)};`,
  ]
    .filter(Boolean)
    .join('\n');
}

export default jsonToString;
