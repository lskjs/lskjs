import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Block from './Column.styles';

class Column extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    double: PropTypes.bool,
    full: PropTypes.bool,
    auto: PropTypes.bool,
    mini: PropTypes.bool,
    half: PropTypes.bool,
    noFlex: PropTypes.bool,
  }
  static defaultProps = {
    children: null,
    double: false,
    full: false,
    auto: false,
    mini: false,
    half: false,
    noFlex: false,
  }
  render() {
    const {
      half, mini, children, double, full, auto, noFlex, grid,
    } = this.props;
    return (
      <Block
        double={double}
        full={full}
        mini={mini}
        auto={auto}
        half={half}
        grid={grid}
        noFlex={noFlex}
      >
        {children}
      </Block>
    );
  }
}

export default Column;
