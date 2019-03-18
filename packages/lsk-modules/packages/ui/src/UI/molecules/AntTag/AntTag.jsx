import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import StyledTag from './AntTag.styles';

class AntTag extends PureComponent {
  static propTypes = {
    href: PropTypes.string,
    target: PropTypes.string,
    componentClass: PropTypes.any,
    children: PropTypes.any,
  }
  static defaultProps = {
    href: null,
    target: null,
    componentClass: 'a',
    children: null,
  }
  render() {
    const {
      href,
      target,
      componentClass,
      ...props
    } = this.props;
    let { children } = this.props;
    if (href) {
      const Tag = componentClass;
      children = (
        <Tag href={href} target={target}>
          {children}
        </Tag>
      );
    }
    return (
      <StyledTag {...props} isHref={!!href}>
        {children}
      </StyledTag>
    );
  }
}

export default AntTag;
