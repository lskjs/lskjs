import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';
import { ValueBlock, Value } from './CollapsedMultiValue.styles';

class CollapsedMultiValue extends Component {
  static sCUFields = [
    'isDisabled',
    'isFocused',
    'selectProps.value.length',
    'isSelected',
  ]
  shouldComponentUpdate(nextProps) {
    const { props } = this;
    const { sCUFields } = this.constructor;
    const params = pick(props, sCUFields);
    const nextParams = pick(nextProps, sCUFields);
    return !isEqual(params, nextParams);
  }
  render() {
    const { selectProps } = this.props;
    return (
      <ValueBlock>
        Выбрано <Value>({selectProps.value.length})</Value>
      </ValueBlock>
    );
  }
}

export default CollapsedMultiValue;
