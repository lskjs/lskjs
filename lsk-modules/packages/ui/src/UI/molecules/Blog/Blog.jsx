import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../../Avatar';
import {
  BlogItem,
  Title,
  TitleLink,
  BlogInfo,
  AuthorLink,
  DateItem,
  Category,
  CategoryLink,
  Desc,
} from './Blog.styles';

class Blog extends PureComponent {
  static propTypes = {
    titleLink: PropTypes.string,
    title: PropTypes.string,
    avatar: PropTypes.string,
    authorLink: PropTypes.string,
    author: PropTypes.string,
    categoryLink: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
  };
  static defaultProps = {
    title: null,
    titleLink: null,
    avatar: null,
    author: null,
    authorLink: null,
    category: null,
    categoryLink: null,
    description: null,
    date: null,
  };
  render() {
    const {
      title,
      titleLink,
      avatar,
      author,
      authorLink,
      category,
      categoryLink,
      description,
      date,
    } = this.props;
    return (
      <BlogItem>
        <Title><TitleLink href={titleLink}>{title}</TitleLink></Title>
        <BlogInfo>
          <span><Avatar src={avatar} alt="avatar" size={30} /></span>
          <span><AuthorLink href={authorLink} >{author}</AuthorLink></span>
          <DateItem>{date}</DateItem>
          <Category><CategoryLink href={categoryLink}>{category}</CategoryLink></Category>
        </BlogInfo>
        <Desc>{description}</Desc>
      </BlogItem>
    );
  }
}
export default Blog;
