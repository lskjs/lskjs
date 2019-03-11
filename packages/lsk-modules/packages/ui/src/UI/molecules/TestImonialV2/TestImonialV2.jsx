import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Wrapper,
  Content,
  Citate,
  AuthorImg,
  AvatarItem,
} from './TestImonialV2.styles';

class TestImonialV2 extends PureComponent {
  static propTypes ={
    paint: PropTypes.string,
    content: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    avatar: PropTypes.string,
  };
  static defaultProps ={
    paint: null,
    content: null,
    name: null,
    title: null,
    avatar: null,
  };
  render() {
    const {
      paint,
      content,
      name,
      title,
      avatar,
    } = this.props;
    return (
      <Wrapper paint={paint}>
        <div>
          <Content>{content}</Content>
          <Citate>
            <span>{name}</span>, <span>{title}</span>
          </Citate>
        </div>
        <AuthorImg> <AvatarItem alt="avatar" src={avatar} size={60} /> </AuthorImg>
      </Wrapper>
    );
  }
}
export default TestImonialV2;
