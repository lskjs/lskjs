export default function isAbsoluteUrl(url = '') {
  return url.indexOf('://') > 0 || url.indexOf('//') === 0;
}
