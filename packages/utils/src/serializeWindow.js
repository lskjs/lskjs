import map from 'lodash/map';
// import serialize from 'serialize-javascript';

export default function serializeWindow(vars = {}, serialize = JSON.stringify) {
  const options = __DEV__ ? { space: 2 } : {};

  return map(vars, (val, key) => `window['${key}'] = ${serialize(val, options)};`).join('\n');
}
