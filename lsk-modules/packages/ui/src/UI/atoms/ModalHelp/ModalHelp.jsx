import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Help from './ModalHelp.styles';

class ModalHelp extends PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired,
    align: PropTypes.oneOf(['left', 'center', 'right']),
  }
  static defaultProps = {
    align: 'left',
  }
  render() {
    const { children, align } = this.props;
    return (
      <Help align={align} className="modal-help">{children}</Help>
    );
  }
}

export default ModalHelp;
