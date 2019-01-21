import {
  observable,
  toJS,
  action,
  computed,
} from 'mobx';
import map from 'lodash/map';
import filter from 'lodash/filter';
import set from 'lodash/set';
import pick from 'lodash/pick';

import SelectStore from './SelectStore';
import PageStore from './PageStore';

export default class ListPageStore extends PageStore {
  @observable listStore = {};
  @observable tab = null;
  @observable filter = {};
  @observable tags = [];
  @observable select = {};
  @observable isOpenFilterBar = false;
  @observable sort = {
    field: null,
    direction: '',
  };
  @observable search = '';
  @observable page = 1;
  @observable limit = 10;

  @observable selectStore ;
  @observable isSelectable = true;

  defaultParams = {}
  paginationLimits = [10, 20, 50];

  constructor(...args) {
    super(...args);
    this.selectStore = new SelectStore();
    if (this.ListStore) {
      this.listStore = new this.ListStore();
    }
  }

  @action
  setFieldValue(field, value) {
    this[field] = value;
    this.updateStore({});
  }

  selectAll() {
    const items = filter(this.list, (item) => {
      return !this.selectStore.isSelect(item._id);
    });
    this.selectStore.selectAll(map(this.list, '_id'), items);
    this.selectStore.globalCheck = !this.selectStore.globalCheck;
  }
  unselectAll() {
    this.selectStore.unselectAll();
    this.selectStore.globalCheck = false;
  }

  // @action
  // setParams(query) {
  //   const queryParams = getParamsFromQuery(query);
  //   console.log({ def: this.defaultParams, queryParams });

  //   if (!this.tab) this.tab = this.defaultParams.tab;
  //   this.filter = this.defaultParams.filter;
  //   if (!this.sort) this.sort = this.defaultParams.sort;
  //   // this.sort
  //   this.updateStore({
  //     // updateQuery: false,
  //   });
  // }

  getListParams() {
    const params = pick(toJS(this), ['filter', 'limit', 'skip', 'sort', 'select']);
    params.subfilter = {
      _tab: this.tab,
    };
    params.filter._search = this.search;
    // this.tab, sort, filter, search
    return params;
  }

  @computed
  get list() {
    // смотря какая страница
    return toJS(this.listStore.list) || [];
  }

  getList() {
    // смотря какая страница
    const list = toJS(this.listStore.list) || [];
    return list.slice(list.length - this.limit, list.length);
  }

  changeTab(tab) {
    this.tab = tab;
    this.updateStore({});
    // this.unselectAll(); ??
  }
  @computed
  get filterIsActive() {
    return Object.keys(this.filter).length > 0;
  }
  @action
  handleChangeFilter(values) {
    this.filter = values;
    this.updateStore({});
  }
  @action
  handleChangeSearch(value) {
    this.search = value;
    this.updateStore({});
  }
  @action
  handleChangeLimit(value) {
    this.limit = value;
    this.updateStore({
      // updateList: false,
      updateTags: false,
    });
  }
  @action
  toggleSort(field) {
    if (this.sort.field === field && this.sort.direction === 'asc') {
      this.sort.direction = 'desc';
    } else {
      this.sort.direction = 'asc';
    }
    this.sort.field = field;
    this.updateStore({ updateTags: false });
  }
  @action
  resetTags() {
    this.filter = {};
    this.search = '';
    this.updateStore({});
  }

  getFilterTags() {
    return [];
  }

  @action
  updateTags() {
    const tags = this.getFilterTags();
    // console.log({ tags });
    if (this.search) {
      tags.push({
        field: 'search',
        title: this.search,
      });
    }
    this.tags = tags;
  }

  @action
  removeTag(index) {
    const tag = this.tags[index];
    if (tag.field === 'search') {
      this.search = '';
    } else {
      this.resetFilterFields(tag);
    }
    this.updateStore({});
  }
  resetFilterFields(tag) {
    set(this.filter, tag.field, null);
  }
  updateList() {
    // собираются все параметры из поиска фильтра сортировки таба
    const params = this.getListParams();
    this.listStore.setState(params);
    return this.listStore.fetch(params);
  }
  @computed
  get visibleRows() {
    const from = '12';
    const to = '20';
    return `${from}-${to}`;
  }
  getNext() {

  }
  getPrevious() {

  }
  getQueryParams() {
    const params = pick(toJS(this), ['filter', 'limit', 'skip', 'sort', 'search', 'tab']);
    // replaceHistory({ uapp, store });
    return params;
  }
  onChange() {}
  updateStore({ updateList = true, updateTags = true }) {
    // console.log({ updateList, updateTags });

    updateList && this.updateList();
    updateTags && this.updateTags();
    this.onChange();
  }
}
