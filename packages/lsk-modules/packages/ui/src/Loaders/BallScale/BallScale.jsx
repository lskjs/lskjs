import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Scale from './BallScale.styles';

class BallScale extends PureComponent {
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
      <Scale color={color} />
    );
  }
}
export default BallScale;
