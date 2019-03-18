import React, { PureComponent } from 'react';
import pT from 'prop-types';
import Link from '../../../Link';
import { Right, Item } from './NotifyItem.styles';


class NotifyItem extends PureComponent {
  static propTypes = {
    unread: pT.bool,
    children: pT.any.isRequired,
    href: pT.string,
    type: pT.string.isRequired,
  }
  static defaultProps = {
    unread: false,
  }
  render() {
    const {
      href, unread, children, type,
    } = this.props;
    const Tag = href ? Link : 'div';
    return (
      <Item
        componentClass={Tag}
        href={href}
        unread={unread}
        type={type}
      >
        <Right>
          {children}
        </Right>
      </Item>
    );
  }
}

export default NotifyItem;
