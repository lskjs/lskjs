import { observable, toJS, action } from 'mobx';
// import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
// import { debounce } from 'lodash-decorators';
import debounce from 'lodash-decorators/debounce';
import Store from '@lskjs/mobx/stores/Store';


class GridTableStore extends Store {
  @observable gap;
  @observable headerHeight;
  @observable itemHeight;
  @observable columns = [];
  // @observable width;
  columnsFn;
  sizes = {
    sm: 768,
    md: 992,
    lg: 1200,
  }
  displaySize;


  constructor(props) {
    const { columns, ...otherProps } = props;
    super(otherProps);
    if (isFunction(columns)) {
      this.columnsFn = columns;
    }
    this.columns = this.normalize(columns);

    // console.log('this.columns', this.columns, toJS(this.columns));
    // console.log('this.columns@@@', this.columns[0].width);
  }

  getWindowWidth() {
    return window.innerWidth
    || document.documentElement.offsetWidth
    || document.documentElement.clientWidth
    || document.body.offsetWidth
    || document.body.clientWidth;
  }

  @debounce(10)
  @action
  handleWindowWidthChange() {
    const width = this.getWindowWidth();
    // const newColumns = this.columnsFn({ width });
    // if (!isEqual(newColumns, toJS(this.columns))) {
    //   // console.log({ newColumns, old: toJS(this.columns) });
    //   this.columns = newColumns;
    // }
    if (width < this.sizes.sm && this.displaySize !== 'xs') {
      this.displaySize = 'xs';
      this.columns = this.columnsFn({ width });
      // console.log({ width });
    }
    if (width >= this.sizes.sm && width < this.sizes.md && this.displaySize !== 'sm') {
      this.displaySize = 'sm';
      this.columns = this.columnsFn({ width });
      // console.log({ width });
    }
    if (width >= this.sizes.md && width < this.sizes.lg && this.displaySize !== 'md') {
      this.displaySize = 'md';
      this.columns = this.columnsFn({ width });
      // console.log({ width });
    }
    if (width >= this.sizes.lg && this.displaySize !== 'lg') {
      this.displaySize = 'lg';
      this.columns = this.columnsFn({ width });
      // console.log({ width });
    }
  }

  addListener() {
    if (this.columnsFn) window.addEventListener('resize', this.handleWindowWidthChange.bind(this));
  }

  removeListener() {
    if (this.columnsFn) window.removeEventListener('resize', this.handleWindowWidthChange.bind(this));
  }


  normalize(columnsOrFn) {
    let columns = columnsOrFn;
    if (this.columnsFn) {
      columns = this.columnsFn({ width: this.getWindowWidth(), height: 800 });
    }
    // return columns.filter(c => (c.show === true || c.hide === false)).map((column) => {
    const normalizedColumns = columns.map((column, index) => {
      if (typeof column !== 'string') {
        return {
          ...column,
          index,
        };
      }
      return {
        width: column,
        style: {},
        className: null,
        index,
      };
    });
    return normalizedColumns;
  }

  isVisibleColumn(columnIndex) {
    return this.columns[columnIndex] && this.columns[columnIndex].show !== false;
  }

  getColumn(columnIndex) {
    return this.columns[columnIndex];
  }

  getColumnProp(columnIndex, prop) {
    return this.columns[columnIndex] && this.columns[columnIndex][prop];
  }

  getColumnsWidth() {
    return toJS(this.columns)
      .filter(c => (c.show !== false))
      .map(c => c.width);
  }
}

export default GridTableStore;
