import hashCode from './hashCode';

export const v033 = '\x1B'; // '\033';

export const v0r = `${v033}[0m`; // '\033';

export const colors = {
  bold: [1, 22],
  italic: [3, 23],
  underline: [4, 24],
  inverse: [7, 27],
  white: [37, 39],
  grey: [90, 39],
  black: [30, 39],
  blue: [34, 39],
  cyan: [36, 39],
  green: [32, 39],
  magenta: [35, 39],
  red: [31, 39],
  yellow: [33, 39],
};
export function stylizeBg(str, color) {
  const colors3 = {
    red: `${v033}[41m`,
    green: `${v033}[42m`,
    yellow: `${v033}[43m`,
    blue: `${v033}[44m`,
    magenta: `${v033}[45m`,
    cyan: `${v033}[46m`,
    white: `${v033}[47m`, // console.log({str})
  };
  if (!str) return '';
  const codes = colors3[color];
  if (!codes) return str;
  return `${codes + str}\x1b[0m`; // return '\x1b[45mqweqweqweqw\x1b[0m'
}

export function stylizeWithColor(str, color) {
  if (!str) return '';
  const codes = colors[color];

  if (codes) {
    return `${v033}[${codes[0]}m${str}${v033}[${codes[1]}m`;
  }
  return str;
}

export function stylizeWithoutColor(str, color) {
  return str;
}

export const colorsKeys = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
export const chars = ['•', '☼', '○', '♠', '♠', '♦', '♥'];

export const getInfo = id => {
  const code = hashCode(id);
  const base = colorsKeys.length;

  let cd = code;
  const colorCode = cd % base;
  cd = Math.floor(cd / base);
  const charCode = cd % base;
  cd = Math.floor(cd / base);
  // const bgColorCode = cd % base;
  const bgColorCode = -1;
  const res = {
    id,
    code,
    colorCode,
    color: colorsKeys[colorCode],
    bgColorCode,
    bgColor: colorsKeys[bgColorCode],
    charCode,
    char: chars[charCode],
  };
  return res;
};

const marker = id => {
  if (id == null) return a => a || ' ';
  const res = getInfo(id);
  const { color, bgColor, char } = res;
  return str => {
    return stylizeWithColor(stylizeBg(str || char, bgColor), color);
  };
};

console.log(marker()());
// for (let id = 0; id < 100; id++) {
//   const wrap = marker(id);
//   console.log(id, wrap(), wrap(id));
// }

export default marker;
