import React, { PureComponent } from 'react';
import If from 'react-if';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Close from 'react-icons2/mdi/close';

import Button from '../../../Button';
import LskModal from '../../../Modal';
import ModalSubtitle from '../../atoms/ModalSubtitle';
import ModalDescription from '../../atoms/ModalDescription';
import ModalContent from '../../atoms/ModalContent';
import ModalFooter from '../../atoms/ModalFooter';
import ModalImage from '../../atoms/ModalImage';
import ModalHelp from '../../atoms/ModalHelp';
import ModalScroll from '../../organisms/ModalScroll';
import ModalTitle from '../ModalTitle';

import closeButtonStyle from './Modal.styles';

class Modal extends PureComponent {
  static Subtitle = ModalSubtitle;
  static Description = ModalDescription;
  static Content = ModalContent;
  static Footer = ModalFooter;
  static Image = ModalImage;
  static Help = ModalHelp;
  static Title = ModalTitle;
  static Scroll = ModalScroll;
  static propTypes = {
    trigger: PropTypes.any,
    title: PropTypes.any,
    color: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.any,
    footer: PropTypes.any,
    onEdit: PropTypes.func,
    subHeader: PropTypes.any,
    innerRef: PropTypes.func,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    disabled: PropTypes.bool,
    small: PropTypes.bool,
    body: PropTypes.any,
    closable: PropTypes.bool,
    closeComponent: PropTypes.func,
    size: PropTypes.oneOf(['small', 'default', 'large']),
    closeOnBackdrop: PropTypes.bool,
  }
  static defaultProps = {
    trigger: <React.Fragment />,
    title: null,
    color: null,
    children: null,
    footer: null,
    onEdit: null,
    className: null,
    subHeader: null,
    innerRef: null,
    disabled: false,
    small: false,
    body: null,
    onClose: null,
    onOpen: null,
    size: 'default',
    closable: true,
    closeComponent: null,
    closeOnBackdrop: true,
  }
  render() {
    const {
      trigger,
      title,
      color,
      children,
      footer,
      onEdit,
      size,
      subHeader,
      innerRef,
      disabled,
      body,
      small,
      className,
      onClose,
      onOpen,
      closable,
      closeComponent,
      closeOnBackdrop,
      ...props
    } = this.props;
    if (disabled) {
      return trigger;
    }
    let contentProps = {};
    if (!closable || !closeOnBackdrop) {
      contentProps = {
        backdrop: 'static',
        onHide: null,
      };
    }
    if (!closable) {
      contentProps = {
        ...contentProps,
        onExit: null,
        keyboard: false,
      };
    }
    return (
      <LskModal
        ref={(modal) => {
          this.modal = modal;
          if (innerRef) innerRef(modal);
        }}
        onClose={() => {
          if (onClose) onClose(this.modal);
        }}
        onOpen={() => {
          if (onOpen) onOpen(this.modal);
        }}
        {...props}
      >
        <If condition={trigger}>
          <LskModal.Trigger>
            {trigger}
          </LskModal.Trigger>
          <LskModal.Content
            dialogClassName={cx({
              [className]: className,
              'modal-container': true,
              [`modal-container-${size}`]: size,
            })}
            {...contentProps}
          >
            <If condition={closable}>
              {closeComponent?.(this.modal) || (
                <Button
                  type="button"
                  paint="primary"
                  icon={<Close />}
                  onClick={() => this.modal.close()}
                  className={closeButtonStyle}
                />
              )}
            </If>
            <div className="modal-composer">
              {children}
            </div>
          </LskModal.Content>
        </If>
      </LskModal>
    );
  }
}

export default Modal;
