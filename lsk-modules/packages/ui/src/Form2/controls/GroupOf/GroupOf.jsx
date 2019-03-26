import React, { Component } from 'react';
import isFunction from 'lodash/isFunction';
import { getOptionValue, getReverseOptionValue, getNormalizedOptions, NULL_STRING } from '../Select/utils';

const DefaultItemComponent = () => 'itemComponent';
class GroupOf extends Component {
  getOptions() {
    const {
      options = [], itemComponent: ItemComponent = DefaultItemComponent, itemProps, ...props
    } = this.props;
    const normalizedOptions = getNormalizedOptions(options, props);
    return normalizedOptions.map(option => ({
      option,
      Component: props2 => (
        <ItemComponent
          {...itemProps}
          {...option}
          value={this.isChecked(option)}
          onChange={checked => this.handleChange({ checked, option })}

          {...props2}
        />
      ),
    }));
  }
  isChecked(option) {
    const { field: { value }, isMulti = false } = this.props;
    // const value = field && field.value;
    const optionValue = getReverseOptionValue(option.value);
    if (isMulti) {
      return (value || []).includes(optionValue);
    }
    return value === optionValue;
  }
  handleChange({ option, checked }) {
    const { form, field, isMulti = false } = this.props;
    const optionValue = getReverseOptionValue(option.value);
    if (!isMulti) {
      if (checked) {
        form.setFieldValue(field.name, optionValue);
      } else {
        form.setFieldValue(field.name, null);
      }
      return;
    }
    const { value = [] } = field;
    let newValue;
    if (checked) {
      newValue = [...value, optionValue];
    } else {
      newValue = value.filter(val => val !== optionValue);
    }
    form.setFieldValue(field.name, newValue);
  }
  render() {
    const { render2 } = this.props;
    // console.log({ render2 }, this.props);

    if (render2 && !isFunction(render2)) {
      return render2;
    }
    const options = this.getOptions();
    if (!render2) {
      return options.map(({ Component }) => <Component />);
    }
    return render2({ options });
  }
}

export default GroupOf;
