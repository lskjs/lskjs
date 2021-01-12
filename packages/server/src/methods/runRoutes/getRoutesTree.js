import isPlainObject from 'lodash/isPlainObject';
import isArray from 'lodash/isArray';
import pickBy from 'lodash/pickBy';
import isClass from '@lskjs/utils/isClass';
// import isFunction from '@lskjs/utils/isFunction';
import Bluebird from 'bluebird';
// import mapValuesDeep from '@lskjs/utils/mapValuesDeep';
// import asyncMapValuesDeep from '@lskjs/utils/asyncMapValuesDeep';
import asyncMapValuesDeep from './asyncMapValuesDeep';
import isAnyFunction from 'lodash/isFunction';
import extractApi from './extractApi';

// const isClass = (a) => isClass(a) && !isFunction(a);
const isFunction = (a) => !isClass(a) && isAnyFunction(a);

const DEBUG = false;
const finish = (res, path) => {
  if (DEBUG) console.log(`[RRR] ${path} <<<<`, res); //  eslint-disable-line no-console
  return res;
};
const debug = function (api, path) {
  if (DEBUG) {
    const props = {
      null: !api,
      isPlainObject: isPlainObject(api),
      isArray: isArray(api),
      isClass: isClass(api),
      isFunction: isFunction(api),
    };
    console.log(`[RRR] ${path} >>>`, api, Object.keys(pickBy(props, Boolean)), this.name);
  }
};

export default async function getRoutesTree(api, path) {
  debug.bind(this)(api, path);
  if (!api) return finish(null, path);
  if (isFunction(api)) return finish(api, path);
  if (isArray(api))
    return finish(await Bluebird.map(api, (subApi, key) => getRoutesTree.bind(this)(subApi, key)), path);
  if (isPlainObject(api)) {
    return finish(
      await asyncMapValuesDeep(
        api,
        (...args) => getRoutesTree.bind(this)(...args),
        (a) => a,
      ),
      path,
    );
  }
  if (isClass(api)) {
    const Api = api;
    // eslint-disable-next-line no-param-reassign
    api = new Api(this, {
      path,
    });
    await api.__run();
    debug.bind(this)(api, path);
  }
  const resultApi = await extractApi(api, null);
  if (resultApi == null) return finish(null, path);
  return getRoutesTree.bind(api)(resultApi);
}
