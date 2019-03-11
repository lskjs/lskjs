// follow
// avatar-group
// avatar.setdefault
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DefaultAvatar from '../Avatar';
import merge from 'lodash/merge';
import isEqual from 'lodash/isEqual';

export default class AvatarGroup extends PureComponent {
  static propTypes = {
    Avatar: PropTypes.func,
    size: PropTypes.number,
    limit: PropTypes.number,
    offset: PropTypes.number,
    count: PropTypes.number,
    items: PropTypes.array,
    backgroundColor: PropTypes.string,
    avatarStyle: PropTypes.object,
    avatarInnerStyle: PropTypes.object,
  };
  static defaultProps = {
    Avatar: DefaultAvatar,
    size: 64,
    limit: null,
    offset: -0.35,
    count: null,
    backgroundColor: '#838383',
    items: [],
  };
  render() {
    const {
      size = 64, offset = -0.35, items = [], limit, backgroundColor,
    } = this.props;
    const { Avatar } = this.props;
    let { avatarInnerStyle, avatarStyle } = this.props;

    if (!isEqual(avatarStyle, AvatarGroup.defaultProps.avatarStyle)) {
      avatarStyle = merge(AvatarGroup.defaultProps.avatarStyle, avatarStyle);
    }

    if (!isEqual(avatarInnerStyle, AvatarGroup.defaultProps.avatarInnerStyle)) {
      avatarInnerStyle = merge(AvatarGroup.defaultProps.avatarInnerStyle, avatarInnerStyle);
    }

    let renderItems = items;
    if (limit) {
      renderItems = renderItems.slice(0, limit);
    }
    const count = this.props.count || items.length;
    const wrapStyle = { marginLeft: size * offset, float: 'right' };
    //  style={{paddingLeft:-wrapStyle.marginLeft}};p
    return (
      <div>
        <div style={{ float: 'left', marginLeft: Math.abs(size * offset) }}>
          <If condition={renderItems.length !== count}>
            <span style={wrapStyle}>
              <Avatar
                size={size}
                placeholder={`+${count - renderItems.length}`}
                backgroundColor={backgroundColor}
                style={{ ...avatarStyle, zIndex: 100 }}
                innerStyle={avatarInnerStyle}
              />
            </span>
          </If>
          {renderItems.map((item = {}, index) => (
            <span
              key={item._id || index}
              style={{ ...wrapStyle, marginLeft: size * offset }}
            >
              <Avatar
                size={size}
                style={avatarStyle}
                innerStyle={avatarInnerStyle}
                {...item}
              />
            </span>
          ))}
        </div>
        <div style={{ clear: 'both' }} />
      </div>
    );
  }
}
