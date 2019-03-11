import React, { Component } from 'react';
import If from 'react-if';
import { contextToProps } from './List.context';

@contextToProps('List', 'show')
class ListHeader extends Component {
  render() {
    const { List, children, show } = this.props;
    if (children) {
      return (
        <List.HeaderWrapper>
          {children}
        </List.HeaderWrapper>
      );
    }
    return (
      <React.Fragment>
        <If condition={show.search}>
          <List.HeaderWrapper>
            <List.Search />
          </List.HeaderWrapper>
        </If>
        <List.HeaderWrapper >
          <List.Filter />
        </List.HeaderWrapper>
        <If condition={show.tags}>
          <List.HeaderWrapper >
            <List.TagsPanel />
          </List.HeaderWrapper>
        </If>
        <List.HeaderWrapper sticky={show.sticky}>
          <List.HeaderRow />
        </List.HeaderWrapper>
      </React.Fragment>
    );
  }
}

export default ListHeader;

