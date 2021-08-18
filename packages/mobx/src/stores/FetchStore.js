import Err from '@lskjs/err';
import insertArray from '@lskjs/utils/insertArray';
import omitEmpty from '@lskjs/utils/omitEmpty';
import axios from 'axios';
import Bluebird from 'bluebird';
import set from 'lodash/set';

import { getFindParams } from '../utils/getFindParams';
import { Store } from './Store';

const { CancelToken } = axios;

export class FetchStore extends Store {
  items = [];
  count = null;
  skip = 0;
  limit = 10;
  loading = false;
  fetchedAt = null;
  select = {};
  err = {};
  fetchCallback;
  __cancelToken = null;

  // NOTE: увы, мы вынуждены повторять этот конструктор, из-за цепочки наследования Babel
  constructor(state = {}) {
    super();
    if (state) this.setState(state);
  }

  setStateField(item, value) {
    if (['skip', 'limit'].includes(item)) {
      set(this, item, +value || 0);
    } else {
      super.setStateField(item, value);
    }
  }

  async find({ skip, limit, __cancelToken } = {}) {
    if (!this.api) throw new Err('!api');
    if (!this.api.find) throw new Err('!api.find');
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

  setItems(items, { skip, cache } = {}) {
    if (cache) {
      this.items = insertArray(this.items, items, skip - this.skip);
    } else {
      this.items = items;
    }
  }

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
    await Bluebird.delay(10);
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

export default FetchStore;
