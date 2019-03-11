import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import If from 'react-if';
import ImageComponent from '../Image';
import filterProps from '../../../utils/filterProps';

import {
  Wrapper,
  // Image,
  Body,
  Title,
  ImageContainer,
  TagItem,
  Content,
  Author,
} from './BlogCardList.styles';

class BlogCardList extends PureComponent {
  static propTypes = {
    link: PropTypes.string,
    img: PropTypes.string,
    title: PropTypes.string,
    href: PropTypes.string,
    tag: PropTypes.string,
    content: PropTypes.string,
    author: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),
  }
  static defaultProps = {
    link: null,
    img: null,
    title: null,
    href: null,
    tag: null,
    content: null,
    author: null,
  }
  render() {
    const {
      id,
      img,
      title,
      tag,
      content,
      author,
      componentClass,
      ...props
    } = this.props;
    return (
      <Wrapper componentClass={componentClass} {...filterProps(props)}>
        <ImageContainer>
          <ImageComponent
            id={id}
            width="100%"
            height="100%"
            src={img}
            alt={title}
            objectFit="contain"
          />
        </ImageContainer>
        <Body>
          <If condition={tag}>
            <TagItem>{tag}</TagItem>
          </If>
          <If condition={title}>
            <Title>{title}</Title>
          </If>
          <If condition={content}>
            <Content>{content}</Content>
          </If>
          <If condition={author}>
            <Author>{author}</Author>
          </If>
        </Body>
      </Wrapper>
    );
  }
}

export default BlogCardList;
