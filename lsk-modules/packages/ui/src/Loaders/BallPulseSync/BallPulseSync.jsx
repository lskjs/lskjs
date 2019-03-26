import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';

import PulseSync from './BallPulseSync.styles';

class BallPulseSync extends PureComponent {
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
        {range(3).map(i => <PulseSync key={i} color={color} />)}
      </div>
    );
  }
}
export default BallPulseSync;
