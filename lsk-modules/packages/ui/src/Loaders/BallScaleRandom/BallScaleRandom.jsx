import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';

import { Wrapper, Ball } from './BallScaleRandom.styles';

class BallScaleRandom extends PureComponent {
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
        {range(3).map(i => <Ball key={i} color={color} />)}
      </Wrapper>
    );
  }
}
export default BallScaleRandom;
