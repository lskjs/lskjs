import React, { Component } from 'react';
import IconButton from '../../atoms/IconButton';
import { Wrapper, Avatar, Input } from './PostCommentCreate.styles';

class PostCommentCreate extends Component {
  render() {
    const { user, onSend, ...props } = this.props;
    return (
      <Wrapper>
        <Avatar
          src={user.avatar}
          alt={user.title}
          size="small"
        />
        <Input rows={1} {...props} />
        <IconButton transparent icon="export" onClick={onSend} />
      </Wrapper>
    );
  }
}

export default PostCommentCreate;
