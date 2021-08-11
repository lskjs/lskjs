import Err from '@lskjs/err';
import omitEmpty from '@lskjs/utils/omitEmpty';
import axios from 'axios';
import Bluebird from 'bluebird';
import { action, observable } from 'mobx';

import { getFindParams } from './FetchStore';
import Store from './Store';

const { CancelToken } = axios;

export default class EntityStore extends Store {
  @observable item = null;
  @observable loading = false;
  @observable fetchedAt = null;
  @observable filter = {};
  __cancelToken = null;

  async findOne({ __cancelToken } = {}) {
    if (!this.api) throw new Err('!api');
    if (!this.api.find) throw new Err('!api.find');
    let params = getFindParams(this);
    if (this.getFindParams) params = this.getFindParams(this, params);
    const raw = await this.api.findOne({
      ...omitEmpty(params),
      __cancelToken,
    });

    return {
      item: raw,
    };
  }

  @action
  async fetch() {
    if (this.loading) await this.cancelFetch();
    this.loading = true;
    this.__cancelToken = CancelToken.source();
    if (this.progress) this.progress.start();
    try {
      const { item } = await this.findOne({
        __cancelToken: this.__cancelToken,
      });

      this.item = item;
      this.fetchedAt = new Date();
    } finally {
      this.loading = false;
      this.__cancelToken = null;
      if (this.progress) this.progress.done();
    }
  }

  async cancelFetch() {
    if (!(this.__cancelToken && this.__cancelToken.cancel)) return;
    this.loading = false;
    if (this.progress) this.progress.done();
    await this.__cancelToken.cancel('fetch canceled');
    await Bluebird.delay(10);
  }
}
