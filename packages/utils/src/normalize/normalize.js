import { normalizeUnicodeText } from 'normalize-unicode-text';

import charMap from './map';

function normalize(_str) {
  let str = _str;
  if (!str) {
    return '';
  }
  str = normalizeUnicodeText(str);
  return [...str].map((char) => charMap[char] || char).join('');
}

export default normalize;
