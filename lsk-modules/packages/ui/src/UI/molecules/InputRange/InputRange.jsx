import React, { PureComponent } from 'react';
import autobind from 'core-decorators/lib/autobind';
import PropTypes from 'prop-types';
import Numeric from 'react-numeric-input';

import Input from '../../../Input';
import { elInput, El, Block } from './InputRange.styles';
import filterProps from '../../../utils/filterProps';

class InputRange extends PureComponent {
  static propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func,
    validationState: PropTypes.any,
    max: PropTypes.number,
    min: PropTypes.number,
    minProps: PropTypes.object,
    maxProps: PropTypes.object,
  }
  static defaultProps = {
    value: [null, null],
    minProps: {},
    maxProps: {},
    onChange: null,
    validationState: null,
    max: null,
    min: null,
  }
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }
  componentWillReceiveProps(next) {
    if (this.props.value[0] !== next.value[0] || this.props.value[1] !== next.value[1]) {
      this.setState({ value: next.value });
    }
  }
  @autobind changeFrom(e) {
    const { value } = this.state;
    this.setState({ value: [e, value[1]] }, this.callback);
  }
  @autobind changeTo(e) {
    const { value } = this.state;
    this.setState({ value: [value[0], e] }, this.callback);
  }
  @autobind callback() {
    const { value } = this.state;
    const { onChange } = this.props;
    if (onChange) onChange(value);
  }
  render() {
    const { value } = this.state;
    const {
      validationState, min, max, minProps, maxProps,
    } = this.props;
    const [from, to] = value;
    return (
      <Block>
        <El>
          <Input
            validationState={validationState}
            className={elInput}
            componentClass={Numeric}
            onChange={this.changeFrom}
            placeholder={min}
            value={from}
            max={to || max}
            min={min}
            {...filterProps(minProps, Numeric)}
            // {...minProps}
          />
        </El>
        -
        <El>
          <Input
            validationState={validationState}
            className={elInput}
            componentClass={Numeric}
            onChange={this.changeTo}
            placeholder={max}
            value={to}
            max={max}
            min={from || min}
            {...filterProps(maxProps, Numeric)}
            // {...maxProps}
          />
        </El>
      </Block>
    );
  }
}

export default InputRange;
