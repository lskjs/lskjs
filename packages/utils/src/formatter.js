export function numberWithSpaces(x = 0) {
  const parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return parts.join('.');
}

function toFixedWithoutRounding(value, precision) {
  const factorError = 10 ** (14);
  const factorTruncate = 10 ** (14 - precision);
  const factorDecimal = 10 ** (precision);

  return Math.floor(Math.floor(value * factorError + 1) / factorTruncate) / factorDecimal;
}

export function formatter(valueInit, sign = '', isPrefixSign = true) {
  const arr = [];
  if (valueInit == null) return null;
  let value = String(Math.abs(valueInit));
  if (value[value.length - 2] === '.') {
    value = `${value}0`;
  }
  const parts = value.split('.');
  let int = parts[0] || '';
  const fract = parts[1] || '';
  int.split('').reverse().forEach((c, i, a) => {
    if (i % 3 === 0 && a[i - 1] !== '.') {
      arr.push(' ');
    }
    arr.push(c);
  });
  int = arr.reverse().join('').trim();
  let res = int;
  if (fract.length > 0) {
    res += `.${fract}`;
  }

  const prefix = valueInit < 0 ? '—' : '';

  if (isPrefixSign) {
    return `${prefix}${sign}${res}`;
  }

  return `${prefix}${res}${sign}`;
}

export function toShort(price) {
  try {
    const keys = [
      [10 ** (3 * 4), 'T'],
      [10 ** (3 * 3), 'G'],
      [10 ** (3 * 2), 'M'],
      [10 ** (3 * 1), 'k'],
    ];

    for (const key of keys) {
      if (price > key[0]) {
        return numberWithSpaces(+toFixedWithoutRounding((price / key[0]), 2)) + key[1];
      }
    }
    return numberWithSpaces(+toFixedWithoutRounding(price, 2));
  } catch (err) {
    __DEV__ && console.error('formatter.toShort', err);  //eslint-disable-line
    return 0;
  }
}

export default toShort;
