import React, { Component } from 'react';
import PropTypes from 'prop-types';
import If from 'react-if';
import PostTags from '../../atoms/PostTags';
import PostFooter from '../../atoms/PostFooter';
import PostComments from '../../atoms/PostComments';
import PostExtra from '../../atoms/PostExtra';
import PostDate from '../../atoms/PostDate';
import PostActions from '../../atoms/PostActions';
import Card from './Post.styles';

class Post extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    title: PropTypes.any,
    extra: PropTypes.any,
    footer: PropTypes.any,
    comments: PropTypes.any,
    date: PropTypes.string,
    tags: PropTypes.any,
  }
  static defaultProps = {
    title: null,
    extra: null,
    footer: null,
    comments: null,
    tags: null,
    date: null,
  }
  render() {
    const {
      children,
      extra,
      title,
      footer,
      comments,
      tags,
      date,
    } = this.props;
    return (
      <Card
        withActions={!!extra}
        title={title}
        extra={(
          <PostExtra>
            <If condition={date}>
              <PostDate>
                {date}
              </PostDate>
            </If>
            <If condition={extra}>
              <PostActions>
                {extra}
              </PostActions>
            </If>
          </PostExtra>
        )}
      >
        <If condition={tags}>
          <PostTags>
            {tags}
          </PostTags>
        </If>
        {children}
        <If condition={footer}>
          <PostFooter>
            {footer}
          </PostFooter>
        </If>
        <If condition={comments}>
          <PostComments>
            {comments}
          </PostComments>
        </If>
      </Card>
    );
  }
}

export default Post;
