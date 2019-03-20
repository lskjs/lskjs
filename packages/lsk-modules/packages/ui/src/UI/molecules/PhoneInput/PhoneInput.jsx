import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import PhoneInputInner from './PhoneInputInner';

@inject('t')
@observer
class PhoneInput extends Component {
  static propTypes = {
    value: PropTypes.string,
  }
  static defaultProps = {
    value: '',
  }
  render() {
    const { value } = this.props;
    return (
      <PhoneInputInner
        {...this.props}
        value={value}
      />
    );
  }
}

export default PhoneInput;
