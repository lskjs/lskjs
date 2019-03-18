import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ClipRotate from './BallClipRotate.styles';

class BallClipRotate extends PureComponent {
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
      <ClipRotate color={color} />
    );
  }
}
export default BallClipRotate;
