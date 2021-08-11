import tryJSONparse from '@lskjs/utils/tryJSONparse';
import forEach from 'lodash/forEach';

export default (req, parseJson = false) => {
  const params = {};
  Object.assign(params, req.body);
  if (parseJson) {
    forEach(req.query, (val, key) => {
      params[key] = tryJSONparse(val);
    });
  } else {
    Object.assign(params, req.query);
  }
  return params;
};
