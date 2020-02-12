import fs from 'fs';
import fallback from './fallback';

export default ({ fallback: asset, url } = {}) => async (req, res) => {
  if (__DEV__ && url) {
    return fallback({ url, req });
  }
  return res.set({ 'content-type': 'image/png' }).send(fs.readFileSync(asset));
};
