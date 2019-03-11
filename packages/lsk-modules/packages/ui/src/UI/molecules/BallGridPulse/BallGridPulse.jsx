import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import GridPulse from './BallGridPulse.styles';

class BallGridPulse extends PureComponent {
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
      <GridPulse color={color}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </GridPulse>
    );
  }
}
export default BallGridPulse;
