import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Spinner, BounceOne, BounceTwo, BounceThree } from './LoadingDots.styles';

class LoadingDots extends PureComponent {
  static propTypes = {
    color: PropTypes.string,
  }
  static defaultProps = {
    color: '#fff',
  }
  render() {
    const { color } = this.props;
    return (
      <Spinner color={color}>
        <BounceOne />
        <BounceTwo />
        <BounceThree />
      </Spinner>
    );
  }
}

export default LoadingDots;
