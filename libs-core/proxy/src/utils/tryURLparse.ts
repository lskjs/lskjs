export function tryURLparse(raw: string) {
  let str = raw;
  if (!/^(http|https|ftp):\/\//.test(str)) {
    str = `http://${str}`;
  }
  try {
    const url = new URL(str);
    return url;
  } catch (err) {
    return null;
  }
}

export default tryURLparse;
