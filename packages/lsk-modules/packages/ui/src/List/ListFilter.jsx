import React, { Component } from 'react';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import If from 'react-if';
import Collapse from '../Collapse';
import { contextToProps } from './List.context';
import ListFilterModal from './ListFilterModal';
import DEV from '../DEV';
import isTouchDevice from '../utils/isTouchDevice';

@contextToProps('List', 'FilterForm', 'debug', 'filterProps')
@inject('listStore')
@observer
class ListFilter extends Component {
  // constructor() {
  //   super();
  //   this.form = React.createRef();
  //   setTimeout(() => {

  //     __DEV__ && console.log('this.form', this.form);
  //   }, 1000);
  // }
  render() {
    const {
      List,
      FilterForm,
      listStore,
      debug,
      filterProps,
      isFilterModal,
      // container,
    } = this.props;
    if (!FilterForm) return null; // <DEV json="!FilterForm" />;
    const { showFilter } = listStore;
    const values = toJS(listStore.filter);
    return (
      <React.Fragment>
        <If condition={isFilterModal && isTouchDevice()}>
          <ListFilterModal
            className="d-md-none"
            overlayClassName="d-md-none"
            visible={showFilter}
            onClose={listStore.toggleFilter}
          />
        </If>
        <div className={(isFilterModal && isTouchDevice()) ? 'd-none d-md-block' : ''}>
          <Collapse
            show={showFilter}
            type="collapse"
          >
            <List.FilterWrapper>
              <FilterForm
                {...filterProps}
                enableReinitialize
                initialValues={values}
                hash={values}
                onChange={listStore.setFilter}
              />
              <If condition={debug}>
                <DEV json={listStore.filter} />
              </If>
            </List.FilterWrapper>
          </Collapse>
        </div>
      </React.Fragment>
    );
  }
}

export default ListFilter;
