import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import InputAddon from './InputAddon';
import Block from './InputGroup.styles';

class InputGroup extends PureComponent {
  static Addon = InputAddon;
  static propTypes = {
    children: PropTypes.any.isRequired,
    disabled: PropTypes.bool,
    uniform: PropTypes.bool,
    style: PropTypes.object,
  }
  static defaultProps = {
    disabled: false,
    uniform: false,
    style: {},
  }
  render() {
    const {
      children, disabled, uniform, style,
    } = this.props;
    return (
      <Block
        className="buzz-input-group"
        disabled={disabled}
        uniform={uniform}
        style={style}
      >
        {children}
      </Block>
    );
  }
}

export default InputGroup;
