import isFunction from 'lodash/isFunction';

export default function extractApi(api, defaultValue = undefined) {
  if (isFunction(api.api) || isFunction(api.getRoutes)) {
    return api.api ? api.api() : api.getRoutes();
  }
  return defaultValue;
}
