import React, { PureComponent } from 'react';
import autobind from 'core-decorators/lib/autobind';
import PropTypes from 'prop-types';
import {
  Label,
  Handler,
  Block,
  Wrap,
} from './Switcher.styles';

class Switcher extends PureComponent {
  static propTypes = {
    value: PropTypes.bool,
    onChange: PropTypes.func,
    validationState: PropTypes.oneOf(['success', 'warning', 'error']),
  }
  static defaultProps = {
    value: false,
    onChange: null,
    validationState: null,
  }
  @autobind handleChange() {
    const { onChange, value } = this.props;
    if (onChange) onChange(!value);
  }
  render() {
    const {
      value, label, checkedTitle, reversed, styleSwitcher, disabled, validationState,
    } = this.props;
    // let text = t(`common.switch.${value ? 'on' : 'off'}`);
    let text = null;
    if (label || checkedTitle) {
      text = (value && checkedTitle) ? checkedTitle : label;
    }
    return (
      <Wrap disabled={disabled}>
        {!reversed &&
        <div>
          {text && <Label>{text}</Label>}
        </div>
        }
        <Block
          type="button"
          checked={value}
          onClick={this.handleChange}
          style={styleSwitcher}
          disabled={disabled}
          validationState={validationState}
        >
          <Handler />
        </Block>
        {reversed &&
        <div>
          {text && <Label>{text}</Label>}
        </div>
        }
      </Wrap>
    );
  }
}

export default Switcher;
