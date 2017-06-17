export default function trim(initialStr, begin = true, end = true, symbol = '/') {
  if (initialStr == null) return initialStr;
  let str = initialStr;
  if (end && str[str.length - 1] === symbol) {
    str = str.substr(0, str.length - 1);
  }
  if (begin && str[0] === symbol) {
    str = str.substr(1);
  }
  if (str !== initialStr) return trim(str, begin, end, symbol);
  return str;
}
