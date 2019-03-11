import React, { Component } from 'react';
import autobind from 'core-decorators/lib/autobind';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import toNumber from 'lodash/toNumber';
import isFinite from 'lodash/isFinite';
import NonChecked from 'react-icons2/mdi/checkbox-blank-circle-outline';
import Checked from 'react-icons2/mdi/checkbox-marked-circle';
import Close from 'react-icons2/mdi/close';

import { Frame, Title, InputWrapper, Input, Clear, Actions, Action } from './PriceConverter.styles';

const types = ['excludeComission', 'includeComission'];

@inject('t')
@observer
class PriceConverter extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    value: PropTypes.shape({
      price: PropTypes.any,
      type: PropTypes.oneOf(types),
    }),
    onChange: PropTypes.func,
  }
  static defaultProps = {
    value: {
      price: '',
      type: types[0],
    },
    onChange: null,
  }
  constructor(props) {
    super(props);
    this.state = {
      type: props.value.type || PriceConverter.defaultProps.value.type,
      value: props.value.price || PriceConverter.defaultProps.value.price,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value, type } = this.state;
    const state = {};
    if (value !== nextProps.value.price) {
      state.value = nextProps.value.price;
    }
    if (type !== nextProps.value.type) {
      state.type = nextProps.value.type;
    }
    if (Object.keys(state).length > 0) {
      this.setState(state);
    }
  }

  // @autobind
  // handleChange(val, action) {
  //   const { type, value } = this.state;
  //   if ((action === type) || (val === value)) return;
  //   const state = { type, value };
  //   if (typeof val === 'number') state.value = val;
  //   if (action) state.type = action;
  //   this.setState(state, this.callback);
  // }
  @autobind
  handleChangePrice(newValue) {
    const { value } = this.state;
    // console.log({ newValue, value });
    if (newValue === value) return;
    const state = { value };
    if (isFinite(toNumber(newValue))) state.value = newValue;
    this.setState(state, this.callback);
  }

  @autobind
  handleChangeAction(newType) {
    const { type } = this.state;
    if ((newType === type)) return;
    const state = { ...this.state, type };
    if (newType) state.type = newType;
    this.setState(state, this.callback);
  }

  @autobind
  handleClearValue() {
    this.setState({ value: '' }, this.callback);
  }

  @autobind
  callback() {
    const { value, type } = this.state;
    const { onChange } = this.props;
    if (onChange) {
      onChange({
        price: /[0-9+]\.$/.test(value) ? value : toNumber(value),
        type,
      });
    }
  }

  render() {
    const { type, value } = this.state;
    const { t } = this.props;
    return (
      <Frame>
        <Title>{t('priceConverter.title')}, $</Title>
        <InputWrapper>
          <Input
            // prefix="$"
            // selectAllOnFocus
            // autoFocus
            // precision={2}
            value={value}
            // onChangeEvent={(event, masked, float) => this.handleChange(float)}
            onChange={this.handleChangePrice}
          />
          <Clear
            type="button"
            visible={value !== 0}
            onClick={this.handleClearValue}
          >
            <Close />
          </Clear>
        </InputWrapper>
        <Actions>
          {types.map(key => (
            <Action
              key={key}
              type="button"
              onClick={() => {
                this.handleChangeAction(key);
              }}
              active={type === key}
            >
              {type === key ? <Checked /> : <NonChecked />}
              {t(`priceConverter.${key}`)}
            </Action>
          ))}
        </Actions>
      </Frame>
    );
  }
}

export default PriceConverter;
