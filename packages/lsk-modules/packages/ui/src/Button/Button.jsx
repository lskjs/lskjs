import React, { PureComponent } from 'react';
import autobind from 'core-decorators/lib/autobind';
import CheckIcon from 'react-icons2/mdi/check';
import CloseIcon from 'react-icons2/mdi/close';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import If from 'react-if';
import LoadingDots from '../LoadingDots';
import filterProps from '../utils/filterProps';
import isTouchDevice from '../utils/isTouchDevice';
import {
  Btn,
  Text,
  Icon,
  State,
  Ripple,
  RippleCircle,
} from './Button.styles';

class Button extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    bordered: PropTypes.bool,
    size: PropTypes.oneOf([
      'extraSmall',
      'small',
      'default',
      'large',
    ]),
    paint: PropTypes.oneOf([
      'default',
      'primary',
      'warning',
      'danger',
      'info',
      'success',
      'transparent',
      'transparentDark',
    ]),
    state: PropTypes.oneOf([
      'processing', 'progress',
      'success',
      'error',
      'ready', null,
    ]),
    view: PropTypes.oneOf([
      'solid',
      'text',
      'transparent',
      'transparentDark',
    ]),
    type: PropTypes.string,
    componentClass: PropTypes.any,
    block: PropTypes.bool,
    disabled: PropTypes.bool,
    new: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string,
    icon: PropTypes.any,
    iconLeft: PropTypes.any,
    iconRight: PropTypes.any,
    contentSuccess: PropTypes.any,
    contentProcessing: PropTypes.any,
    contentError: PropTypes.any,
    textSuccess: PropTypes.any,
    textProcessing: PropTypes.any,
    textError: PropTypes.any,
    autoMobile: PropTypes.bool,
    rounded: PropTypes.bool,
    style: PropTypes.object,
    colors: PropTypes.object,
    isRipple: PropTypes.bool,
  }

  static defaultProps = {
    size: 'default',
    paint: 'default',
    view: 'solid',
    bordered: false,
    type: 'button',
    style: {},
    componentClass: 'button',
    onClick: null,
    block: false,
    disabled: false,
    new: false,
    className: null,
    icon: null,
    iconLeft: null,
    iconRight: null,
    children: null,
    state: null,
    contentSuccess: null,
    contentProcessing: null,
    contentError: null,
    textSuccess: null,
    textProcessing: null,
    textError: null,
    autoMobile: false,
    rounded: false,
    style: null,
    isRipple: !isTouchDevice(),
  }

  constructor(props) {
    super(props);
    this.state = {
      isRippleActive: false,
    };
    this.ripple = React.createRef();
  }

  componentDidMount() {
    if (__CLIENT__) {
      if (!this.props.disabled && this.props.isRipple) {
        const condition = this.isBrowser('safari') || this.isBrowser('firefox');
        this.ripple.current.addEventListener(condition ? 'click' : 'mousedown', this.clickListener);
      }
    }
  }

  componentWillUnmount() {
    if (__CLIENT__) {
      if (!this.props.disabled && this.props.isRipple) {
        const condition = this.isBrowser('safari') || this.isBrowser('firefox');
        this.ripple.current.removeEventListener(condition ? 'click' : 'mousedown', this.clickListener);
      }
    }
  }

  getPropsState() {
    const { state } = this.props;
    if (state === 'processing' || state === 'progress') {
      return 'processing';
    }
    if (state === 'ready' || state === null) {
      return 'ready';
    }
    return state;
  }

  @autobind
  getButtonStateTheme() {
    switch (this.getPropsState()) {
      case 'processing':
        return {
          paint: this.props.paint,
          content: this.props.contentProcessing || (
            <React.Fragment>
              <Icon direction={this.props.textProcessing ? 'left' : 'single'}>
                <LoadingDots />
              </Icon>
              {this.props.textProcessing}
            </React.Fragment>
          ),
        };
      case 'success':
        return {
          paint: 'success',
          content: this.props.contentSuccess || (
            <React.Fragment>
              <Icon direction={this.props.textSuccess ? 'left' : 'single'}>
                <CheckIcon />
              </Icon>
              {this.props.textSuccess}
            </React.Fragment>
          ),
        };
      case 'error':
        return {
          paint: 'danger',
          content: this.props.contentError || (
            <React.Fragment>
              <Icon direction={this.props.textError ? 'left' : 'single'}>
                <CloseIcon />
              </Icon>
              {this.props.textError}
            </React.Fragment>
          ),
        };
      default:
        return {
          paint: this.props.paint,
        };
    }
  }

  @autobind
  clickListener(e) {
    if (!this.props.disabled && this.props.isRipple) {
      this.circle.style.top = `${e.offsetY}px`;
      this.circle.style.left = `${e.offsetX}px`;

      this.setState({ isRippleActive: true });
    }
  }

  isBrowser(name) {
    return document.documentElement.className.includes(name);
  }

  @autobind
  endAnimationRipple() {
    if (!this.props.disabled && this.props.isRipple) {
      this.setState({ isRippleActive: false });
    }
  }

  @autobind
  renderIcon(icon, dir) {
    return (
      <Icon direction={dir}>
        {icon}
      </Icon>
    );
  }

  render() {
    const { isRippleActive } = this.state;
    let { paint, disabled } = this.props;
    const {
      children,
      view,
      size,
      block,
      state,  //eslint-disable-line
      onClick,
      autoMobile,
      componentClass,
      className,
      icon,
      iconLeft,
      iconRight,
      bordered,
      rounded,
      new: isNew,
      type,
      style,
      colors,
      onlyIcon,
      isRipple,
      ...props
    } = this.props;
    const tag = componentClass || 'button';
    const icoLeft = icon || iconLeft;
    let iconDirection = null;
    if (iconLeft) iconDirection = 'left';
    if (iconRight) iconDirection = 'right';
    if (icon) iconDirection = 'single';
    let content = '';
    ({
      paint,
      disabled = disabled,
      content,
    } = this.getButtonStateTheme());
    const buttonProps = omit(props, [
      'contentSuccess',
      'contentProcessing',
      'contentError',
      'textSuccess',
      'textProcessing',
      'textError',
    ]);
    return (
      <Btn
        type={type}
        componentClass={tag}
        bordered={bordered}
        rounded={rounded}
        size={size}
        paint={paint}
        view={view}
        block={block}
        disabled={this.getPropsState() === 'ready' && disabled}
        new={isNew}
        state={this.getPropsState()}
        auto={autoMobile}
        className={className}
        iconDirection={iconDirection}
        onlyIcon={onlyIcon || (icon && !children)}
        onClick={!disabled ? onClick : null}
        twoIcons={icoLeft && iconRight}
        style={style}
        colors={colors}
        {...filterProps(buttonProps, tag)}
        // {...buttonProps}
      >
        <If condition={!disabled && isRipple}>
          <Ripple
            innerRef={this.ripple}
            active={isRippleActive}
          >
            <RippleCircle
              innerRef={(el) => { this.circle = el; }}
              onAnimationEnd={this.endAnimationRipple}
            />
          </Ripple>
        </If>
        <State
          size={size}
          paint={paint}
          view={view}
          state={state}
          rounded={rounded}
          iconDirection="left"
          bordered={bordered}
          visible={state && state !== 'ready'}
        >
          {content}
        </State>
        {icoLeft && this.renderIcon(icoLeft, icon ? 'single' : 'left')}
        {children && <Text>{children}</Text>}
        {iconRight && this.renderIcon(iconRight, 'right')}
      </Btn>
    );
  }
}

export default Button;
