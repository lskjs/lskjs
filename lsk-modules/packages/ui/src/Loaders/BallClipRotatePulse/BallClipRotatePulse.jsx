import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Ball, BorderRotate } from './BallClipRotatePulse.styles';

class BallClipRotatePulse extends PureComponent {
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
      <Wrapper>
        <Ball color={color} />
        <BorderRotate color={color} />
      </Wrapper>
    );
  }
}
export default BallClipRotatePulse;
