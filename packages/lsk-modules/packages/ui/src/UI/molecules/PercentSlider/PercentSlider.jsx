import React, { Component } from 'react';
import debounce from 'lodash-decorators/debounce';
import PropTypes from 'prop-types';
import ASlider from 'antd/lib/slider';
import { Wrapper, Value, SliderWrapper } from './PercentSlider.styles';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }
  @debounce(100)
  handleChange(value) {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  }
  render() {
    const { onChange, ...props } = this.props;
    const { value } = this.state;
    return (
      <Wrapper>
        <Value>{value}%</Value>
        <SliderWrapper>
          <ASlider
            onChange={(e) => {
              this.setState({ value: e });
              this.handleChange(e);
            }}
            {...props}
            value={value}
          />
        </SliderWrapper>
      </Wrapper>
    );
  }
}
// const Slider = ({ value, onChange, ...props }) => (
//   <Wrapper>
//     <Value>{value}%</Value>
//     <SliderWrapper>
//       <ASlider
//         onChange={onChange}
//         defaultValue={value}
//         {...props}
//       />
//     </SliderWrapper>
//   </Wrapper>
// );

Slider.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
};

Slider.defaultProps = {
  value: 0,
  onChange: null,
};

export default Slider;
