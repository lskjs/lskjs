import set from 'lodash/set';
import { observable, toJS, action, computed } from 'mobx';
import { debounce } from 'lodash-decorators';
import pick from 'lodash/pick';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
// import download from 'downloadjs';
import autobind from 'core-decorators/lib/autobind';
import Store from './Store';

const DEBUG = false; // __DEV__ && __CLIENT__
export default class ListStore { //  extends Store
  @observable list = [];
  @observable count = 0;
  // @observable previousOffset = 0;
  @observable subfilter = {}; // ???
  @observable filter = {};
  @observable select = {};
  @observable limit = 20;
  @observable skip = 0;
  @observable sort = {};
  @observable loading = false;
  @observable canFetchNext = false;
  @observable headerHeight = 48;
  @observable headerInstance = null;

  timeout = null;

  // isuvorov didnt like
  @observable sortBy = null; // -info.updatedAt
  getSortBy() {
    const { sortBy } = this;
    // console.log('getSortBy', sortBy);
    if (!sortBy) return {};
    // console.log('sortBy[0]', sortBy[0]);
    const direction = sortBy[0] === '-' ? 'desc' : 'asc';
    const field = ['+', '-'].includes(sortBy[0]) ? sortBy.substr(1) : sortBy;
    // console.log('getSortBy', direction, field,);
    return {
      direction,
      field,
    };
  }
  getSortDirection(sortField) {
    const {
      direction,
      field,
    } = this.getSortBy();
    if (sortField === field) return direction;
    return null;
  }


  isSort(sortField, sortDirection) {
    const { direction, field } = this.getSortBy();
    if (!sortDirection) return field === this.sortField;
    return field === sortField && direction === sortDirection;
  }

  setSort(sortField, sortDirection) {
    this.sortBy = (sortDirection === 'desc' ? '-' : '') + sortField; // ???
  }

  toggleSort(sortField) {
    const {
      direction,
      field,
    } = this.getSortBy();
    // console.log('toggleSort', sortField, direction, field);
    if (field && field === sortField) {
      this.setSort(field, direction === 'asc' ? 'desc' : 'asc');
    } else {
      this.setSort(sortField, 'asc');
    }
    this.onChange && this.onChange(this.getParams(), this);
  }

  static model = () => Object;
  constructor(state = {}) {
    if (state) this.setState(state);
  }

  @computed
  get hasFilter() {
    return !(!this.filter || isEmpty(this.filter));
  }

  resetFilter() {
    this.setState({
      filter: {},
    });
  }

  isPristine() {
    return false;
  }

  @action
  setParams(params) {
    ['subfilter', 'filter', 'limit', 'skip', 'sort', 'sortBy', 'select'].forEach((key) => {
      this[key] = params[key];
    });
  }

  getCsvLink(link) {
    const params = this.getParams();
    link += `?filter=${JSON.stringify(params.filter)}`;
    link += `&subfilter=${JSON.stringify(params.subfilter)}`;
    link += `&sort=${JSON.stringify(params.sort)}`;
    link += `&sortBy=${params.sortBy}`;
    return link;
  }

  getParams() {
    const params = pick(toJS(this), ['subfilter', 'filter', 'limit', 'skip', 'sort', 'sortBy']);
    // console.log({params});
    return params;
  }

  getQueryParams() {
    const params = pick(toJS(this), ['subfilter', 'filter', 'limit', 'skip', 'sort', 'sortBy']);
    // console.log({params});
    return params;
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
    if (__CLIENT__) {
      clearTimeout(this.timeout);
    }
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
    if (this.onChange) {
      if (DEBUG) console.log('onChangeStart', this.getParams(), `${Date.now() - startDate}ms`);  //eslint-disable-line
      await this.onChange(this.getParams(), this);
      if (DEBUG) console.log('onChangeFinish', `${Date.now() - startDate}ms`);  //eslint-disable-line
    }
    if (DEBUG) console.log('updateHeaderHeightStart', `${Date.now() - startDate}ms`);  //eslint-disable-line
    if (__CLIENT__) {
      this.timeout = setTimeout(() => {
        this.updateHeaderHeight();
        if (DEBUG) console.log('updateHeaderHeightFinish', `${Date.now() - startDate}ms`);  //eslint-disable-line
      }, 250);
    }
  }

  toJS() {
    return toJS(this.list);
  }

  static async getList() {
    throw 'extend getList please';
  }

  static async fetch(...args) {
    const store = new this();
    await store.fetch(...args);
    return store;
  }

  @action
  setFilter(filter) {
    this.filter = filter;
    return this;
  }

  @action
  setFilterField(key, value) {
    this.setState({
      filter: {
        ...this.filter,
        [key]: value,
      },
    });
  }
  @action
  clearFilterField(key) {
    this.setState({
      filter: omit(this.filter, [key]),
    });
  }

  // initHeaderInstance(instance) {
  //   this.headerInstance = instance;
  //   // console.log('initHeaderInstance', instance);
  //   this.updateHeaderHeight();
  // }

  updateHeaderHeight() {
    // if (this.headerInstance) {
    // console.log('updateHeaderHeight', this.getInstanceHeaderHeight());
    this.headerHeight = this.getInstanceHeaderHeight();
    setTimeout(() => {
      this.headerHeight = this.getInstanceHeaderHeight();
    }, 300);
    // } else {
    // DEBUG && console.log('!this.headerInstance');
    // }
  }

  getInstanceHeaderHeight() {
    if (__CLIENT__) {
      const instance = document.getElementById('VWF');
      return instance?.offsetHeight || instance?.clientHeight;
    }
    return 'auto';
  }

  @action
  fetchNext(limit = this.limit, skip = (this.skip + this.list.length) || 0) {
    // __DEV__ && console.log('fetchNext', limit, skip, this);
    return this.fetch(limit, skip, true);
  }

  @debounce(500)
  delayFetchNext(...args) {
    // console.log('delayFetch');
    return this.fetchNext(...args);
  }

  @action
  async fetch(limit = this.limit, skip = this.skip, append = false) {
    if (__CLIENT__) {
      clearTimeout(this.timeout);
    }
    // console.log('fetch', limit);
    // if (skip !== 0 && this.canFetchNext) {
    //   // ctx.log.info(' with current skip already loaded');
    //   return false;
    // }
    this.loading = true;
    try {
      let { sort } = this;
      // const sortBy = this.sortBy;
      if (this.sortBy && isEmpty(sort)) {
        const { direction, field } = this.getSortBy();
        // console.log('fetch sortBy', direction, field);
        sort = {
          [field]: direction === 'asc' ? 1 : -1,
        };
      }

      this.previousOffset = skip;
      // const filter = {
      //   // ...(this.subfilter || {}),
      //   ...(this.filter || {}),
      // };
      // console.log('skip', skip);
      const preObjects = await this.constructor.getList({
        limit,
        skip,
        sort,
        select: this.select,
        // order: this.sortOrder,
        filter: this.filter,
        subfilter: this.subfilter,
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
    if (__CLIENT__) {
      this.timeout = setTimeout(() => { this.updateHeaderHeight(); }, 250);
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
