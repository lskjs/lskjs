import React, { Component } from 'react';
import If from 'react-if';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import autobind from 'core-decorators/lib/autobind';
import { debounce } from 'lodash-decorators';
import DebounceInput from 'react-debounce-input';

import UsdIcon from 'react-icons2/mdi/currency-usd';

import round from 'lodash/round';
import { ControlLabel } from 'react-bootstrap';
import Input from '../../../Input';
import Row from '../Row';
import Column from '../Column';

import InputGroup from '../InputGroup';
import PriceInputStore from './PriceInputStore';
import {
  InlineGroup,
  InlineBlock,
  InputsBlock,
  ComissionBlock,
} from './PriceInput.styles';

@inject('t')
@observer
class PriceInput extends Component {
  static propTypes = {
    title1: PropTypes.string,
    title2: PropTypes.string,
    max: PropTypes.number,
    // value: PropTypes.number,
    rate: PropTypes.number,
    dots: PropTypes.bool,
    single: PropTypes.bool,
    disabled: PropTypes.bool,
    reverse: PropTypes.bool,
    required: PropTypes.bool,
    onChange: PropTypes.string,
  };
  static defaultProps = {
    title1: null,
    title2: null,
    max: 75000,
    // value: 0,
    rate: 2,
    dots: true,
    single: false,

    onChange: null,
    disabled: false,
    reverse: false,
    required: false,
  };

  constructor(props) {
    super(props);
    this.store = new PriceInputStore(props);
    this.store2 = new PriceInputStore({
      rate: 0.85,

    });
  }

  componentWillReceiveProps(props) {
    this.store.update(props);
  }

  @autobind
  onInputFilterValue(e) {
    // this.props.filter
    const dots = !this.props.dots ? '\\.\\,' : '';// this.dots// \.\,
    const regExp = new RegExp(`[^0-9${dots}]`, 'g');
    e.target.value = Number(e.target.value.replace(regExp, ''));
  }

  onChange() {
    const { onChange } = this.props;
    // console.log('onChange', this.store.toJS());
    if (onChange) onChange(this.store.toJS());
  }

  @debounce(800)
  handleChangeValue(value) {
    // console.log({value});
    if (this.store) this.store.set('value', value);
    this.onChange();
  }

  @debounce(800)
  handleChangeResult(value) {
    if (this.store) this.store.set('result', value);
    this.onChange();
  }

  @debounce(800)
  handleChangeResult2(value) {
    if (this.store) this.store.set('result2', value);
    this.onChange();
  }

  render() {
    const {
      validationState,
      rate,
      taxRate,
      reverse,
      max,
      disabled,
      title1,
      title2,
      title3,
      help,
      t,
      single,
      required,
      small,
      borderInput2,
    } = this.props;
    const data = this.store.toJS();
    const params = {
      ...data,
      taxRate: taxRate ? taxRate * 100 : null,
      fee: Math.abs(data.fee || 0).toString(),
    };

    const value = this.store.value ? round(this.store.value, 2) : '';
    const result = this.store.result ? round(this.store.result, 2) : '';
    const result2 = this.store.result2 ? round(this.store.result2, 2) : '';

    let fields = [
      <Column half key={1}>
        <InlineGroup key="price" controlId="price">
          <If condition={title1}>
            <ControlLabel>{required ? '* ' : ''}{t(title1)}</ControlLabel>
          </If>
          {/* {round(this.store.value || 0, 2) || 0} */}
          <InputGroup>
            <Input
              block
              leftIcon={<UsdIcon size={24} />}
              data-max={max}
              max={max}
              disabled={disabled}
              componentClass={DebounceInput}
              value={value}
              placeholder="0"
              validationState={validationState}
              onChange={e => this.handleChangeValue(e)}
            />
          </InputGroup>
        </InlineGroup>
      </Column>,
      <Column half key={2}>
        <InlineGroup key="payment" controlId="payment">
          <If condition={title2}>
            <ControlLabel>{required ? '* ' : ''}{t(title2)}</ControlLabel>
          </If>
          <InputGroup>
            <Input
              block
              leftIcon={<UsdIcon size={24} />}
              data-max={max * rate}
              max={max * rate}
              disabled={disabled}
              componentClass={DebounceInput}
              value={result}
              placeholder="0"
              validationState={validationState}
              onChange={e => this.handleChangeResult(e)}
              style={borderInput2 ? {
                borderColor: borderInput2,
              } : {}}
            />
          </InputGroup>
        </InlineGroup>
      </Column>,
      <If condition={title3}>
        <Column half key={3}>
          <InlineGroup key="payment" controlId="payment">
            <If condition={title2}>
              <ControlLabel>{required ? '* ' : ''}{t(title3)}</ControlLabel>
            </If>
            <InputGroup>
              <Input
                block
                leftIcon={<UsdIcon size={24} />}
                data-max={max * 0.85}
                max={max * 0.85}
                disabled={disabled}
                componentClass={DebounceInput}
                value={result2}
                placeholder="0"
                validationState={validationState}
                onChange={e => this.handleChangeResult2(e)}
                style={borderInput2 ? {
                  borderColor: borderInput2,
                } : {}}
              />
            </InputGroup>
          </InlineGroup>
        </Column>
      </If>,
    ];
    if (single) {
      fields = [fields[0]];
    }
    if (reverse) fields = fields.reverse();
    return (
      <InlineBlock>
        <InputsBlock>
          <Row>
            {fields}
          </Row>
        </InputsBlock>
        <If condition={help}>
          <ComissionBlock
            small={small}
          >
            {t(help, params)}
          </ComissionBlock>
        </If>
      </InlineBlock>
    );
  }
}

export default PriceInput;
