import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AvatarItem, Wrapper, Citation, Author } from './TestImonialV3.styles';

class TestImonialV3 extends PureComponent {
  static propTypes = {
    avatar: PropTypes.string,
    content: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
  };
  static defaultProps = {
    avatar: null,
    content: null,
    name: null,
    title: null,
  };
  render() {
    const {
      avatar,
      content,
      name,
      title,
    } = this.props;
    return (
      <Wrapper>
        <AvatarItem alt="avatar" src={avatar} size={80} />
        <Citation>
          {content}
        </Citation>
        <Author>{name}, {title}</Author>
      </Wrapper>
    );
  }
}
export default TestImonialV3;
