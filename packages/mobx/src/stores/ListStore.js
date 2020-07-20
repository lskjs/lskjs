import { observable, computed, action } from 'mobx';
import autobind from '@lskjs/utils/autobind';
import each from 'lodash/each';
import debounce from '@lskjs/utils/decorator-debounce';
import filter from 'lodash/filter';
import isEmpty from '@lskjs/utils/isEmpty';
// import isEmpty from 'lodash/isEmpty';
import every from 'lodash/every';
import connectListStore from '../utils/connectListStore';
import SelectStore from './SelectStore';
import FetchStore from './FetchStore';

export default class ListStore extends FetchStore {
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

  constructor(...args) {
    super(...args);
    if (!this.selectStore) this.selectStore = new SelectStore({ listStore: this });
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
