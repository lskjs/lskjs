import set from 'lodash/set';
import Promise from 'bluebird';
import { observable, action } from 'mobx';
import axios from 'axios';
import omitEmpty from '@lskjs/utils/omitEmpty';
import insertArray from '@lskjs/utils/insertArray';

import Store from './Store';

const { CancelToken } = axios;

export function getFindParams(store) {
  return {
    search: store.search,
    filter: store.filter,
    sort: store.sort,
  };
}

export default class FetchStore extends Store {
  @observable items = [];
  @observable count = null;
  @observable skip = 0;
  @observable limit = 10;
  @observable loading = false;
  @observable fetchedAt = null;
  @observable select = {};
  @observable err = {};
  @observable fetchCallback;
  __cancelToken = null;

  setStateField(item, value) {
    if (['skip', 'limit'].includes(item)) {
      set(this, item, +value || 0);
    } else {
      super.setStateField(item, value);
    }
  }

  async find({ skip, limit, __cancelToken } = {}) {
    if (!this.api) throw '!api';
    if (!this.api.find) throw '!api.find';
    let params = getFindParams(this);
    if (this.getFindParams) params = this.getFindParams(this, params);
    const raw = await this.api.find({
      count: 1,
      ...omitEmpty(params),
      limit,
      skip,
      __cancelToken,
    });

    let items;
    let count;
    if (Array.isArray(raw)) {
      // console.warn('pack lost, raw != {data}');
      items = raw;
      count = raw.count >= 0 ? raw.count : null;
    } else {
      items = raw.data || raw.items || [];
      count = raw.count >= 0 ? raw.count : null;
    }

    return {
      items,
      count,
    };
  }

  @action
  setItems(items, { skip, cache } = {}) {
    if (cache) {
      this.items = insertArray(this.items, items, skip - this.skip);
    } else {
      this.items = items;
    }
  }

  @action
  async fetch({ skip = this.skip, limit = this.limit, cache } = {}) {
    if (this.loading) await this.cancelFetch();
    this.loading = true;
    this.__cancelToken = CancelToken.source();
    if (this.progress) this.progress.start();
    try {
      const { items, count } = await this.find({
        skip,
        limit,
        __cancelToken: this.__cancelToken,
      });
      // /
      this.setItems(items, { skip, cache });
      this.count = count;
      this.err = null;
    } catch (err) {
      this.setItems([], { skip, cache });
      this.count = 0;
      this.err = err;
    } finally {
      if (skip < this.skip) this.skip = skip;
      this.fetchedAt = new Date();
      this.loading = false;
      this.__cancelToken = null;
      if (this.progress) this.progress.done();
      if (this.fetchCallback) {
        this.fetchCallback(this);
      }
    }
  }

  async cancelFetch() {
    if (!(this.__cancelToken && this.__cancelToken.cancel)) return;
    this.loading = false;
    if (this.progress) this.progress.done();
    await this.__cancelToken.cancel('fetch canceled');
    await Promise.delay(10);
  }

  canFetchMore(dir = 1) {
    if (dir < 0) return this.skip !== 0;
    return this.count === null || this.count > this.skip + this.items.length;
  }

  async fetchMore(dir, limit = this.limit) {
    let skip = dir < 0 ? this.skip - limit : this.skip + this.items.length;
    if (skip < 0) skip = 0;
    if (this.count !== null && skip > this.count) return;
    await this.fetch({ cache: true, skip, limit });
  }
}
