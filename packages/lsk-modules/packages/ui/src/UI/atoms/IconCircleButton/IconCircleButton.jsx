import React, { PureComponent } from 'react';
import PlusIcon from 'react-icons2/mdi/plus';

import Block from './IconCircleButton.styles';

class IconCircleButton extends PureComponent {
  render() {
    const {
      className,
      disabled,
      active,
      small,
      children,
      componentClass = 'button',
      style,
      href,
      onClick,
      inverse = false,
      transparent,
    } = this.props;
    const props = {
      componentClass,
      inverse,
      small,
      disabled,
      child: children,
      transparent,
      active,
      style: style || {},
    };
    if (componentClass === 'button') {
      props.onClick = onClick;
      props.type = 'button';
    } else if (componentClass !== 'div') {
      props.href = href;
    }
    return (
      <Block className={className} {...props}>
        {children || <PlusIcon />}
      </Block>
    );
  }
}

export default IconCircleButton;
