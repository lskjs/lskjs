import isPlainObject from 'lodash/isPlainObject';
import forEach from 'lodash/map';
import cutText from './cutText';

export default (obj = {}, size = 1000) => {
  if (!isPlainObject(obj)) return JSON.stringify(obj, null, 2);
  const rows = [];
  forEach(obj, (value, key) => {
    const strValue = cutText(JSON.stringify(value, null, 2), size);
    rows.push(`  "${key}": ${strValue}`);
  });
  const content = rows.join(',\n');
  if (!content) return '{}';
  return `{\n${content}\n}`;
};
