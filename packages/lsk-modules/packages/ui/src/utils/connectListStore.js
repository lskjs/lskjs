import { autorun, toJS } from 'mobx';
import Promise from 'bluebird';
import omit from 'lodash/omit';
import getParamsFromQuery from './getParamsFromQuery';
import getQueryFromParams from './getQueryFromParams';

const DEBUG = __DEV__ && false;

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

  await Promise.delay(10);
  // return () => {}
  const remove = autorun(async () => {
    const params = {
      ...omit(query, omitKeys),
      ...getParams(listStore),
    };
    DEBUG && console.log('autorun', params, defaultParams, omit(query, omitKeys), {

      ...omit(query, omitKeys),
    });

    let string = getQueryFromParams(params, defaultParams);
    if (string) string = `?${string}`;
    // console.log('COMPARE', page.uapp.history.location.search, string, page.uapp.history.location.search === string);
    if (page.uapp.history.location.search === string) return;
    DEBUG && console.log('connectListStore: waiting for refresh', page.uapp.history.location.search, '=>', string, page.uapp);

    if (__DEV__) {
      await Promise.delay(1000);
    }
    page.uapp.history.replace({
      search: string,
      method: 'replaceState',
    });
  });
  const removeWrapper = () => {
    DEBUG && console.log('REMOVE @@@!!!!');
    remove();
  };

  if (__DEV__) {
    setTimeout(() => {
      DEBUG && console.log('AUTOREMOVE');
      removeWrapper();
    }, 30000);
  }

  return removeWrapper;
};


export default connectListStore;
