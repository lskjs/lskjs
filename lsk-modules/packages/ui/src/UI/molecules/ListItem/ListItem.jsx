import React, { Component } from 'react';
import Icon from 'antd/lib/icon';
import If from 'react-if';
import PropTypes from 'prop-types';
import ListItemIcon from '../../atoms/ListItemIcon';
import ListItemInner from '../../atoms/ListItemInner';
import ListItemBody from '../../atoms/ListItemBody';
import ListItemTitle from '../../atoms/ListItemTitle';
import ListItemDescription from '../../atoms/ListItemDescription';
import ListItemDate from '../../atoms/ListItemDate';
import Wrapper from './ListItem.styles';

class ListItem extends Component {
  static propTypes = {
    icon: PropTypes.string,
    iconProps: PropTypes.object,
    title: PropTypes.any,
    description: PropTypes.any,
    date: PropTypes.any,
    leftComponent: PropTypes.element,
  }
  static defaultProps = {
    icon: null,
    iconProps: {},
    title: null,
    description: null,
    date: null,
    leftComponent: null,
  }
  render() {
    const {
      icon,
      iconProps,
      title,
      description,
      date,
      leftComponent,
      ...props
    } = this.props;
    return (
      <Wrapper {...props}>
        <ListItemInner>
          <div className="mr-3">
            <If condition={icon && !leftComponent}>
              <ListItemIcon {...iconProps}>
                <Icon type={icon} />
              </ListItemIcon>
            </If>
            <If condition={leftComponent && !icon}>
              {leftComponent}
            </If>
          </div>
          <ListItemBody>
            <If condition={title}>
              <ListItemTitle>{title}</ListItemTitle>
            </If>
            <If condition={description}>
              <ListItemDescription>{description}</ListItemDescription>
            </If>
            <If condition={date}>
              <ListItemDate>{date}</ListItemDate>
            </If>
          </ListItemBody>
        </ListItemInner>
      </Wrapper>
    );
  }
}

export default ListItem;
