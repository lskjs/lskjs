import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'core-decorators/lib/autobind';
import filterProps from '../utils/filterProps';
import { contextToProps } from './Modal2.context';

@contextToProps('modal', 'Modal')
class ModalTrigger extends Component { // eslint-disable-line
  static defaultProps = {
    // id: 'single',
    // type: 'open',
    // children: '',
  };
  // static propTypes = {
  //   type: PropTypes.string,
  //   id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  //   children: PropTypes.any,
  // };

  @autobind
  handleClick(e) {
    const { modal, type } = this.props;
    if (e.isDefaultPrevented()) return;
    if (type === 'open') {
      modal.open();
    } else if (type === 'close') {
      modal.close();
    } else {
      modal.toggle();
    }
  }
  render() {
    const {
      children, componentClass: Tag = 'span', ...props
    } = this.props;
    return (
      <Tag onClick={this.handleClick} {...filterProps(props, Tag)}>
        {children}
      </Tag>
    );
  }
}

export default ModalTrigger;
