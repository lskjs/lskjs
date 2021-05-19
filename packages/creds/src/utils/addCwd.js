export function addCwd(dir) {
  if (typeof dir !== 'string') return dir;
  if (dir[0] === '/') return dir;
  // eslint-disable-next-line no-param-reassign
  if (dir[0] === '~') dir = dir.slice(2);
  return `${process.cwd()}/${dir}`;
}

export default addCwd;
