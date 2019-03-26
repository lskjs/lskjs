import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Block from './Row.styles';

class Row extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
  }
  static defaultProps = {
    children: null,
  }
  render() {
    const { children } = this.props;
    return (
      <Block>
        {children}
      </Block>
    );
  }
}

export default Row;
