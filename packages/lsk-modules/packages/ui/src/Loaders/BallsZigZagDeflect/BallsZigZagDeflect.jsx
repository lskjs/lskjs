import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';

import { Wrapper, ZigZagDeflect } from './BallsZigZagDeflect.styles';

class BallsZigZagDeflect extends PureComponent {
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
        {range(2).map(i => <ZigZagDeflect key={i} color={color} />)}
      </Wrapper>
    );
  }
}

export default BallsZigZagDeflect;
