import React, { Component } from 'react';
import ASlider from 'antd/lib/slider';
import cx from 'classnames';

class Slider extends Component {
  render() {
    const {
      inverseTrack, styleWrapper = {}, graphs, ...props
    } = this.props;
    return (
      <div
        className={cx({
          'buzz-slider': true,
          'with-graphs': graphs,
          'buzz-slider-inverse-track': inverseTrack,
        })}
        style={styleWrapper}
      >
        <ASlider {...props} />
      </div>
    );
  }
}

export default Slider;
