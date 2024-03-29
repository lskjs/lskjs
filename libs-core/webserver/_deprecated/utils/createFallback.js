import { isDev } from '@lskjs/env';
import fs from 'fs';

import fallback from './fallback';

export default ({ fallback: asset, url, headers = { 'content-type': 'image/png' } } = {}) =>
  async (req, res) => {
    if (isDev && url) {
      return fallback({ url, req });
    }
    return res.set(headers).send(fs.readFileSync(asset));
  };
