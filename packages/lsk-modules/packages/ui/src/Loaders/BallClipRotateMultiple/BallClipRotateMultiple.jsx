import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Wrapper, External, Internal } from './BallClipRotateMultiple.styles';

class BallClipRotateMultiple extends PureComponent {
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
        <External color={color} />
        <Internal color={color} />
      </Wrapper>
    );
  }
}
export default BallClipRotateMultiple;
