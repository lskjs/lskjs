import Err from '@lskjs/err';

function chunkString(str, length) {
  return str.match(new RegExp(`.{1,${length}}`, 'g'));
}

export function getPathById(name, depth = 5, length = 3) {
  if (!name || !name.length) {
    throw new Err('Empty string');
  }

  if (depth <= 0) {
    throw new Err('Deep is not valid');
  }

  if (length <= 0) {
    throw new Err('Length is not valid');
  }

  if (name.length < 3) {
    return name;
  }

  const res = chunkString(name, length)
    .filter((d) => d.length === length)
    .slice(0, depth)
    .concat([name])
    .join('/');

  return res;
}

export default getPathById;
