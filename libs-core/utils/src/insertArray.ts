import range from 'lodash/range';

export default function insertArray(items, items2, pos = 0) {
  let nullCount = 0;
  let realPos = pos;
  if (pos > items.length) nullCount = pos - items.length;
  if (pos < 0) {
    realPos = 0;
    nullCount = +pos;
  }
  const nullArr = range(nullCount).map(() => null);
  const result = pos >= 0 ? items.concat(nullArr) : nullArr.concat(items);
  result.splice(...[realPos, items2.length].concat(items2));
  return result;
}
