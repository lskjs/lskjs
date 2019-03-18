import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import If from 'react-if';
import cx from 'classnames';
import uniq from 'lodash/uniq';
import filter from 'lodash/filter';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import merge from 'lodash/merge';
import autobind from 'core-decorators/lib/autobind';
import ReactModal from 'react-modal';
import ModalSubtitle from '../UI/atoms/ModalSubtitle';
import ModalDescription from '../UI/atoms/ModalDescription';
import ModalContent from '../UI/atoms/ModalContent';
import ModalFooter from '../UI/atoms/ModalFooter';
import ModalImage from '../UI/atoms/ModalImage';
import ModalHelp from '../UI/atoms/ModalHelp';
import ModalScroll from '../UI/organisms/ModalScroll';
import ModalTitle from '../UI/molecules/ModalTitle';
import ModalTrigger from './ModalTrigger';
import ModalInner from './ModalInner';
import ModalCloseIcon from './ModalCloseIcon';
import sizes from '../utils/sizes';
import isTouchDevice from '../utils/isTouchDevice';

import {
  bodyModalStyle,
  modalStyle,
  modalSmall,
  modalNormal,
  modalLarge,
  InnerWrapper,
} from './Modal2.styles';

import { Provider } from './Modal2.context';

const reactModalProps = ['isOpen', 'onAfterOpen', 'onRequestClose', 'closeTimeoutMS', 'style', 'contentLabel', 'portalClassName', 'overlayClassName', 'className', 'bodyOpenClassName', 'htmlOpenClassName', 'ariaHideApp', 'shouldFocusAfterRender', 'shouldCloseOnOverlayClick', 'shouldCloseOnEsc', 'shouldReturnFocusAfterClose', 'role', 'parentSelector', 'aria', 'data', 'overlayRef', 'contentRef'];

ReactModal.defaultStyles = {
  overlay: {
    ...ReactModal.defaultStyles.overlay,
    backgroundColor: 'rgba(0,0,0,.3)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 2030,
  },
  content: {
    ...ReactModal.defaultStyles.content,
    background: 'none',
    border: 'none',
    padding: '20px 15px',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
};

if (typeof (window) !== 'undefined') {
  ReactModal.setAppElement('body');
}

class Modal2 extends PureComponent {
  static Title = ModalTitle;
  static Subtitle = ModalSubtitle;
  static Image = ModalImage;
  static Content = ModalContent;
  static Description = ModalDescription;
  static Help = ModalHelp;
  static Scroll = ModalScroll;
  static Footer = ModalFooter;
  static Trigger = ModalTrigger;
  static InnerWrapper = InnerWrapper;
  static CloseIcon = ModalCloseIcon;
  static Inner = ModalInner;
  static defaultStyles = ReactModal.defaultStyles;

  static propTypes = {
    defaultVisible: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    closable: PropTypes.bool,
    Title: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Subtitle: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Image: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Content: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Description: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Help: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Scroll: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Footer: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Trigger: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    Inner: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    InnerWrapper: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    CloseIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    className: PropTypes.string,
    size: PropTypes.oneOf(uniq(filter(sizes, e => typeof e === 'string'))),
    trigger: PropTypes.any,
    innerRef: PropTypes.func,
    style: PropTypes.object,
  }

  static defaultProps = {
    defaultVisible: false,
    onOpen: null,
    onClose: null,
    closable: true,
    Title: null,
    Subtitle: null,
    Image: null,
    Content: null,
    Description: null,
    Help: null,
    Scroll: null,
    Footer: null,
    Trigger: null,
    Inner: null,
    InnerWrapper: null,
    CloseIcon: null,
    className: null,
    size: sizes.medium,
    trigger: null,
    innerRef: null,
    style: {},
  }

  constructor(props) {
    super(props);
    this.state = { visible: props.defaultVisible, counter: 1 };
    this.body = React.createRef();
  }

  static getDerivedStateFromProps(props) {
    if (typeof props.visible === 'undefined') return null;
    return {
      visible: props.visible,
    };
  }

  componentDidMount() {
    // TODO: Hack. Убрать когда-нибудь
    /* eslint-disable */
    if (isTouchDevice()) {
      setInterval(() => {
        this.setState({ counter: this.state.counter + 1 });
      }, 500);
    }
    /* eslint-enable */
  }

  @autobind
  toggle() {
    if (this.state.visible) {
      if (this.props.closable) this.close();
    } else {
      this.open();
    }
  }

  @autobind
  open() {
    this.setState({ visible: true });
    if (this.props.onOpen) this.props.onOpen();
  }
  @autobind
  close() {
    if (!this.props.closable) return;
    this.setState({ visible: false });
    if (this.props.onClose) this.props.onClose();
  }

  render() {
    const Modal = {
      Title: this.props.Title || this.constructor.Title,
      Subtitle: this.props.Subtitle || this.constructor.Subtitle,
      Image: this.props.Image || this.constructor.Image,
      Content: this.props.Content || this.constructor.Content,
      Description: this.props.Description || this.constructor.Description,
      Help: this.props.Help || this.constructor.Help,
      Scroll: this.props.Scroll || this.constructor.Scroll,
      Footer: this.props.Footer || this.constructor.Footer,
      Trigger: this.props.Trigger || this.constructor.Trigger,
      Inner: this.props.Inner || this.constructor.Inner,
      InnerWrapper: this.props.InnerWrapper || this.constructor.InnerWrapper,
      CloseIcon: this.props.CloseIcon || this.constructor.CloseIcon,
    };
    const {
      className,
      size = 'default',
      closable = true,
      trigger,
      innerRef,
      style,
      ...props
    } = this.props;
    const modal = this;
    if (innerRef) innerRef(this);
    return (
      <Provider value={{ modal, Modal }}>
        <React.Fragment>
          <ReactModal
            ref={closable ? (e) => { this._modal = e; } : null}
            contentRef={closable ? (e) => {
              if (__CLIENT__ && e) {
                e.onclick = (event) => {
                  if (!event.path.includes(this.body.current)) {
                    this._modal.portal.shouldClose = true;
                    this._modal.portal.handleOverlayOnClick(event);
                  }
                };
              }
            } : null}
            isOpen={this.state.visible}
            onRequestClose={closable && this.close}
            bodyOpenClassName={bodyModalStyle}
            htmlOpenClassName={bodyModalStyle}
            style={merge(style, Modal2.defaultStyles)}
            {...pick(props, reactModalProps)}
          >
            <span style={{ opacity: 0 }}>{this.state.counter}</span>
            <div
              aria-hidden
              ref={closable && this.body}
              className={cx({
                [className]: className,
                [modalStyle]: true,
                [modalSmall]: sizes.is(size, 'small'),
                [modalNormal]: sizes.is(size, 'medium'),
                [modalLarge]: sizes.is(size, 'large'),
              })}
            >
              <If condition={closable}>
                <Modal.CloseIcon onClick={this.close} />
              </If>
              <Modal.InnerWrapper>
                <Modal.Inner {...omit(props, reactModalProps)} />
              </Modal.InnerWrapper>
            </div>
          </ReactModal>
          <If condition={trigger}>
            <Modal.Trigger type="open">{trigger}</Modal.Trigger>
          </If>
        </React.Fragment>
      </Provider>
    );
  }
}


export default Modal2;
