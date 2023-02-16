import { chunkString } from './chunkString';

export function getPathById(name: string, { depth = 5, length = 3, delimiter = '/' } = {}) {
  if (!name || !name.length) {
    throw new Error('Empty string');
  }

  if (depth <= 0) {
    throw new Error('Depth is not valid');
  }

  if (length <= 0) {
    throw new Error('Length is not valid');
  }

  if (name.length < 3) {
    return name;
  }

  const res = chunkString(name, length);
  if (!res) return res;

  return res
    .filter((d) => d.length === length)
    .slice(0, depth)
    .concat([name])
    .join(delimiter);
}

export default getPathById;
