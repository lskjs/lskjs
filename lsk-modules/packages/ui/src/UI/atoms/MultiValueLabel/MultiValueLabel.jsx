import React, { PureComponent } from 'react';
import { MultiValue, Value } from './MultiValueLabel.styles';

class MultiValueLabel extends PureComponent {
  render() {
    const { selectProps } = this.props;
    return (
      <MultiValue>
        Выбрано <Value>({selectProps.value.length})</Value>
      </MultiValue>
    );
  }
}

export default MultiValueLabel;
