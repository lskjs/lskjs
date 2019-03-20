import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../../Avatar';

import ProfileCardItem from './ProfileCardSmall.styles';


class ProfileCardV1 extends PureComponent {
  static propTypes = {
    img: PropTypes.string,
    name: PropTypes.string,
    info: PropTypes.string,
  };
  static defaultProps = {
    img: null,
    name: null,
    info: null,
  }
  render() {
    const {
      img,
      name,
      info,
    } = this.props;
    return (
      <ProfileCardItem>
        <Avatar size={100} src={img} shape="circle" />
        <h4>{name}</h4>
        <span>{info}</span>
      </ProfileCardItem>
    );
  }
}

export default ProfileCardV1;
