import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';

import PulseRise from './BallPulseRise.styles';

class BallPulseRise extends PureComponent {
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
        {range(5).map(i => <PulseRise key={i} color={color} />)}
      </div>
    );
  }
}
export default BallPulseRise;
