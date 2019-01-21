import set from 'lodash/set';
import isEmpty from 'lodash/isEmpty';
import {
  observable,
  toJS,
  action,
  // computed
} from 'mobx';
import { debounce } from 'lodash-decorators';
// import download from 'downloadjs';
import autobind from 'core-decorators/lib/autobind';

const DEBUG = false; // __DEV__ && __CLIENT__
export default class ListStore {
  @observable list = [];
  @observable count = 0;
  @observable skip = 0;
  @observable loading = false;
  @observable canFetchNext = false;
  @observable select = {};

  timeout = null;

  static model = () => Object;
  constructor(state = {}) {
    if (state) this.setState(state);
  }

  getCsvLink(link) {
    const params = this.getParams();
    link += `?filter=${JSON.stringify(params.filter)}`;
    // ???
    link += `&subfilter=${JSON.stringify(params.subfilter)}`;
    link += `&sort=${JSON.stringify(params.sort)}`;
    link += `&sortBy=${params.sortBy}`;
    return link;
  }

  static wrapModels(list = []) {
    return list.map(a => this.wrapModel(a));
  }

  static wrapModel(obj) {
    return new (this.model())(obj);
  }

  @action
  setList(list = []) {
    this.list = this.constructor.wrapModels(list);
  }

  @action
  async setState(state = {}) {
    const startDate = Date.now();
    this.canFetchNext = true;
    for (const item in state) {
      if (item === 'list') {
        this.setList(state[item]);
        continue;
      }
      if (['skip', 'limit'].includes(item)) {
        this[item] = +(state[item]) || 0;
        continue;
      }
      set(this, item, state[item]);
      if (DEBUG) console.log('setState', item, state[item], `${Date.now() - startDate}ms`);  //eslint-disable-line
    }
    // if (this.onChange) {
    //   if (DEBUG) console.log('onChangeStart', this.getParams(), `${Date.now() - startDate}ms`);  //eslint-disable-line
    //   await this.onChange(this.getParams(), this);
    //   if (DEBUG) console.log('onChangeFinish', `${Date.now() - startDate}ms`);  //eslint-disable-line
    // }
    // if (DEBUG) console.log('updateHeaderHeightStart', `${Date.now() - startDate}ms`);  //eslint-disable-line
    // if (__CLIENT__) {
    //   this.timeout = setTimeout(() => {
    //     this.updateHeaderHeight();
    //     if (DEBUG) console.log('updateHeaderHeightFinish', `${Date.now() - startDate}ms`);  //eslint-disable-line
    //   }, 250);
    // }
  }

  toJS() {
    return toJS(this.list);
  }

  static async getList() {
    throw 'extend getList please';
  }

  static async fetch(...args) {
    // console.log('static async fetch');
    const store = new this();
    await store.fetch(...args);
    return store;
  }

  @action
  fetchNext(limit = this.limit, skip = (this.skip + this.list.length) || 0) {
    __DEV__ && console.log('fetchNext', limit, skip, this);
    return this.fetch({}, limit, skip, true);
  }

  @debounce(500)
  delayFetchNext(...args) {
    console.log('delayFetch', { ...args });
    return this.fetchNext(...args);
  }

  @action
  async fetch(params, limit = this.limit, skip = this.skip, append = false) {
  // async fetch() {
    // // const list = await getData(data);
    // this.loading = true;
    // // console.log('fetch');

    // this.list = await getData(data);
    // // console.log(toJS(this.list));

    // this.loading = false;
    // return true;
    console.log('fetch', { skip, limit, can: this.canFetchNext });
    try {
      let sort;
      if (!isEmpty(params.sort)) {
        const { direction, field } = params.sort;
        sort = {
          [field]: direction === 'asc' ? 1 : -1,
        };
      }

      this.previousOffset = skip;
      const preObjects = await this.constructor.getList({
        limit,
        skip,
        sort,
        filter: params.filter,
        subfilter: params.subfilter,
        select: this.select,
      });
      let objects = Array.isArray(preObjects) ? preObjects : preObjects.data;
      if (Array.isArray(preObjects)) {
        objects = preObjects;
        this.count = 0;
      } else {
        objects = preObjects.data;
        this.count = preObjects.count || 0;
      }
      if (objects.length < limit) {
        console.log({ len: objects.length, limit });

        this.canFetchNext = false;
      }
      const models = this.constructor.wrapModels(objects);
      if (this.list.length > 0 && append) {
        this.list = this.list.concat(models);
      } else {
        this.list = models;
      }
      this.loading = false;
    } catch (err) {
      this.loading = false;
      throw err;
    }
    return true;
  }

  @debounce(500)
  delayFetch(...args) {
    // __DEV__ && console.log('delayFetch', ...args);
    return this.fetch(...args);
  }

  @autobind
  async downloadCsv(params) {
    return this.download({ format: 'csv', ...params });
  }
  @autobind
  async downloadExcel(params) {
    return this.download({ format: 'xlsx', ...params });
  }

  @autobind
  async download(params, ctx) {
    const { baseUrl, method = 'download' } = params;
    if (!baseUrl) throw new Error('Url is not set');
    if (!ctx) throw new Error('Context is not set');
    const url = `${baseUrl}${method}`;
    this.loading = true;
    return ctx.api.fetch(url, {
      method: 'POST',
      body: params,
      parseResult: (async (context, res) => {
        let filename;
        try {
          const header = res.headers.get('content-disposition');
          filename = header.match(/filename=(.+)/)[1];
        } catch (err) {
          console.warn('ListStore download content-disposition not found');  //eslint-disable-line
          filename = new Date().toString();
        }
        context.filename = filename;
        return res.blob();
      }),
      afterFetch: (async ({ res, filename }) => {
        download(res, filename);
        this.loading = false;
      }),
    });
  }
}
