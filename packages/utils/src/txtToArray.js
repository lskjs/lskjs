export default (str) => {
  let str2 = '';
  while (true) {
    str2 = str.replace(/([\t\n]".*)(\n[^º])(.*"[\t\n])/gi, '$1\\n$3');
    if (str2.length === str.length) break;
    str = str2;
  }
  return str;
};
