export default (raw) => {
  let str = raw;
  if (!(str.startsWith('http://') || str.startsWith('https://') || str.startsWith('ftp://'))) {
    str = `http://${str}`;
  }
  try {
    const url = new URL(str);
    return url;
  } catch (err) {
    return null;
  }
};