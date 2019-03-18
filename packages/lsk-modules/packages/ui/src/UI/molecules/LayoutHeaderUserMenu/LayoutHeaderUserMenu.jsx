import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'antd/lib/dropdown';
import If from 'react-if';
import Fire from 'react-icons2/mdi/fire';
import { css } from 'emotion';
import Avatar from '../../../Avatar';
import LayoutHeaderListItem from '../../atoms/LayoutHeaderListItem';
// import { DropdownLink /* , AvatarText */ } from './LayoutHeaderUserMenu.styles';
import { DropdownLink, AvatarText } from './LayoutHeaderUserMenu.styles';

export const badgeClass = css`
  width: 16px;
  height: 16px;
  background-color: #f6781b;
  border-radius: 100px;
  font-size: 24px;
  color: #fff;
  display: flex;
  margin: -9px;
  align-items: center;
  justify-content: center;
  padding: 0;

`;
class LayoutHeaderUserMenu extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    children: PropTypes.any.isRequired,
  }
  render() {
    const { user, children } = this.props;
    return (
      <LayoutHeaderListItem
        componentClass={Dropdown}
        overlay={children}
        trigger={['click']}
        placement="bottomRight"
      >
        <DropdownLink href="#!">
          <div style={{
            display: 'inline-block',
            position: 'relative',
            width: 32,
            height: 32,
          }}
          >
            <Avatar
              size={32}
              id={user.id || user._id}
              src={user.avatar}
              title={user.title || user.name}
            >
              <If condition={user.role === 'admin'}>
                <Avatar.Badge className={badgeClass} right bottom>
                  <Fire />
                </Avatar.Badge>
              </If>
            </Avatar>
          </div>
          <If condition={user.title || user.name}>
            <AvatarText className="d-none d-md-inline">{user.title || user.name}</AvatarText>
          </If>
        </DropdownLink>
      </LayoutHeaderListItem>
    );
  }
}

export default LayoutHeaderUserMenu;
