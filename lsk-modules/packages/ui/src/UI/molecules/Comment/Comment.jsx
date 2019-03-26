import React, { PureComponent } from 'react';
import If from 'react-if';
import moment from 'moment';
import Avatar from '../../../Avatar';
import Typography from '../../atoms/Typography';
import {
  CommentWrapper,
  AvatarWrapper,
  ContentWrapper,
  BodyWrapper,
  TitleWrapper,
  DateWrapper,
} from './Comment.styles';

class Comment extends PureComponent {
  render() {
    const {
      user = {},
      children,
      date,
      componentClass,
      titleProps = {},
    } = this.props;
    return (
      <CommentWrapper>
        <AvatarWrapper>
          <Avatar
            id={user._id}
            title={user.title || user.name}
            src={user.avatar || user.image}
            size={48}
          />
        </AvatarWrapper>
        <ContentWrapper>
          <Typography pre="line" paragraph variant="title">
            <TitleWrapper componentClass={componentClass} {...titleProps}>
              {user.title || user.name}
            </TitleWrapper>
            <If condition={date}>
              <DateWrapper>{moment(date).format('LLL')}</DateWrapper>
            </If>
          </Typography>
          <BodyWrapper>
            <Typography>
              {children}
            </Typography>
          </BodyWrapper>
        </ContentWrapper>
      </CommentWrapper>
    );
  }
}

export default Comment;
