import { observable, computed, action } from 'mobx';
import debounce from 'lodash-decorators/debounce';
import isEmpty from 'lodash/isEmpty';
import every from 'lodash/every';
import SelectStore from './SelectStore';
import FetchStore from './FetchStore';
import connectListStore from '../utils/connectListStore';

export default class ListStore extends FetchStore {
  static connect = connectListStore;
  @observable filter = {};
  @observable showFilter = false;
  @observable tab = null;
  @observable sort = {};
  @observable search = '';

  constructor(...args) {
    super(...args);
    if (!this.selectStore) this.selectStore = new SelectStore({ listStore: this });
  }

  @action
  setStateAndUpdate(...args) {
    super.setState(...args);
    this.update();
    return this;
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
    return !every(Object.values(this.filter), a => isEmpty(a)) || !isEmpty(this.search);
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
  setPage = (page) => {
    this.setStateAndUpdate({
      skip: Math.floor((page - 1) * this.limit),
    });
  }

  /**
   * Handlers
   */

  setTab = (tab) => {
    this.setStateAndUpdate({
      tab,
      skip: 0,
    });
  }

  setLimit = (limit) => {
    this.setStateAndUpdate({
      limit,
    });
  }

  setFilter = (values) => {
    this.setStateAndUpdate({
      filter: values,
      skip: 0,
    });
  }

  toggleFilter = () => {
    this.setState({
      showFilter: !this.showFilter,
    });
  }

  setSearch = (search) => {
    this.setStateAndUpdate({
      search,
      skip: 0,
    });
  }

  handleChangeLimit = (limit) => {
    this.setStateAndUpdate({
      limit,
    });
  }

  clearFilter = () => {
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
  toggleSort = (field) => {
    // пока только одна сортировка
    const value = this.sort && this.sort[field];
    this.setStateAndUpdate({
      sort: {
        [field]: value === 1 ? -1 : 1,
      },
      skip: 0,
    });
  }
}
