import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Pagination from 'antd/lib/pagination';
import Icon from 'antd/lib/icon';
import If from 'react-if';
import { contextToProps } from './List.context';
import { PaginatorGroupWrapper, ArrowButton, ArrowBlock } from './List.styles';

@contextToProps('List', 'paginatorProps')
@inject('listStore')
@observer
class ListPaginator extends Component {
  render() {
    const {
      List,
      listStore,
      paginatorProps = {},
    } = this.props;
    const page = listStore.getCurrentPage();
    return (
      <List.PaginatorWrapper>
        <If condition={listStore.count === null}>
          <ArrowBlock>
            <ArrowButton disabled={!(page > 1)} onClick={() => listStore.setPage(page - 1)}>
              <Icon type="left" />
            </ArrowButton>
            <ArrowButton onClick={() => listStore.setPage(page + 1)}>
              <Icon type="right" />
            </ArrowButton>
          </ArrowBlock>
        </If>
        <If condition={listStore.count > 0}>
          <PaginatorGroupWrapper>
            <Pagination
              onChange={listStore.setPage}
              current={listStore.getCurrentPage()}
              pageSize={listStore.limit}
              total={listStore.count}
              showLessItems
              {...paginatorProps}
            />
          </PaginatorGroupWrapper>
        </If>
      </List.PaginatorWrapper>
    );
  }
}

export default ListPaginator;
