import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';

import PulseOut from './LinePulseOut.styles';

class LinePulseOut extends PureComponent {
  static propTypes = {
    color: PropTypes.string,
    type: PropTypes.string.isRequired,
  };
  static defaultProps = {
    color: '#fff',
  };
  render() {
    const {
      color,
      type,
    } = this.props;
    return (
      <div>
        {range(5).map(i => <PulseOut key={i} color={color} type={type} />)}
      </div>
    );
  }
}
export default LinePulseOut;
