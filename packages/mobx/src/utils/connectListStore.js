import { isDev } from '@lskjs/env';
import getParamsFromQuery from '@lskjs/utils/getParamsFromQuery';
import getQueryFromParams from '@lskjs/utils/getQueryFromParams';
import Bluebird from 'bluebird';
import omit from 'lodash/omit';
import { autorun, toJS } from 'mobx';

const DEBUG = isDev && false;

const omitKeys = ['filter', 'sort', 'sortBy', 'search', 'skip', 'limit'];

export const defaultGetParams = (store) => ({
  filter: toJS(store.filter),
  sort: toJS(store.sort),
  limit: toJS(store.limit),
  skip: toJS(store.skip),
  search: toJS(store.search),
});

const connectListStore = async ({
  page,
  listStore,
  query,
  getParams = defaultGetParams,
  params: propsDefaultParams,
}) => {
  const defaultParams = propsDefaultParams || getParams(listStore);
  if (DEBUG) console.log('connectListStore', query, defaultParams); // eslint-disable-line no-console
  if (query) {
    const queryParams = getParamsFromQuery(query, defaultParams);
    if (DEBUG) console.log('queryParams setState', queryParams); // eslint-disable-line no-console
    listStore.setState(queryParams);
  }

  await Bluebird.delay(10);
  // return () => {}
  const remove = autorun(async () => {
    const params = {
      ...omit(query, omitKeys),
      ...getParams(listStore),
    };
    if (DEBUG) {
      console.log('autorun', params, defaultParams, omit(query, omitKeys), {
        // eslint-disable-line no-console
        ...omit(query, omitKeys),
      });
    }

    let string = getQueryFromParams(params, defaultParams);
    if (string) string = `?${string}`;

    if (!(page && page.uapp && page.uapp.history)) {
      console.log('!page.uapp.history'); // eslint-disable-line no-console
      return;
    }
    if (page.uapp.history.location.search === string) return;
    if (DEBUG) {
      console.log('connectListStore: waiting for refresh', page.uapp.history.location.search, '=>', string, page.uapp); // eslint-disable-line no-console
    }

    if (isDev) {
      await Bluebird.delay(1000);
    }
    page.uapp.history.replace({
      search: string,
      method: 'replaceState',
    });
  });
  const removeWrapper = () => {
    if (DEBUG) console.log('REMOVE @@@!!!!'); // eslint-disable-line no-console
    remove();
  };

  if (isDev) {
    setTimeout(() => {
      if (DEBUG) console.log('AUTOREMOVE'); // eslint-disable-line no-console
      removeWrapper();
    }, 30000);
  }

  return removeWrapper;
};

export default connectListStore;
