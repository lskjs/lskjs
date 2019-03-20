import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';

import Beat from './BallBeat.styles';

class BallBeat extends PureComponent {
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
        {range(3).map(i => <Beat key={i} color={color} />)}
      </div>
    );
  }
}
export default BallBeat;
