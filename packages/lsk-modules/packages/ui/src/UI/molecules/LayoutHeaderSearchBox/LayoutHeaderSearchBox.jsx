import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'antd/lib/icon';
import cx from 'classnames';
import LayoutHeaderListItem from '../../atoms/LayoutHeaderListItem';
import {
  Inner,
  IconWrapper,
  Bar,
  Input,
  searchStyle,
} from './LayoutHeaderSearchBox.styles';

class LayoutHeaderSearchBox extends Component {
  static propTypes = {
    right: PropTypes.bool,
  }
  static defaultProps = {
    right: false,
  }
  render() {
    const { right, ...props } = this.props;
    return (
      <LayoutHeaderListItem
        componentClass="li"
        className={cx([searchStyle, 'd-none', 'd-md-inline-block'])}
      >
        <Inner>
          <IconWrapper right={right}>
            <Icon type="search" />
          </IconWrapper>
          <Input type="text" right={right} {...props} />
          <Bar />
        </Inner>
      </LayoutHeaderListItem>
    );
  }
}

export default LayoutHeaderSearchBox;
