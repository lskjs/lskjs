import React, { PureComponent } from 'react';
import autobind from 'core-decorators/lib/autobind';
import PropTypes from 'prop-types';

import Blank from 'react-icons2/mdi/checkbox-blank-circle-outline';
import Selected from 'react-icons2/mdi/checkbox-marked-circle';
import { Icon, Item } from './Radio.styles';

class Radio extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    value: PropTypes.any.isRequired,
    id: PropTypes.number.isRequired,
    children: PropTypes.any,
    validationState: PropTypes.oneOf(['success', 'error', 'warning']),
    disabled: PropTypes.bool,
  }
  static defaultProps = {
    onChange: null,
    checked: false,
    children: null,
    validationState: null,
    disabled: false,
  }
  constructor({ checked }) {
    super();
    this.state = {
      checked,
    };
  }
  componentWillReceiveProps(next) {
    const { checked } = this.props;
    if (checked !== next.checked) {
      this.setState({ checked: next.checked });
    }
  }
  @autobind
  handleSelect() {
    const { onChange } = this.props;
    onChange(true);
    this.setState({ checked: true });
  }
  render() {
    const { checked } = this.state;
    const {
      block,
      disabled,
      validationState,
      id = `r${Math.random()}`,
      children,
      ...otherProps
    } = this.props;
    return (
      <Item
        selected={checked}
        validationState={validationState}
        disabled={disabled}
        block={block}
        {...otherProps}
      >
        <input
          // {...otherProps}
          type="radio"
          id={id}
          selected={checked}
          onChange={this.handleSelect}
          disabled={disabled}
        />
        <Icon type="button" onClick={this.handleSelect} disabled={disabled}>
          {checked ? <Selected /> : <Blank />}
          <label // eslint-disable-line
            htmlFor={id}
          >
            {children}
          </label>
        </Icon>
      </Item>
    );
  }
}

export default Radio;
