import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import autobind from 'core-decorators/lib/autobind';
import omit from 'lodash/omit';
import filterProps from '../utils/filterProps';

class StatefulButton extends PureComponent {
  static propTypes = {
    stableSuccess: PropTypes.bool,
    timerMillis: PropTypes.number,
    componentClass: PropTypes.any,
    innerComponentClass: PropTypes.any,
    baseState: PropTypes.oneOf(['ready', 'success', 'error']),
    state: PropTypes.string,
    onClick: PropTypes.func,
    onSubmit: PropTypes.func,
    onError: PropTypes.func,
    form: PropTypes.any,
  }

  static defaultProps = {
    baseState: 'ready',
    componentClass: 'button',
    innerComponentClass: 'button',
    stableSuccess: false,
    timerMillis: 2000,
    state: null,
    form: null,
    onSubmit: null,
    onError: null,
    onClick: null,
  }

  constructor(props) {
    super(props);
    this.timeoutId = null;
    this.resetInternalStateAfterProcessing = false;

    this.state = {
      internalState: null,
    };
  }

  componentDidMount() {
    this.isMounted = true;
  }

  componentWillReceiveProps(props) {
    if (props.state) {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
    }
    if (props.baseState !== this.props.baseState) {
      if (this.state.internalState === 'processing') {
        this.resetInternalStateAfterProcessing = true;
      } else {
        this.doResetInternalState();
      }
    }
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  @autobind
  onClick(e) {
    if (this.getButtonState() === 'ready') {
      const {
        onSubmit, onClick, form, state,
      } = this.props;
      this.resetInternalStateAfterProcessing = false;

      let event;
      if (onClick) event = onClick(e);
      else if (form && onSubmit) event = onSubmit(form);
      else event = Promise.resolve;

      if (!state) {
        this.setState({
          internalState: 'processing',
        }, () => this.attachPromiseHandlers(event));
      }
    }
  }

  get isMounted() {
    return this.privateIsMounted;
  }

  get resetInternalStateAfterProcessing() {
    return this.privateResetInternalStateAfterProcessing;
  }

  get timeoutId() {
    return this.privateTimeoutId;
  }

  set isMounted(action) {
    this.privateIsMounted = action;
  }

  set resetInternalStateAfterProcessing(action) {
    this.privateResetInternalStateAfterProcessing = action;
  }

  set timeoutId(action) {
    this.privateTimeoutId = action;
  }

  @autobind
  getButtonState() {
    return this.props.state
      || this.state.internalState
      || this.props.baseState;
  }

  privateTimeoutId;
  privateResetInternalStateAfterProcessing;
  privateIsMounted;

  @autobind
  doResetInternalState() {
    if (this.isMounted) {
      this.setState({
        internalState: null,
      });
    }
  }

  @autobind
  doResetInternalStateAfterTimer() {
    this.timeoutId = setTimeout(() => {
      this.timeoutId = null;
      this.doResetInternalState();
    }, this.props.timerMillis);
  }

  attachPromiseHandlers(promise) {
    const { stableSuccess, onError } = this.props;
    if (typeof promise === 'object') {
      return promise.then(() => {
        return this.isMounted && this.setState({
          internalState: 'success',
        }, () => {
          if (!stableSuccess) {
            this.doResetInternalStateAfterTimer();
          } else if (this.resetInternalStateAfterProcessing) {
            this.doResetInternalState();
          }
        });
      }).catch((err) => {
        if (this.isMounted) {
          this.setState({
            internalState: 'error',
          }, async () => {
            this.doResetInternalStateAfterTimer();
            if (onError) await onError(err);
          });
        }
      });
    }

    this.doResetInternalState();
    return promise;
  }

  render() {
    const { componentClass: Tag, innerComponentClass } = this.props;
    const buttonProps = omit(this.props, [
      'stableSuccess',
      'timerMillis',
      'componentClass',
      'innerComponentClass',
      'baseState',
      'state',
      'onClick',
      'form',
      'onSubmit',
    ]);
    buttonProps.componentClass = innerComponentClass;
    return (
      <Tag
        onClick={this.onClick}
        state={this.getButtonState()}
        {...filterProps(buttonProps, Tag)}
        // {...buttonProps}
      />
    );
  }
}

export default StatefulButton;
