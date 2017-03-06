import React, { PropTypes } from 'react';
import cx from 'classnames';

const s = require('./Avatar.scss');

function Avatar({ alt, src, size }) {
  return (
    <img
      className={cx({
        [s.avatar]: true,
        [s.w54]: size === 'default',
        [s.w100]: size === 'large',
        [s.w32]: size === 'small',
      })}
      alt={alt}
      src={src}
    />
  );
}

Avatar.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string,
  size: PropTypes.oneOf(['small', 'large', 'default']),
};

Avatar.defaultProps = {
  src: 'http://i.imgur.com/aigt42b.jpg',
  size: 'default',
};

export default Avatar;
