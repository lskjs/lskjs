import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';

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
      <div>
        {range(3).map(i => <Pulse key={i} color={color} />)}
      </div>
    );
  }
}
export default BallPulse;
