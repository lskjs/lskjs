import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import If from 'react-if';
// import Icon from 'antd/lib/icon';

import { ProfileCardItem, ProfileCardAvatar/* , SocialIcon */ } from './ProfileCardBig.styles';

class ProfileCardBig extends PureComponent {
  static propTypes = {
    img: PropTypes.string,
    name: PropTypes.string,
    info: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),
    sign: PropTypes.string,
    fixHeight: PropTypes.number,
  };
  static defaultProps = {
    img: null,
    name: null,
    info: null,
    sign: null,
    fixHeight: null,
  }
  render() {
    const {
      img,
      name,
      info,
      sign,
      fixHeight,
      footer,
      componentClass,
      ...props
    } = this.props;
    return (
      <ProfileCardItem componentClass={componentClass} fixHeight={fixHeight} {...props}>
        <ProfileCardAvatar
          size={100}
          src={img}
          shape="circle"
        />
        <h4>{name}</h4>
        <span>{info}</span>
        <p>{sign}</p>
        <If condition={footer}>
          <div>
            {footer}
          </div>
        </If>
        {/* <div>
          <SocialIcon><Icon type="twitter" /></SocialIcon>
          <SocialIcon><Icon type="facebook" /></SocialIcon>
          <SocialIcon><Icon type="instagram" /></SocialIcon>
        </div> */}
      </ProfileCardItem>
    );
  }
}

export default ProfileCardBig;
