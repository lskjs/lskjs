const joinArgs = (args = []) =>
  args
    .filter(Boolean)
    .map((a) => (a.includes(' ') ? `"${a}"` : a))
    .join(' ');

module.exports = {
  joinArgs,
};
