import forEach from 'lodash/forEach';
import tryJSONparse from '@lskjs/utils/tryJSONparse';

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
