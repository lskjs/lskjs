import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import T from '../T';
import { contextToProps } from './List.context';

@contextToProps('List', 'Tags', 'Tag')
@inject('listStore')
@observer
class ListTagsPanel extends Component {
  render() {
    const {
      List,
      Tags,
      Tag,
      form,
      listStore,
    } = this.props;
    if (!listStore.hasFilter) return null;
    return (
      <List.TagsPanelWrapper >
        <Tags listStore={listStore} Tag={Tag} form={form} />
        <List.Button
          size="extraSmall"
          paint="primary"
          view="text"
          bordered
          // rounded
          onClick={listStore.clearFilter}
        >
          <T name="lskList.resetFilterButton" />
        </List.Button>
      </List.TagsPanelWrapper>
    );
  }
}

export default ListTagsPanel;
