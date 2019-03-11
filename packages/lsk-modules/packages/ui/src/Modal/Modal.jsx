import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import autobind from 'core-decorators/lib/autobind';
import cx from 'classnames';
import Component from '../Component';

const DEBUG = 0;

export default class MyModal extends Component {
  static childContextTypes = {
    _modal: PropTypes.func,
  };
  static defaultProps = {
    emitter: null,
    event: null,
    fullscreen: false,
    children: null,
    visible: false,
  };
  static propTypes = {
    emitter: PropTypes.object,
    fullscreen: PropTypes.bool,
    children: PropTypes.any,
    visible: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.state = { visible: props.visible };
    if (typeof window !== 'undefined' && window.location.hash.substring(1) === this.props.id) {
      this.state.visible = true;
    }
  }
  getChildContext() {
    return {
      _modal: ({ type }) => {
        if (type === 'open') {
          this.open();
        }
        if (type === 'close') {
          this.close();
        }
        return this.state;
      },
    };
  }
  componentDidMount() {
    const { emitter } = this.props;
    if (emitter) {
      emitter.on('open', () => {
        this.setState({
          visible: true,
        });
      });
      emitter.on('close', () => {
        this.setState({
          visible: false,
        });
      });
    }
  }
  open() {
    if (this.props.openHandler) {
      this.props.openHandler.bind(this)();
    } else {
      if (this.props.id) {
        this.setLocation({
          hash: this.props.id,
        });
      }
      this.setState({ visible: true });
      if (this.props.onOpen) this.props.onOpen();
    }
  }
  close() {
    if (this.props.closeHandler) {
      this.props.closeHandler.bind(this)();
    } else {
      if (this.props.id) {
        this.setLocation({
          hash: null,
        });
      }
      this.setState({ visible: false });
      if (this.props.onClose) this.props.onClose();
    }
  }
  render() {
    const { fullscreen, children } = this.props;
    let className = '';
    if (fullscreen) {
      className = 'modal-fullscreen';
    }
    return (
      <div className={className}>
        {children}
      </div>
    );
  }
}

export class Open extends Component { // eslint-disable-line
  static contextTypes = {
    _modal: PropTypes.func,
  };
  static defaultProps = {
    id: 'single',
    type: 'open',
    children: '',
  };
  static propTypes = {
    type: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.any,
  };

  @autobind
  handle(e) {
    const { type, id } = this.props;
    if (!e.isDefaultPrevented()) {
      this.context._modal({ type, id });
    }
  }
  render() {
    const { children } = this.props;
    return (
      <span onClick={this.handle}>
        {children}
      </span>
    );
  }
}

MyModal.Button = Open;
MyModal.Trigger = Open;
MyModal.Open = Open;


export class Close extends Component { // eslint-disable-line
  static contextTypes = {
    _modal: PropTypes.func,
  };
  static defaultProps = {
    id: 'single',
    type: 'close',
    children: '',
  };
  static propTypes = {
    type: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.any,
  };
  @autobind
  handle() {
    const { type, id } = this.props;
    this.context._modal({ type, id });
  }
  render() {
    const { children } = this.props;
    return (
      <span onClick={this.handle}>
        {children}
      </span>
    );
  }
}
MyModal.Close = Close;

export class ModalContent extends Component { // eslint-disable-line
  static contextTypes = {
    _modal: PropTypes.func,
  };
  static defaultProps = {
    id: 'single',
    children: '',
    title: null,
    fullscreen: false,
  };
  static propTypes = {
    id: PropTypes.string,
    children: PropTypes.any,
    title: PropTypes.string,
    fullscreen: PropTypes.bool,
  };
  @autobind
  handle() {
    const { id } = this.props;
    this.context._modal({ type: 'close', id });
  }
  render() {
    const {
      id, fullscreen, title, body, children, dialogClassName, onHide, ...otherProps
    } = this.props;
    const state = this.context._modal({ type: 'state', id });
    return (
      <Modal
        show={state.visible}
        onHide={this.handle}
        {...otherProps}
        dialogClassName={dialogClassName || cx({
          'modal-fullscreen': fullscreen,
        })}
      >
        <If condition={title || body}>
          <If condition={title}>
            <Modal.Header closeButton>
              {title}
            </Modal.Header>
          </If>
          <Modal.Body>
            {body}
            {children}
          </Modal.Body>
        </If>
        <If condition={!(title || body)}>
          {children}
        </If>
      </Modal>
    );
  }
}

MyModal.Content = ModalContent;
MyModal.Header = Modal.Header;
MyModal.Body = Modal.Body;
MyModal.Footer = Modal.Footer;
MyModal.Title = Modal.Title;
