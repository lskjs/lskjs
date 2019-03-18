import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import If from 'react-if';
import T from '../T';
import LoaderIcon from './LoaderIcon';

const styles = {
  inner: {
    zIndex: 3000,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4a4a4a',
    position: 'absolute',
    width: '100%',
    height: '100%',
    maxHeight: 400,
    display: 'flex',
    top: 0,
    left: 0,
  },
  innerFull: {
    zIndex: 3000,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4a4a4a',
    position: 'fixed',
    padding: '32px 12px',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  box: {
    color: '#4a4a4a',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  icon: {
    display: 'flex',
    marginBottom: 16,
  },
  text: {
    textAlign: 'center',
  },
  overlay: {
    clear: 'both',
    overflow: 'hidden',
    opacity: 0.2,
    userSelect: 'none',
    pointerEvents: 'none',
  },
  container: {
    position: 'relative',
  }
};

class Loading extends PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,
    text: PropTypes.any,
    icon: PropTypes.any,
    iconPath: PropTypes.string,
    full: PropTypes.bool,
    children: PropTypes.any,
    fontName: PropTypes.string,
  }

  static defaultProps = {
    disabled: false,
    icon: <LoaderIcon />,
    iconPath: null,
    full: false,
    children: null,
    fontName: '\'Gotham Pro\', Helvetica, Arial',
    text: <T name="lskComponents.fullScreenLoader.loading" />,
  }

  render() {
    const {
      icon,
      iconPath,
      disabled,
      text,
      full,
      children,
      fontName,
      ...props
    } = this.props;
    if (disabled) return children;
    let iconComponent = (
      <div style={styles.icon}>
        {icon}
      </div>
    );
    if (iconPath) {
      iconComponent = (
        <img
          alt=""
          src={iconPath}
          style={styles.icon}
        />
      );
    }
    return (
      <div style={styles.container} {...props}>
        <div style={full ? styles.innerFull : styles.inner}>
          <div style={styles.box}>
            {iconComponent}
            <If condition={text}>
              <div style={Object.assign(fontName ? { fontFamily: fontName } : {}, styles.text)}>
                {text}
              </div>
            </If>
          </div>
        </div>
        <If condition={children}>
          <div style={styles.overlay}>
            {children}
          </div>
        </If>
      </div>
    );
  }
}

export default Loading;
