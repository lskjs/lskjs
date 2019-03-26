import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';
import { Wrapper, GridBall } from './BallGridPulse.styles';

class BallGridPulse extends PureComponent {
  static propTypes = {
    color: PropTypes.string,
    type: PropTypes.string.isRequired,
  };
  static defaultProps = {
    color: '#fff',
  }
  render() {
    const {
      color,
      type,
    } = this.props;
    return (
      <Wrapper>
        {range(9).map(i => <GridBall key={i} color={color} type={type} />)}
      </Wrapper>
    );
  }
}
export default BallGridPulse;
