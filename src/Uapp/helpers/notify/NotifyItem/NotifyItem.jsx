import React, { PureComponent } from 'react';
import pT from 'prop-types';
import Link from '@lskjs/general/Link';
import { Right, Item } from './NotifyItem.styles';


class NotifyItem extends PureComponent {
  static propTypes = {
    unread: pT.bool,
    standalone: pT.bool,
    children: pT.any.isRequired,
    href: pT.string,
    itemType: pT.string.isRequired,
  }
  static defaultProps = {
    unread: false,
    standalone: false,
    href: '#',
  }
  render() {
    const { standalone, href, unread, children, itemType } = this.props;
    const Tag = standalone ? 'div' : Link;
    return (
      <Item
        componentClass={Tag}
        {...(!standalone ? { href } : {})}
        unread={unread}
        standalone={standalone}
        itemType={itemType}
      >
        <Right>
          {children}
        </Right>
      </Item>
    );
  }
}

export default NotifyItem;
