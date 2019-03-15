import {
  observable,
  toJS,
  action,
  // computed,
} from 'mobx';
import map from 'lodash/map';
import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';
import set from 'lodash/set';
import pick from 'lodash/pick';
import intersection from 'lodash/intersection';
// import replaceHistory from '~/utils/replaceHistory2';
import { autobind } from 'core-decorators';

import SelectStore from './SelectStore';
import PageStore from './PageStore';


// if (type === 'create') {
//   res = await Event.api().create(body);
//   this.redirect(`/cabinet/events/${res._id}`);
// } else if (type === 'edit') {
//   res = await Event.api().update(event._id, body);
//   this.redirect(`/cabinet/events/${res._id}`);
// }
export default class ListPageStore extends PageStore {
  @observable listStore = {};
  @observable tab = null;
  @observable filter = {};
  @observable tags = [];
  @observable select = {};
  @observable subfilter = {};
  @observable isOpenFilterBar = false;
  @observable isRestFilterBar = false;
  @observable isOpenFooter = true;
  @observable sort = {
    field: null,
    direction: '',
  };
  @observable search = '';
  @observable page = 1;
  @observable limit = 10;
  @observable skip = 0;

  @observable selectStore ;
  @observable isSelectable = true;

  defaultParams = {}

  constructor(...args) {
    super(...args);
    this.selectStore = new SelectStore();
    if (this.ListStore) {
      this.listStore = new this.ListStore();
    }
  }

  selectAll() {
    const list = this.getList();
    const items = filter(list, (item) => {
      return !this.selectStore.isSelect(item._id);
    });
    this.selectStore.selectAll(map(items, '_id'), items);
    this.selectStore.globalCheck = true;
  }

  unselectAll() {
    this.selectStore.unselectAll();
    this.selectStore.globalCheck = false;
  }

  @autobind
  @action
  toggleSelectAll() {
    if (this.selectStore.globalCheck) {
      this.unselectAll();
    } else {
      this.selectAll();
    }
  }

  checkGlobalSelect() {
    const list = this.getList().map(item => item.id);
    const globalCheck = intersection(list, this.selectStore.ids).length === this.limit;
    if (this.selectStore.globalCheck !== globalCheck) {
      this.selectStore.globalCheck = globalCheck;
    }
  }

  @autobind
  toggleSelect(...args) {
    this.selectStore.toggle(...args);
    this.checkGlobalSelect();
  }

  /**
   * собираются все параметры из поиска фильтра сортировки таба
   */
  getListStoreState() {
    const params = pick(toJS(this), ['filter', 'limit', 'sort', 'select', 'subfilter']);
    params.subfilter = {
      ...params.subfilter,
      _tab: this.tab,
    };
    params.skip = this.getSkip();
    params.filter._search = this.search;
    // this.tab, sort, filter, search
    // console.log('getListStoreState', { params, page: this.page });

    return params;
  }

  getList() {
    // смотря какая страница
    const list = this.listStore.list || [];
    // return list.slice(list.length - this.limit, list.length);
    // console.log({ skip: this.getSkip() });
    // const listTo = (this.getSkip() + this.limit) - this.listStore.skip;
    // const listFrom = listTo - this.limit;
    const { from, to } = this.getFromTo();
    // console.log({ listTo, listFrom });
    return list.slice(from, to);
  }

  updateList() {
    // console.log('updateList', { params });
    const params = this.getListStoreState();
    this.listStore
      .setState(params)
      .fetch();
    this.onChange();
  }

  getSkip() {
    this.page;
    this.limit;
    if (this.page <= 1) return 0;
    return this.limit * (this.page - 1);
  }

  @autobind
  nextPage() {
    // let skip = this.skip + this.limit;
    this.page += 1;
    // if (skip < this.listStore.count) skip = this.listStore.count - this.limit;
    this.updateList();
    this.onChange();
    this.checkGlobalSelect();
  }

  getFromTo() {
    const skip = this.getSkip();
    const to = (skip + this.limit) - this.listStore.skip;
    const from = to - this.limit;
    return {
      from,
      to,
    };
  }

  canNextPage() {
    return this.getSkip() + this.limit < this.listStore.count;
  }

  @autobind
  prevPage() {
    this.page -= 1;
    if (this.page <= 1) {
      this.page = 1;
    }
    this.updateList();
    this.onChange();
    this.checkGlobalSelect();
  }

  canPrevPage() {
    return this.page > 1;
  }

  changeTab(tab) {
    this.tab = tab;
    this.page = 1;
    this.updateList();
    this.onChange();
  }

  prepareFilterValues(values) {
    const prepared = {};
    forEach(values, (value, field) => {
      if (!isEmpty(value)) {
        prepared[field] = value;
      }
    });
    return prepared;
  }

  @action
  handleChangeFilter(values) {
    // console.log('handleChangeFilter', { values });
    this.filter = this.prepareFilterValues(values);
    this.updateList();
    this.onChange();
  }

  @action
  handleChangeSearch(value) {
    this.search = value;
    this.updateList();
    this.onChange();
  }

  @action
  handleChangeLimit(value) {
    this.limit = value;
    this.updateList();
    this.onChange();
  }

  @action
  toggleSort(field) {
    if (this.sort.field === field && this.sort.direction === 'asc') {
      this.sort.direction = 'desc';
    } else {
      this.sort.direction = 'asc';
    }
    this.sort.field = field;
    this.updateList();
  }

  @action
  toggleFilterBar(isOpen) {
    clearTimeout(this.timeoutId);
    this.isOpenFilterBar = !this.isOpenFilterBar;
    this.toggleRestFilterBar(false, isOpen);
  }

  toggleRestFilterBar(isRest, isOpenFilterBar) {
    if (isOpenFilterBar) this.isRestFilterBar = isRest; // Закрытие фильтра
    else {
      this.timeoutId = setTimeout(() => { // Открытие фильтра
        this.isRestFilterBar = isRest;
      }, 1000);
    }
  }

  @action
  resetTags() {
    this.filter = {};
    this.search = '';
    this.updateList();
  }

  // getFilterTags() {
  //   return [];
  // }

  // @action
  // updateTags() {
  //   const tags = this.getFilterTags();
  //   // console.log({ tags });
  //   if (this.search) {
  //     tags.push({
  //       field: 'search',
  //       title: this.search,
  //     });
  //   }
  //   this.tags = tags;
  // }

  @action
  removeTag(index) {
    // const tag = this.tags[index];
    // if (tag.field === 'search') {
    //   this.search = '';
    // } else {
    //   this.resetFilterFields(tag);
    // }
    // console.log({ index });
    this.filter[index] = null;
    this.updateStore({});
  }

  resetFilterFields(tag) {
    set(this.filter, tag.field, null);
  }

  getQueryParams() {
    const params = pick(toJS(this), ['filter', 'limit', 'sort', 'search', 'tab', 'subfilter', 'page']);
    // params.skip = this.getSkip();
    // replaceHistory({ uapp, store });
    return params;
  }

  onChange() {}
  updateStore({ updateList = true }) {
    // console.log({ updateList, updateTags });

    updateList && this.updateList();
    // updateTags && this.updateTags();
    this.onChange();
  }
}
