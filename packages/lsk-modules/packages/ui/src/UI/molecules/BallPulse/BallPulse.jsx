import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Pulse from './BallPulse.styles';

class BallPulse extends PureComponent {
  static propTypes = {
    color: PropTypes.string,
  };
  static defaultProps = {
    color: '#fff',
  }
  render() {
    const {
      color,
    } = this.props;
    return (
      <Pulse color={color}>
        <div />
        <div />
        <div />
      </Pulse>
    );
  }
}
export default BallPulse;
