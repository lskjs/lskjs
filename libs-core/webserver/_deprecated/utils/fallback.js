import mapValues from 'lodash/mapValues';
import pick from 'lodash/pick';

export default async function fallback({ url: fallbackUrl, req, res } = {}) {
  const url = `${fallbackUrl}/${req.path}`;
  const result = await fetch(url);
  const file = await result.buffer();
  const headers = mapValues(
    pick(result.headers.raw(), [
      'server',
      'date',
      'content-type',
      'connection',
      'last-modified',
      'etag',
      'expires',
      'cache-control',
      'accept-ranges',
      'strict-transport-security',
    ]),
    (a) => String(a),
  );
  return res.set(headers).send(file);
}
