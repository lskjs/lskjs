const getShortPath = (link = '', { cwd = process.cwd() } = {}) =>
  link.replace(`${cwd}/`, '').replace(cwd, '.').replace(process.env.HOME, '~');

module.exports = { getShortPath };
