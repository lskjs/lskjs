import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';

import { Wrapper, SpinLine } from './LineSpin.styles';

class LineSpin extends PureComponent {
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
        {range(8).map(i => <SpinLine key={i} color={color} />)}
      </Wrapper>
    );
  }
}
export default LineSpin;
