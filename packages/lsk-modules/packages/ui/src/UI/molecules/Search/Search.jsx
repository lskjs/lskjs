 import React, { PureComponent } from 'react';
import autobind from 'core-decorators/lib/autobind';
import DebounceInput from 'react-debounce-input';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import If from 'react-if';

import CloseIcon from 'react-icons2/mdi/close';
import Magnify from 'react-icons2/mdi/magnify';

import filterProps from '../../../utils/filterProps';
import Button from '../../../Button';

import {
  Block,
  Button as ButtonStyled,
  Count,
  Input,
  Actions,
  Action,
} from './Search.styles';

class Search extends PureComponent {
  static propTypes = {
    componentClass: PropTypes.any,
    current: PropTypes.number,
    max: PropTypes.number,
    canClear: PropTypes.bool,
    onClear: PropTypes.func,
    actions: PropTypes.any,
  }
  static defaultProps = {
    componentClass: DebounceInput,
    current: 0,
    max: null,
    canClear: false,
    actions: null,
    onClear: null,
  }
  @autobind
  handleChange(event) {
    const { onChange } = this.props;
    let value = '';
    if (typeof event === 'string') {
      value = event;
    } else if (get(event, 'target.value')) {
      ({ value } = event.target);
    }
    if (onChange) onChange(value);
  }

  @autobind
  handlePress(event) {
    if (event.keyCode === 13) {
      this.handleChange(event);
    }
  }

  @autobind
  handleClick() {
    if (this.input) {
      this.handleChange(this.input.state.value);
    }
  }

  render() {
    const {
      componentClass: Tag,
      current,
      max,
      actions,
      canClear,
      onClear,
      ...props
    } = this.props;
    return (
      <Block>
        <ButtonStyled
          type="button"
          onClick={this.handleClick}
        >
          <Magnify />
        </ButtonStyled>
        <Input
          componentClass={Tag}
          ref={(e) => { this.input = e; }}
          onChange={this.handleChange}
          onKeyUp={this.handlePress}
          {...filterProps(props, Tag)}
        />
        <If condition={max}>
          <Count>
            {`${current} / ${max}`}
          </Count>
        </If>
        <Actions>
          <If condition={canClear}>
            <Action>
              <Button
                icon={<CloseIcon />}
                paint="primary"
                view="text"
                onClick={onClear}
              />
            </Action>
          </If>
          <If condition={actions}>
            <Action additional divide={max || canClear}>
              {actions}
            </Action>
          </If>
        </Actions>
      </Block>
    );
  }
}

export default Search;
