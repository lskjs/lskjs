export default (url = '') => {
  if (
    url.trim().startsWith('http://')
    || url.trim().startsWith('https://')
    || url.trim().startsWith('//')
  ) return url;
  return `//${url}`;
};
