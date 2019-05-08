import getQueryFromParams from './getQueryFromParams';

export default function composeUrl({ qs = {}, url } = {}) {
  let toOrHref = url || '';
  if (qs && Object.keys(qs).length) {
    if (toOrHref.indexOf('?') === -1) {
      toOrHref += '?';
    } else {
      toOrHref += '&';
    }
    toOrHref += getQueryFromParams(qs);
  }
  return toOrHref;
}
