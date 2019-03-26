import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Wrapper, RotateBall } from './BallRotate.styles';

class BallRotate extends PureComponent {
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
        <RotateBall color={color} />
      </Wrapper>
    );
  }
}

export default BallRotate;
