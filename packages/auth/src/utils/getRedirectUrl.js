import toQs from '@lskjs/utils/toQs';

export default (req, prefix = '') =>
  `${prefix}?r=${encodeURIComponent(
    req.path + (req.query && Object.keys(req.query).length ? `?${toQs(req.query)}` : ''),
  )}`;
