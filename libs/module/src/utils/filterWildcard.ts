export const filterWildcard = (array: string[], pattern: string): string[] =>
  array.filter((name) => name.startsWith(pattern.substr(0, pattern.length - 1)));

export default filterWildcard;
