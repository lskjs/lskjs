import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import Tag from './BlogCard.styles';
import { Wrapper, Img, Body, Date, Title, ImgContainer } from './BlogCard.styles';


export default class BlogCard extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    link: PropTypes.string,
    img: PropTypes.string,
    date: PropTypes.string,
    title: PropTypes.string,
  }
  static defaultProps = {
    children: null,
    link: null,
    img: null,
    date: null,
    title: null,
  }
  render() {
    const {
      children,
      link,
      img,
      date,
      title,
      ...props
    } = this.props;
    return (
      <Wrapper
        {...props}
      >
        <ImgContainer>
          <Img
            src={img}
            alt="blog cover"
          />
        </ImgContainer>
        <Body>
          <Date>{date}</Date>
          <Title>{title}</Title>
          {children}
        </Body>
      </Wrapper>
    );
  }
}
