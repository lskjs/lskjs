import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import autobind from 'core-decorators/lib/autobind';
import If from 'react-if';

import CheckboxBlank from 'react-icons2/mdi/checkbox-blank-outline';
import CheckboxCheck from 'react-icons2/mdi/checkbox-marked';

import RadioBlank from 'react-icons2/mdi/checkbox-blank-circle-outline';
import RadioCheck from 'react-icons2/mdi/checkbox-marked-circle';

import {
  Additional,
  General,
  Block,
  Icon,
  Item,
  Header,
  Label,
  Footer,
  Info,
} from './ExtendedCheckblock.styles';

class ExtendedCheckblock extends PureComponent {
  static propTypes = {
    value: PropTypes.bool,
    block: PropTypes.bool,
    children: PropTypes.any,
    label: PropTypes.string.isRequired,
    validationState: PropTypes.oneOf(['success', 'warning', 'error']),
    info: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    type: PropTypes.oneOf(['radio', 'checkbox']),
  }
  static defaultProps = {
    value: false,
    block: false,
    info: null,
    onChange: null,
    validationState: null,
    children: null,
    disabled: false,
    type: 'checkbox',
  }
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }
  componentWillReceiveProps(next) {
    const { value } = this.props;
    if (value !== next.value) {
      this.setState({ value: next.value });
    }
  }
  @autobind handleClick() {
    this.setState({ value: !this.state.value }, this.callback);
  }
  @autobind callback() {
    const { onChange } = this.props;
    const { value } = this.state;
    if (onChange) onChange(value);
  }
  render() {
    const { value } = this.state;
    const {
      children,
      label,
      validationState,
      info,
      disabled,
      block,
      type,
    } = this.props;
    const checkIcon = type === 'checkbox' ? <CheckboxCheck /> : <RadioCheck />;
    const blankIcon = type === 'checkbox' ? <CheckboxBlank /> : <RadioBlank />;
    return (
      <Block
        checked={value}
        disabled={disabled}
      >
        <General>
          <Item
            error={validationState === 'error'}
            block={block}
            onClick={this.handleClick}
            disabled={disabled}
            type="button"
          >
            <Header>
              <Icon>
                {value ? checkIcon : blankIcon}
              </Icon>
              <Label>{label}</Label>
            </Header>
            <If condition={info}>
              <Footer>
                <Info>
                  {info}
                </Info>
              </Footer>
            </If>
          </Item>
        </General>
        <If condition={children}>
          <Additional>
            {children}
          </Additional>
        </If>
      </Block>
    );
  }
}

export default ExtendedCheckblock;
