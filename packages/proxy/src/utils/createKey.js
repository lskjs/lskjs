export const createKey = ({ host, port }) =>
  [host, port]
    .filter(Boolean)
    .join(':')
    .replace(/[^a-zA-Z0-9]/g, '_');

export default createKey;
