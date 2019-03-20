import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { contextToProps } from './List.context';

@contextToProps('List', 'show', 'FilterForm')
@inject('listStore', 'i18')
@observer
class ListSearch extends Component {
  render() {
    const {
      i18, List, listStore, show, ...props
    } = this.props;
    return (
      <List.SearchWrapper
        current={listStore.items.length}
        max={listStore.count}
        debounceTimeout={100}
        onChange={e => listStore.setSearch(e.target.value)}
        value={listStore.search || ''}
        canClear={!!listStore.search}
        onClear={() => listStore.setSearch(null)}
        actions={show.filterButton && <List.FilterButton />}
        placeholder={i18.t('lskList.searchPlaceholder')}
        {...props}
      />
    );
  }
}


export default ListSearch;

