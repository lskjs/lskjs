import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';

import { Wrapper, TriangleTrace } from './BallsTriangleTrace.styles';

class BallsTriangleTrace extends PureComponent {
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
        {range(3).map(i => <TriangleTrace key={i} color={color} />)}
      </Wrapper>
    );
  }
}

export default BallsTriangleTrace;
