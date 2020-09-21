import isPlainObject from 'lodash/isPlainObject';
import isFunction from 'lodash/isFunction';
import isClass from '@lskjs/utils/isClass';
// import mapValuesDeep from '@lskjs/utils/mapValuesDeep';
import asyncMapValuesDeep from '@lskjs/utils/asyncMapValuesDeep';
import extractApi from './extractApi';

const DEBUG = false;
const finish = (res) => {
  if (DEBUG) console.log('finish', res); //  eslint-disable-line no-console
  return res;
};

export default async function getRoutesTree(api) {
  if (DEBUG)
    console.log(
      'getRoutesTree start',
      api,
      // eslint-disable-next-line no-nested-ternary
      isPlainObject(api) ? '[isPlainObject]' : Array.isArray(api) ? '[array]' : '',
    );
  if (!api) return finish(null);
  if (isFunction(api)) return finish(api);
  if (isClass(api)) {
    throw 'isClass not implemented';
    // const api = new api(ctx); // eslint-disable-line new-cap
    // return finish(api && isFunction(api.getRoutes) && api.getRoutes());
  }
  if (Array.isArray(api)) return finish(await Promise.map(api, (subApi) => getRoutesTree(subApi)));
  if (isPlainObject(api)) return finish(await asyncMapValuesDeep(api, getRoutesTree, (a) => a));
  const resultApi = await extractApi(api, null);
  if (resultApi == null) return finish(null);
  return getRoutesTree(resultApi);
}
