import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../../Avatar';
import { Title, AvatarWrapper, Block } from './UserItem.styles';
import filterProps from '../../../utils/filterProps';

class UserItem extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    componentClass: PropTypes.any,
    normal: PropTypes.boolean,
    size: PropTypes.number,
  }
  static defaultProps = {
    componentClass: 'div',
    normal: false,
    size: 40,
  }
  render() {
    const {
      normal, size, title, user, componentClass: Tag, ...props
    } = this.props;
    return (
      <Block
        componentClass={Tag}
        {...filterProps(Tag !== 'div' ? props : {}, Tag)}
      >
        <AvatarWrapper>
          <Avatar id={user._id} src={user.avatar} name={user.title} size={size} />
        </AvatarWrapper>
        <Title>
          {title || user.title}
        </Title>
      </Block>
    );
  }
}

export default UserItem;
