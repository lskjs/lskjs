import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../../Avatar';
import { Title, AvatarWrapper, Block } from './MiniUser.styles';
import filterProps from '../../../utils/filterProps';

class MiniUser extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    componentClass: PropTypes.any,
    tiny: PropTypes.bool,
    normal: PropTypes.bool,
  }
  static defaultProps = {
    componentClass: 'div',
    tiny: false,
    normal: false,
  }
  render() {
    const {
      normal, tiny, title, user, componentClass: Tag, ...props
    } = this.props;
    return (
      <Block
        componentClass={Tag}
        tiny={tiny}
        normal={normal}
        {...filterProps(Tag !== 'div' ? props : {}, Tag)}
        // {...(Tag !== 'div' ? props : {})}
      >
        <AvatarWrapper>
          <Avatar id={user._id} src={user.avatar} name={user.title} size={tiny ? 16 : 24} />
        </AvatarWrapper>
        <Title>
          {title || user.title}
        </Title>
      </Block>
    );
  }
}

export default MiniUser;
