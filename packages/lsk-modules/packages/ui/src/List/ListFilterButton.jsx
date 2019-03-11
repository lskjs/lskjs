import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import filter from 'lodash/filter';
import { Badge } from 'antd';
import TuneIcon from 'react-icons2/mdi/tune';
import isEmpty from '../utils/isEmpty';
import T from '../T';
import { contextToProps } from './List.context';


@contextToProps('List')
@inject('listStore')
@observer
class FilterButton extends Component {
  render() {
    const {
      List, listStore,
    } = this.props;
    const badge = listStore.hasFilter ? filter(toJS(listStore.filter), a => !isEmpty(a)).length : 0;

    // console.log('Object.keys(listStore.filter)', Object.keys(listStore.filter));
    // const badge = !listStore.hasFilter

    return (
      <React.Fragment>
        {/* <Badge count={listStore.hasFilter ? 1 : 0}> */}
        <Badge count={badge}>
          <List.Button
            icon={<TuneIcon />}
            paint="primary"
            view="text"
            size="large"
            bordered
            style={{ backgroundColor: listStore.showFilter ? '#F0F0FF' : '' }}
            onClick={listStore.toggleFilter}
          >
            <T name="lskList.filterButton" />
          </List.Button>
        </Badge>
      </React.Fragment>
    );
  }
}

export default FilterButton;
