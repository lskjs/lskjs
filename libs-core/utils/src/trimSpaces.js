export default function trimSpaces(str = '', regexp = /\s+/g) {
  return str.replace(regexp, ' ').trim();
}
