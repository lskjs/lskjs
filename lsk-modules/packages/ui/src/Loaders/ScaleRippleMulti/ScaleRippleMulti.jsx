import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';

import { Wrapper, RippleScale } from './ScaleRippleMulti.styles';

class ScaleRipple extends PureComponent {
  static propTypes = {
    color: PropTypes.string,
  };
  static defaultProps = {
    color: '#fff',
  };
  render() {
    const {
      color,
    } = this.props;
    return (
      <Wrapper>
        {range(5).map(i => <RippleScale key={i} color={color} />)}
      </Wrapper>
    );
  }
}
export default ScaleRipple;
