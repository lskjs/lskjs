import React from 'react';
import PropTypes from 'prop-types';
import isNull from 'lodash/isNull';
import isString from 'lodash/isString';
import ReactImageFallback from 'react-image-fallback';
// import PureComponent from 'lsk-general/General/PureComponent';
import PureComponent from '../PureComponent';
import Link from '../Link';

// import gifSpinner from './img/loading.gif';
const textSizeRatio = 3;
const textSizePercent = 30;

export default class Avatar extends PureComponent {
  static defaultColors = [
    '#F8B195',
    '#F67280',
    '#C06C84',
    '#6C5B7B',
    '#355C7D',
  ];
  static defaultAvatar = '//cdn.mgbeta.ru/lsk/no-avatar.png';
  static defaultProps = {
    title: '',
    name: '',
    src: null,

    size: 64,
    width: null,
    height: null,

    // backgroundColor: '#838383',
    textColor: '#d9d9d9',
    textScale: 1,

    placeholder: null,
    placeholderLimit: 3,

    shape: 'circle',

    style: {},
    innerStyle: {},
  };

  static propTypes = {
    title: PropTypes.string,
    src: PropTypes.string,

    size: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,

    color: PropTypes.string,
    textColor: PropTypes.string,
    textScale: PropTypes.number,

    shape: PropTypes.string,

    placeholder: PropTypes.string,
    placeholderLimit: PropTypes.number,
    // shape: PropTypes.oneOfType(['circle', 'square', 'rounded']),

    style: PropTypes.object,
    innerStyle: PropTypes.object,
  };

  getColorByHash(num) {
    if (isNull(num)) {
      const index = Math.floor(Math.random() * Avatar.defaultColors.length);
      return Avatar.defaultColors[index];
    }
    num %= Avatar.defaultColors.length;
    return Avatar.defaultColors[num - 1] || Avatar.defaultColors[0];
  }

  hashCode(str) {
    if (isNull(str)) return null;
    if (!isString(str)) str += '';
    let hash = 0,
      i,
      chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  getInnerStyle() {
    const {
      size,
      textScale,
      shape,
      backgroundColor,
      innerStyle,
      textColor,
      title,
      id,
      src,
    } = this.props;
    const str = id || title || null;
    const color = backgroundColor || this.getColorByHash(this.hashCode(str));

    const width = this.props.width || size;
    const height = this.props.height || size;

    const lineHeight = size;
    const fontSize = Math.min(
      // Math.floor(size / textSizeRatio * textScale),
      Math.floor(size * textSizePercent / 100),
      lineHeight,
    );

    let borderRadius = 'none';
    if (shape === 'circle') {
      borderRadius = '50%';
    } else if (shape === 'rounded') {
      borderRadius = 6;
    }

    return Object.assign({
      boxSizing: 'border-box',
      maxWidth: '100%',
      objectFit: 'cover',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // overflow: 'hidden',
      width,
      height,
      textAlign: 'center',
      fontFamily: 'Helvetica, Arial, sans-serif',
      borderRadius,
      fontSize: `${fontSize}px`,
      lineHeight: `${lineHeight}px`,
      backgroundColor: src ? 'rgba(0, 0, 0, 0)' : color,
      color: textColor,
    }, innerStyle);
  }

  renderAsImage() {
    const title = this.props.title || this.props.name;
    const src = this.props.src || this.props.avatar;
    return (
      <ReactImageFallback
        src={src}
        fallbackImage={this.props.defaultAvatar || this.constructor.defaultAvatar}
        initialImage={this.props.defaultAvatar || this.constructor.defaultAvatar}
        style={this.getInnerStyle()}
        alt={title}
        title={title}
      />
    );
  }

  renderAsText() {
    let { placeholder, placeholderLimit } = this.props;
    const title = this.props.title || this.props.name || placeholder || '';
    if (!placeholder) {
      placeholder = title
        .split(' ')
        .map(s => s.charAt(0))
        .join('')
        .substr(0, placeholderLimit);
    }
    return (
      <div
        style={this.getInnerStyle()}
      >
        {placeholder}
      </div>
    );
  }

  render() {
    const {
      size,
      style,
      className,
      children,
      componentClass,
    } = this.props;

    const src = this.props.src || this.props.avatar;
    const width = this.props.width || size;
    const height = this.props.height || size;

    const wrapperStyle = Object.assign({
      display: 'block',
      position: 'relative',
      width,
      height,
    }, style);

    const link = this.props.link || this.props.href;
    const Component = componentClass || (link ? Link : 'div');

    return (
      <Component
        href={link}
        className={className}
        style={wrapperStyle}
      >
        {src != null ? this.renderAsImage() : this.renderAsText()}
        { children }
      </Component>
    );
  }
}

Avatar.Badge = (props) => {
  const {
    componentClass: Wrap, left, top, right, bottom, ...props2
  } = props;
  const offset = '7%';
  const style = {
    position: 'absolute',
  };

  ['left', 'top', 'right', 'bottom'].forEach((dir) => {
    if (!props[dir]) return;
    if (typeof props[dir] === 'string') {
      style[dir] = props[dir];
    } else if (typeof props[dir] === 'number') {
      style[dir] = `${props[dir]}%`;
    } else {
      style[dir] = offset;
    }
  });

  return (
    <div style={style} {...props2}>
      {props.children}
    </div>
  );
};
