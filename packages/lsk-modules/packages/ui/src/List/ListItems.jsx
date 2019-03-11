import React, { Component } from 'react';
import { css } from '@emotion/core';
import { observer, inject } from 'mobx-react';
import If from 'react-if';
import DEV from '../DEV';
import Performance from '../DEV/Performance';
import T from '../T';
import Button from '../Button';
import { contextToProps } from './List.context';

const buttonStyles = css`
  border-radius: 0;
  box-shadow: 0 0 0 1px #e3e3e3;
  width: 100%;
`;
@contextToProps('List', 'Item', 'debug')
@inject('listStore')
@observer
class ListItems extends Component {
  render() {
    const {
      List, listStore, Item, debug,
    } = this.props;
    return (
      <List.ItemsWrapper>
        <Performance name="List.Items" disabled={!__DEV__}>
          {listStore.map((item, index) => {
            if (item === null) {
              return (
                <Button
                  bordered
                  size="large"
                  paint="default"
                  onClick={() => listStore.fetch({ skip: listStore.skip + index, limit: 1, cache: 1 })}
                  disabled={listStore.loading}
                  className={buttonStyles}
                  block
                >
                  <If condition={listStore.loading}>
                    <T name="lskList.bodyLoadingButton" />
                  </If>
                  <If condition={!listStore.loading}>
                    <T name="lskList.bodyLoadMoreButton" />
                  </If>
                </Button>
              );
            }
            if (!Item) return <DEV json="!Item" />;
            return <Item key={item._id || item.id || index} item={item} />;
          })}
        </Performance>
      </List.ItemsWrapper>
    );
  }
}

export default ListItems;
