import isFunction from 'lodash/isFunction';

export default async function extractApi(api, defaultValue = undefined) {
  if (isFunction(api.api) || isFunction(api.__getRoutes)) {
    return api.api ? api.api() : api.__getRoutes();
  }
  return defaultValue;
}
