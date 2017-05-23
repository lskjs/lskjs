import set from 'lodash/set';
import { observable, toJS } from 'mobx';

export default ctx => class List {

  @observable list = [];
  @observable previousOffset = 0;
  @observable filter = {};
  @observable loading = false;

  static model = () => Object;
  constructor(state = {}) {
    if (state) this.setState(state);
  }

  static wrapModels(list = []) {
    return list.map(obj => new (this.model())(obj));
  }

  setList(list = []) {
    this.list = this.constructor.wrapModels(list);
  }

  setState(state = {}) {
    for (const item in state) {
      if (item === 'list') {
        this.setList(state[item]);
        continue;
      }
      set(this, item, state[item]);
    }
  }

  toJS() {
    return toJS(this.list);
  }

  static async getList(qs) {
    throw 'extend getList please';
  }

  static async fetch(...args) {
    const store = new this();
    await store.fetch(...args);
    return store;
  }

  setFilter(filter) {
    this.filter = filter;
    return this;
  }

  fetchNext(limit = 20, offset = this.list.length) {
    return this.fetch(limit, offset, true);
  }

  async fetch(limit = 20, offset = 0, append = false) {
    if (offset !== 0 && this.previousOffset === offset) {
      // ctx.log.info(' with current offset already loaded');
      return false;
    }
    this.loading = true;
    this.previousOffset = offset;
    const objects = await this.constructor.getList({
      limit,
      offset,
      // sort: this.sortField,
      // order: this.sortOrder,
      filter: this.filter,
    });
    const models = this.constructor.wrapModels(objects);
    // console.log('objects');
    if (this.list.length > 0 && append) {
      this.list = this.list.concat(models);
    } else {
      this.list = models;
    }
    this.loading = false;
    return true;
  }

}
