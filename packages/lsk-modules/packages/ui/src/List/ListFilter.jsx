import React, { Component } from 'react';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import Collapse from '../Collapse';
import { contextToProps } from './List.context';
import If from 'react-if';
import DEV from '../DEV';

@contextToProps('List', 'FilterForm', 'debug')
@inject('listStore')
@observer
class ListFilter extends Component {
  constructor() {
    super();
    this.form = React.createRef();
    setTimeout(() => {
      console.log('this.form', this.form);
    }, 1000);
  }
  render() {
    const {
      List,
      FilterForm,
      listStore,
      debug,
      // container,
    } = this.props;
    if (!FilterForm) return null; // <DEV json="!FilterForm" />;

    return (
      <Collapse show={listStore.showFilter} type="collapse">
        <List.FilterWrapper>
          <FilterForm
            ref={this.form}
            enableReinitialize
          // initialValues={listStore.filter}
            initialValues={toJS(listStore.filter)}
            onChange={listStore.setFilter}
          />
          <If condition={debug}>
            <DEV json={listStore.filter} />
          </If>
        </List.FilterWrapper>
      </Collapse>
    );
  }
}

export default ListFilter;
