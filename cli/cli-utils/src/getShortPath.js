const getShortPath = (link = '') =>
  link.replace(process.cwd(), '.').replace(process.env.HOME, '~').replace(process.env.HOME2, '~');

module.exports = { getShortPath };
