import React, { Component } from 'react';
import { Provider as MobxProvider } from 'mobx-react';
import mapValues from 'lodash/mapValues';
import Search from '../UI/molecules/Search';
import ListStore from '../stores/ListStore';
import Button from '../Button';
import { Table } from '../Table';
import DEV from '../DEV';
import {
  Wrapper,
  BodyWrapper,
  ItemsWrapper,
  FilterWrapper,
  TagsPanelWrapper,
  HeaderItemWrapper,
  HeaderWrapper,
  FooterWrapper,
  PaginatorWrapper,
  PagesWrapper,
  StepperWrapper,
  SelectWrapper,
} from './List.styles';
import { Provider } from './List.context';

import ListSticky from './ListSticky';
import ListHeader from './ListHeader';
import ListSearch from './ListSearch';
import ListFilter from './ListFilter';
import ListTagsPanel from './ListTagsPanel';
import ListBody from './ListBody';
import ListItems from './ListItems';
import ListHeaderRow from './ListHeaderRow';
import ListFooter from './ListFooter';
import ListFilterButton from './ListFilterButton';
import ListEmpty from './ListEmpty';
import ListSortHeader from './ListSortHeader';
import ListCheckbox from './ListCheckbox';
import ListPaginator from './ListPaginator';


import DefaultTags from './DefaultTags';
import DefaultTag from './DefaultTag';

const defaultShow = {
  header: true,
  /** */ sticky: true,
  /** */ search: true,
  /** */ /** */ filterButton: true,
  /** */ tags: true,

  /** body */
  /** */ more: true,
  /** */ infinity: true,

  footer: true,
  /** */ download: true,
  /** */ pages: true,
  /** */ stepper: true,
  /** */ paginator: true,
};

class List extends Component {
  static Tag = DefaultTag;
  static Tags = DefaultTags;
  static Sticky = ListSticky;
  static Header = ListHeader;
  static Search = ListSearch;
  static Filter = ListFilter;
  static TagsPanel = ListTagsPanel;
  static Body = ListBody;
  static Items = ListItems;
  static HeaderRow = ListHeaderRow;
  static Footer = ListFooter;
  static Paginator = ListPaginator;
  static FilterButton = ListFilterButton;
  static Empty = ListEmpty;
  static SortHeader = ListSortHeader;
  static Checkbox = ListCheckbox;

  static Button = Button;
  static SearchWrapper = Search;
  // static DownloadButton = ({ children }) => children;

  static Wrapper = Wrapper;
  static BodyWrapper = BodyWrapper;
  static ItemsWrapper = ItemsWrapper;
  static FilterWrapper = FilterWrapper;
  static TagsPanelWrapper = TagsPanelWrapper;
  static HeaderItemWrapper = HeaderItemWrapper;
  static HeaderWrapper = HeaderWrapper;
  static FooterWrapper = FooterWrapper;
  // download

  static PagesWrapper = PagesWrapper; // pages
  static StepperWrapper = StepperWrapper; // stepper
  static SelectWrapper = SelectWrapper;
  static PaginatorWrapper = PaginatorWrapper;

  render() {
    const {
      debug, columns, show: customShow = {}, pageSize = 10, paginatorProps = {},
      Item, FilterForm, HeaderItem, Tags = this.constructor.Tags, Tag = this.constructor.Tag,
    } = this.props;

    let { listStore } = this.props;

    if (!listStore) {
      if (__DEV__) return <DEV json="!listStore" />;
      listStore = new ListStore();
    }

    const { selectStore } = listStore;

    const show = mapValues({
      ...defaultShow,
      ...customShow,
    }, Boolean);

    const List = {  //eslint-disable-line
      Sticky: this.props.Sticky || this.constructor.Sticky,
      Header: this.props.Header || this.constructor.Header,
      Search: this.props.Search || this.constructor.Search,
      Filter: this.props.Filter || this.constructor.Filter,
      TagsPanel: this.props.TagsPanel || this.constructor.TagsPanel,
      Body: this.props.Body || this.constructor.Body,
      Items: this.props.Items || this.constructor.Items,
      HeaderRow: this.props.HeaderRow || this.constructor.HeaderRow, // !!!!!!!!!
      Footer: this.props.Footer || this.constructor.Footer,
      Paginator: this.props.Paginator || this.constructor.Paginator,
      FilterButton: this.props.FilterButton || this.constructor.FilterButton,
      Empty: this.props.Empty || this.constructor.Empty,
      SortHeader: this.props.SortHeader || this.constructor.SortHeader,
      Checkbox: this.props.Checkbox || this.constructor.Checkbox,

      Button: this.props.Button || this.constructor.Button,
      SearchWrapper: this.props.SearchWrapper || this.constructor.SearchWrapper,

      Wrapper: this.props.Wrapper || this.constructor.Wrapper,
      BodyWrapper: this.props.BodyWrapper || this.constructor.BodyWrapper,
      ItemsWrapper: this.props.ItemsWrapper || this.constructor.ItemsWrapper,
      FilterWrapper: this.props.FilterWrapper || this.constructor.FilterWrapper,
      TagsPanelWrapper: this.props.TagsPanelWrapper || this.constructor.TagsPanelWrapper,
      HeaderItemWrapper: this.props.HeaderItemWrapper || this.constructor.HeaderItemWrapper,
      HeaderWrapper: this.props.HeaderWrapper || this.constructor.HeaderWrapper,
      FooterWrapper: this.props.FooterWrapper || this.constructor.FooterWrapper,

      PaginatorWrapper: this.props.PaginatorWrapper || this.constructor.PaginatorWrapper,
      PagesWrapper: this.props.PagesWrapper || this.constructor.PagesWrapper,
      StepperWrapper: this.props.StepperWrapper || this.constructor.StepperWrapper,
      SelectWrapper: this.props.SelectWrapper || this.constructor.SelectWrapper,
    };

    let { children } = this.props;

    if (!children) {
      children = (
        <React.Fragment>
          {show.header && <List.Header />}
          <List.Body />
          {show.footer && <List.Footer />}
        </React.Fragment>
      );
    }

    if (columns) {
      children = (
        <Table
          columns={columns}
        >
          {children}
        </Table>
      );
    }
    children = (
      // shadow={shadow}
      <List.Wrapper style={{ width: '100%' }}>
        {children}
      </List.Wrapper>
    );
    return (
      <Provider
        value={{
          List,
          show,
          pageSize,
          Item,
          FilterForm,
          Tags,
          Tag,
          HeaderItem,
          paginatorProps,
          debug,
        }}
      >
        <MobxProvider listStore={listStore} selectStore={selectStore} >
          <React.Fragment>
            {children}
          </React.Fragment>
        </MobxProvider>
      </Provider>
    );
  }
}

export default List;

