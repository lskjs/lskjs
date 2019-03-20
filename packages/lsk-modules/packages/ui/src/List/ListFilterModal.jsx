import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import T from '../T';
import { contextToProps } from './List.context';
import Modal, {
  Title,
  Content,
} from '../Modal2';
import { modalStyle } from './List.styles';

@contextToProps('FilterForm', 'filterProps')
@inject('listStore')
@observer
class ListFilterModal extends Component {
  render() {
    const {
      listStore, filterProps, FilterForm, children, ...props
    } = this.props;
    const values = toJS(listStore.filter);
    return (
      <Modal
        trigger={children}
        style={{
          overlay: Modal.defaultStyles.overlay,
        }}
        {...props}
      >
        {() => (
          <React.Fragment>
            <Title><T name="lskList.filterButton" /></Title>
            <Content className={modalStyle}>
              <FilterForm
                {...filterProps}
                enableReinitialize
                initialValues={values}
                hash={values}
                onChange={listStore.setFilter}
              />
            </Content>
          </React.Fragment>
        )}
      </Modal>
    );
  }
}

export default ListFilterModal;
