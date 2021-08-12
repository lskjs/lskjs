import { isDev } from '@lskjs/env';
import map from 'lodash/map';

export default function serializeWindow(vars = {}, serialize = JSON.stringify) {
  const options = isDev ? { space: 2 } : {};

  return map(vars, (val, key) => `window['${key}'] = ${serialize(val, options)};`).join('\n');
}
