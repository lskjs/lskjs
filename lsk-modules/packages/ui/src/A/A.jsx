import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Tag from './A.styles';

class A extends PureComponent {
  static defaultProps = {
    className: null,
    href: null,
    to: null,
  }
  static propTypes = {
    className: PropTypes.string,
    href: PropTypes.string,
    to: PropTypes.string,
  }
  render() {
    const {
      bsStyle,
      className,
      href,
      to,
      ...props
    } = this.props;
    return (
      <Tag
        className={className}
        href={href || to}
        {...props}
      />
    );
  }
}

export default A;
