import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import css from 'importcss';

@css(require('./Avatar.scss'))
class Avatar extends Component {
  static defaultProps = {
    src: 'https://ssl.gstatic.com/images/icons/material/product/1x/avatar_circle_blue_120dp.png',
    size: 'default',
  };
  static propTypes = {
    alt: PropTypes.string.isRequired,
    src: PropTypes.string,
    size: PropTypes.oneOf(['small', 'large', 'default']),
  };
  render() {
    const { size, alt, src } = this.props;
    return (
      <img
        styleName={cx({
          avatar: true,
          w54: size === 'default',
          w32: size === 'small',
          w100: size === 'large',
        })}
        alt={alt}
        src={src}
      />
    );
  }
}

export default Avatar;
