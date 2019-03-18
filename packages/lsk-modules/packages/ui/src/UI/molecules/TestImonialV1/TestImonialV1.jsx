import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../../Avatar';
import {
  Content,
  Meta,
  InfoHolder,
  AuthorImg,
  // AvatarItem,
  AuthorDesc,
} from './TestImonialV1.styles';

class TestImonialV1 extends PureComponent {
  static propTypes = {
    content: PropTypes.string,
    avatar: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    color: PropTypes.string,
  };
  static defaultProps = {
    content: null,
    avatar: null,
    name: null,
    title: null,
    color: null,
  };
  render() {
    const {
      content,
      avatar,
      name,
      color,
      title,
    } = this.props;
    return (
      <div>
        <Content color={color}>{content}</Content>
        <Meta>
          <InfoHolder>
            <AuthorImg> <Avatar title={name} alt="avatar" src={avatar} size={60} /> </AuthorImg>
            <div>
              <div>{name}</div>
              <AuthorDesc>{title}</AuthorDesc>
            </div>
          </InfoHolder>
        </Meta>
      </div>
    );
  }
}
export default TestImonialV1;
