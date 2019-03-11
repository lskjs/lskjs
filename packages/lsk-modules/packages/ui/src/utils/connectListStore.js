import { autorun, toJS } from 'mobx';
import Promise from 'bluebird';
import omit from 'lodash/omit';
import getParamsFromQuery from './getParamsFromQuery';
import getQueryFromParams from './getQueryFromParams';

const DEBUG = __DEV__;
// DEBUG = false;

const omitKeys = ['filter', 'sort', 'sortBy', 'search', 'skip', 'limit'];

export const defaultGetParams = store => ({
  filter: toJS(store.filter),
  sort: toJS(store.sort),
  limit: toJS(store.limit),
  skip: toJS(store.skip),
  search: toJS(store.search),
});

const connectListStore = async ({
  page, listStore, query, getParams = defaultGetParams, params: propsDefaultParams,
}) => {
  const defaultParams = propsDefaultParams || getParams(listStore);
  DEBUG && console.log('connectListStore', query, defaultParams);
  if (query) {
    const queryParams = getParamsFromQuery(query, defaultParams);
    DEBUG && console.log('queryParams setState', queryParams);
    listStore.setState(queryParams);
  }

  await Promise.delay(1000);
  const remove = autorun(async () => {
    const params = {
      ...omit(query, omitKeys),
      ...getParams(listStore),
    };
    DEBUG && console.log('autorun', { params }, { defaultParams }, omit(query, omitKeys), {
      ...defaultParams,
      ...omit(query, omitKeys),
    });

    let string = getQueryFromParams(params, defaultParams);
    if (string) string = `?${string}`;


    await Promise.delay(1000);
    page.uapp.history.replace({
      search: string,
      method: 'replaceState',
    });
  });

  if (__DEV__) {
    setTimeout(remove, 5000);
  }

  return remove;
};


export default connectListStore;
