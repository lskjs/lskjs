import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../../Avatar';
import {
  UserFooterItem,
  AvatarContainer,
  ButtonContainer,
  Content,
  TextContainer,
  TextItem,
} from './UserBoxFooter.styles';

class UserBoxFooter extends PureComponent {
  static propTypes = {
    subtitle: PropTypes.any,
    actions: PropTypes.any,
    user: PropTypes.object,
  };
  static defaultProps = {
    subtitle: null,
    actions: null,
    user: null,
  };
  render() {
    const {
      subtitle,
      actions,
      user,
    } = this.props;
    return (
      <UserFooterItem>
        <AvatarContainer>
          <Avatar
            title={user.title}
            src={user.avatar}
            id={user._id}
            size={140}
          />
        </AvatarContainer>
        <Content>
          <TextContainer>
            <TextItem>{user.title}</TextItem>
            <TextItem>{subtitle}</TextItem>
          </TextContainer>
          <ButtonContainer>
            {actions}
          </ButtonContainer>
        </Content>
      </UserFooterItem>
    );
  }
}
export default UserBoxFooter;
