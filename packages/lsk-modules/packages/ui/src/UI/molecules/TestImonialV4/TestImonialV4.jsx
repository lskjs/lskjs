import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  BoxBody,
  Wrapper,
  AvatarItem,
  Citation,
  Author,
} from './TestImonialV4.styles';

class TestImonialV4 extends PureComponent {
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
      <Box>
        <BoxBody>
          <Wrapper>
            <AvatarItem alt="avatar" src={avatar} size={80} />
            <Author>{name && `${name}, `}{title}</Author>
            <Citation>
              {content}
            </Citation>
          </Wrapper>
        </BoxBody>
      </Box>
    );
  }
}
export default TestImonialV4;
