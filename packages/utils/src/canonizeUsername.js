import canonize from './canonize';

export default function canonizeUsername(str = '') {
  // TODO: customize str pattern
  return canonize(str).replace(/[^0-9a-z_]+/gi, '_');
}
