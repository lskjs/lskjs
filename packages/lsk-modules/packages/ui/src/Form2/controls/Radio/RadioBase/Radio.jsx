import React, { PureComponent } from 'react';
import autobind from 'core-decorators/lib/autobind';
import PropTypes from 'prop-types';

import Blank from 'react-icons2/mdi/checkbox-blank-circle-outline';
import Selected from 'react-icons2/mdi/checkbox-marked-circle';
import { Icon, Item } from './Radio.styles';

class Radio extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    selected: PropTypes.bool,
    value: PropTypes.any.isRequired,
    id: PropTypes.number.isRequired,
    children: PropTypes.any,
    validationState: PropTypes.oneOf(['success', 'error', 'warning']),
    disabled: PropTypes.bool,
  }
  static defaultProps = {
    onChange: null,
    selected: false,
    children: null,
    validationState: null,
    disabled: false,
  }
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
    };
  }
  componentWillReceiveProps(next) {
    const { selected } = this.props;
    if (selected !== next.selected) {
      this.setState({ selected: next.selected });
    }
  }
  @autobind handleSelect() {
    this.setState({ selected: !this.state.selected }, this.callback);
  }
  @autobind callback() {
    const { onChange, value } = this.props;
    const { selected } = this.state;
    if (onChange) onChange({ [value]: selected });
    // if (onChange) onChange(selected);
  }
  render() {
    const { selected } = this.state;
    const {
      block,
      disabled,
      validationState,
      id,
      children,
      ...otherProps
    } = this.props;

    let onChange = this.handleSelect;
    if (selected) onChange = null;
    return (

      <Item
        selected={selected}
        validationState={validationState}
        disabled={disabled}
        block={block}
      >
        <input
          {...otherProps}
          type="radio"
          id={id}
          selected={selected}
          onChange={onChange}
          disabled={disabled}
        />
        <Icon type="button" onClick={onChange} disabled={disabled}>
          {selected ? <Selected /> : <Blank />}
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
