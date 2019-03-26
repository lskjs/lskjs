import React, { PureComponent } from 'react';
import Block from './InputAddon.styles';

class InputAddon extends PureComponent {
  render() {
    const { children, icon, style } = this.props;
    return (
      <Block
        icon={icon}
        style={style}
      >
        {children}
      </Block>
    );
  }
}

export default InputAddon;
