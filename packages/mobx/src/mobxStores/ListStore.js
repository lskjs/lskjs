import autobind from '@lskjs/utils/autobind';
import debounce from '@lskjs/utils/decorator-debounce';
import isEmpty from '@lskjs/utils/isEmpty';
import each from 'lodash/each';
import every from 'lodash/every';
import filter from 'lodash/filter';
import { action, computed, observable } from 'mobx';

import { connectListStore } from '../utils/connectListStore';
import { FetchStore } from './FetchStore';
import { SelectStore } from './SelectStore';

// TODO: переписать на не MOBX
export class ListStore extends FetchStore {
  static connect = connectListStore;
  @observable filter = {};
  @observable fallbackFilter = {};
  @observable excludeFilterFields = [];
  @observable showFilter = false;
  @observable tab = null;
  @observable sort = {};
  @observable fallbackSort = {};
  @observable pureSearch = false;
  @observable searchFromLength = 0;
  @observable search = '';

  // NOTE: увы, мы вынуждены повторять этот конструктор, из-за цепочки наследования Babel
  constructor(state = {}) {
    super();
    if (state) this.setState(state);
    if (!this.selectStore) this.selectStore = new SelectStore({ listStore: this }); // NOTE: единсвенная новая строчка
  }

  getState() {
    return {
      skip: this.skip,
      limit: this.limit,
      filter: this.filter,
      showFilter: this.showFilter,
      tab: this.tab,
      sort: this.sort,
      search: this.search,
    };
  }

  @action
  async setStateAndUpdate(...args) {
    let state;
    if (this.updated) {
      state = this.getState();
    }
    super.setState(...args);
    await this.update();
    if (this.updated) this.updated(state, this.getState());
    return this;
  }

  // TODO: переписать на норм subscribe модель
  updated = () => {};
  subscribe(callback) {
    this.updated = callback;
    return () => {
      this.updated = null;
    };
  }

  @debounce(100)
  async update() {
    await this.fetch();
  }

  /**
   * Getters and map
   */
  @computed
  get hasFilter() {
    return !every(Object.values(this.filter), (a) => isEmpty(a)) || !isEmpty(this.search);
  }

  @computed
  get filterUi() {
    const obj = {};
    each(this.filter, (value, key) => {
      if (this.excludeFilterFields.includes(key)) return;
      obj[key] = value;
    });
    return obj;
  }

  @computed
  get getActiveFilter() {
    return filter(this.filterUi, (a) => !isEmpty(a)).length;
  }

  @computed
  get emptyType() {
    if (!this.loading) return null;
    if (this.items.length > 0) return null;

    if ((!this.search || this.search === '') && !!this.paywall && !!this.paywall.tarifUnfit) {
      // 5) тариф не соответствует
      return 5;
    }
    if (!this.fetchedAt) {
      // 1) совсем пусто, первый раз заходим
      return 1;
    }
    if ((this.fetchedAt || this.skip) && this.items.length > 0) {
      return 6;
    }
    if (!this.hasFilter) {
      // 2) пусто после фетча, фильры выключены
      return 2;
    }
    if (!this.skip) {
      // 3) пусто после фетча, фильтры включены, скип не стоит
      return 3;
    }
    // 4) пусто после фетча, фильтры включены, скип стоит */}
    return 4;
  }

  canBlur(limit) {
    if (limit) {
      return !this.emptyType && this.items.length > limit;
    }
    return !this.emptyType;
  }

  map(...args) {
    return this.items.map(...args);
  }

  /**
   * Pages
   */

  getCurrentPage() {
    return Math.floor(this.skip / this.limit) + 1;
  }
  // from 1
  // null если count === null
  getTotalPages() {
    if (this.count === null) return null;
    return Math.floor(this.count / this.limit) + 1;
  }
  /**
   * @param {Number} page - page from 1
   */
  @autobind
  setPage(page) {
    this.setStateAndUpdate({
      skip: Math.floor((page - 1) * this.limit),
    });
  }

  /**
   * Handlers
   */

  @autobind
  setTab(tab) {
    this.setStateAndUpdate({
      tab,
      skip: 0,
    });
  }

  @autobind
  setLimit(limit) {
    this.setStateAndUpdate({
      limit,
    });
  }

  @autobind
  setFilter(values) {
    this.setStateAndUpdate({
      filter: values,
      skip: 0,
    });
  }

  @autobind
  toggleFilter() {
    this.setState({
      showFilter: !this.showFilter,
    });
  }

  pureSearchHandler(search) {
    if (this.pureSearch) {
      if (!this.search && search) {
        return {
          fallbackFilter: this.filter,
          fallbackSort: this.sort,
          filter: {},
          sort: {},
        };
      }
      if (this.search && !search) {
        return {
          filter: this.fallbackFilter,
          sort: this.fallbackSort,
          fallbackFilter: {},
          fallbackSort: {},
        };
      }
      return {};
    }
    return {};
  }

  @debounce(500)
  setSearch(search) {
    if (!search || (search && search.length >= this.searchFromLength)) {
      const pureState = this.pureSearchHandler(search);
      this.setStateAndUpdate({
        search,
        skip: 0,
        ...pureState,
      });
    }
  }

  @autobind
  handleChangeLimit(limit) {
    this.setStateAndUpdate({
      limit,
    });
  }

  @autobind
  clearFilter() {
    this.setStateAndUpdate({
      filter: {},
      search: '',
      skip: 0,
    });
  }
  /**
   * Пока выбирается только одно поле
   * Первый клик - равен -1, те сортирвка по возрастанию (возможно нужно вторым аргументов задавать)
   * @param {String} field - поле для которого инверсируют сортировку
   */
  @autobind
  toggleSort(field) {
    // пока только одна сортировка
    const value = this.sort && this.sort[field];
    this.setStateAndUpdate({
      sort: {
        [field]: value === -1 ? 1 : -1,
      },
      skip: 0,
    });
  }
}

export default ListStore;
