import React, { PureComponent } from 'react';
import styled from '@emotion/styled';
import { css, keyframes } from 'emotion';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import cx from 'classnames';
import omit from 'lodash/omit';

import Check from 'react-icons2/fa/check';
import Refresh from 'react-icons2/fa/refresh';
import Close from 'react-icons2/fa/close';

const BUTTON_STATUS = {
  none: '',
  loading: 'loading',
  success: 'success',
  error: 'error',
};

const spin = keyframes`
  from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);
  }
`;

const appear = keyframes`
  from {
    opacity: .2;
  }
  to {
    opacity: 1;
  }
`;

const success = keyframes`
  to {
    opacity: 1;
    border: 2px solid transparent;
  }
`;

const error = keyframes`
  to {
    opacity: 1;
    border: 2px solid transparent;
  }
`;

const spinner = keyframes`
  0% {
    border-top-color: #48b1f1;
  }
  30% {
    border-right-color: #48b1f1;
  }
  60% {
    border-bottom-color: #48b1f1;
  }
  90% {
    border-left-color: #48b1f1;
  }
`;

const Animate = styled('div')`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  z-index: 1;
  border: 2px solid transparent;
  box-sizing: border-box;
  border-radius: 4px;
  transition: border .3s ease;

  ${props => (props.spin && `
    > svg {
        animation-name: ${spin};
        animation-duration: 600ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }
  `)}
`;

const defaultStyle = css`
  border-color: transparent !important;
  ${Animate} {
    border: 2px solid #adadad;
    animation: ${spinner} .8s infinite forwards, ${appear} .3s 1;
  }
`;

const successStyle = css`
  ${Animate} {
      opacity: .2;
      animation: ${success} .3s 1 forwards;
    }
`;

const dangerStyle = css`
  ${Animate} {
    opacity: .2;
    animation: ${error} .3s 1 forwards;
  }
`;

class StatusButton extends PureComponent {
  static defaultProps = {
    status: BUTTON_STATUS.none,
    children: 'Отправить',
    promise: null,
    bsStyle: 'default',
    styleName: '',
    timeout: 2000,
    tag: Button,
  };
  static propTypes = {
    status: PropTypes.string,
    children: PropTypes.any,
    promise: PropTypes.any,
    bsStyle: PropTypes.string,
    styleName: PropTypes.string,
    timeout: PropTypes.number,
    tag: PropTypes.any,
  };
  constructor(props) {
    super(props);
    this.state = {
      status: props.promise ? BUTTON_STATUS.loading : props.status,
    };
    this.resolvePromise(props.promise);
  }
  componentWillReceiveProps(nextProps) {
    this.resolvePromise(nextProps.promise);
    if (!nextProps.promise) {
      this.setState({ status: nextProps.status });
    }
  }
  resolvePromise(promise) {
    const { status } = this.state;
    if (!promise) return;
    if (status !== BUTTON_STATUS.loading) {
      this.setState({ status: BUTTON_STATUS.loading });
    }
    promise
      .then(() => this.finishStatus(BUTTON_STATUS.success))
      .catch(() => this.finishStatus(BUTTON_STATUS.error));
  }
  finishStatus(status) {
    this.setState({ status });
    setTimeout(() => this.setState({ status: '' }), this.props.timeout);
  }
  convertStatus(status) {
    switch (status) {
      case 'loading':
        return <Refresh />;
      case 'success':
        return <Check />;
      case 'error':
        return <Close />;
      default:
        return '';
    }
  }
  render() {
    const { status } = this.state;
    const {
      children, tag, bsStyle, className,
    } = this.props;

    const style = cx({
      default: status === BUTTON_STATUS.loading,
      success: status === BUTTON_STATUS.success,
      danger: status === BUTTON_STATUS.error,
    });

    const disabled = ['loading', 'error', 'success'].includes(status);

    const Btn = styled(tag)`
      transition: .1s ease;
      will-change: transform;
      outline: none !important;

      ${props => (props.disabled && 'cursor: wait !important;')}
      ${(props) => {
    switch (props.bsStyle) {
      case 'success': return successStyle;
      case 'danger': return dangerStyle;
      default: return defaultStyle;
    }
  }}

      &:hover,
      &:focus,
      &:active {
        outline: none !important;
      }
    `;

    return (
      <Btn
        {...omit(this.props, ['status', 'tag', 'promise', 'timeout'])}
        className={className}
        bsStyle={disabled ? style : bsStyle}
        disabled={disabled}
      >
        <span style={{ visibility: disabled ? 'hidden' : 'visible' }}>
          {children}
        </span>
        <Animate spin={status === BUTTON_STATUS.loading}>
          {this.convertStatus(status)}
        </Animate>
      </Btn>
    );
  }
}

export default StatusButton;
