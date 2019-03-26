import React from 'react';
// import PropTypes from 'prop-types';
import autobind from 'core-decorators/lib/autobind';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import DebounceInput from 'react-debounce-input';
import { debounce } from 'lodash-decorators';
import { FormControl } from 'react-bootstrap';

import Input from '../../../Input';
import inputArrayStyles from './InputArray.styles';

class InputArray extends React.Component {
  constructor(props) {
    super(props);
    const val = (props.value || props.defaultValue);
    const value = isEmpty(val) ? [''] : val;
    // console.log({ value }, props.value, props.defaultValue);
    this.state = {
      value,
      // maxCount: this.props.maxCount,
    };
  }

  //
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      // Perform some operation
      this.setState({ value: nextProps.value });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(nextProps.value, this.props.value) || !isEqual(nextState.value, this.state.value);
  }

  @debounce(100)
  onChangeDebounced() {
    this.onChange();
  }

  @autobind
  onChange() {
    const { value } = this.state;
    if (this.props.onChange) this.props.onChange((value || []).filter(a => a));
  }

  @autobind
  onChangeHandler(i, val) {
    const value = [...this.state.value];
    value[i] = val;

    this.setState({
      value,
    }, () => {
      this.onChangeDebounced();
    });
  }

  @autobind
  onBlurHandler(i) {
    if (this.state.value.length > 1) {
      if (this.state.value[i] === '') {
        const value = [...this.state.value];
        value.splice(i, 1);

        this.setState({
          value,
        }, () => {
          this.onChangeDebounced();
        });
      }
    }
  }


  getValues() {
    const value = this.state.value || [];
    if (value.length >= this.props.maxCount) {
      return value;
    }
    if (value.length === 0) {
      return [''];
    }
    if (value[value.length - 1] !== '') {
      return [
        ...value,
        '',
      ];
    }
    return value;
  }


  render() {
    // __DEV__ && console.log('props', this.props);
    const { component, ...props } = this.props;
    if (component === 'bootstrap') {
      return (
        <div>
          {this.getValues().map((val, i) => {
            return (
              <FormControl
                key={i} // eslint-disable-line
                className={inputArrayStyles}
                componentClass={DebounceInput}
                // debounceTimeout={100}
                type="text"
                value={val}
                // placeholder={min}
                onChange={e => this.onChangeHandler(i, e)}
                onBlur={() => this.onBlurHandler(i)}
                // min={disabled ? null : min}
                // max={disabled ? null : valueRight - 1}
                // disabled={disabled}
              />
              // <input type="text" key={i} value={val} onChange={e => this.onChangeHandler(i, e.target.value)}
              //   onBlur={() => this.onBlurHandler(i)}
              // />
            );
          })}
        </div>
      );
    }

    return (
      <div>
        {this.getValues().map((val, i) => {
          return (
            <Input
              key={i} // eslint-disable-line
              className={inputArrayStyles}
              block
              componentClass={DebounceInput}
              {...props}
              value={val}
              onChange={e => this.onChangeHandler(i, e)}
              onBlur={() => this.onBlurHandler(i)}
            />
          );
        })}
      </div>
    );
  }
}

export default InputArray;
