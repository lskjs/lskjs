import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Ripple from './ScaleRipple.styles';

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
      <Ripple color={color} />
    );
  }
}
export default ScaleRipple;
