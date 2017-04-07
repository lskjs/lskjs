import React, { PureComponent, PropTypes } from 'react';
import css from 'importcss';

@css(require('./KeyValue.css'))
export default class KeyValue extends PureComponent {
  static defaultProps = {
    name: '',
    value: '',
  }
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
  }
  render() {
    const { name, value } = this.props;
    return (
      <p styleName="tag">
        <span styleName="key">{name}</span>
        <span styleName="value">{value}</span>
      </p>
    );
  }
}
