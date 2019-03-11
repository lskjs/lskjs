import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../../Avatar';
import {
  EventFooterItem,
  AvatarContainer,
  ButtonContainer,
  Content,
  TextContainer,
  TextItem,
} from './EventFooter.styles';

class EventFooter extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    actions: PropTypes.any,
  };
  static defaultProps = {
    children: null,
    actions: null,
  };
  render() {
    const {
      _id,
      title,
      image,
      actions,
      children,
    } = this.props;
    return (
      <EventFooterItem>
        <Content>
          <AvatarContainer>
            <Avatar
              id={_id}
              title={title}
              src={image}
              size={140}
              shape="rounded"
            />
          </AvatarContainer>
          <TextContainer>
            <TextItem>{title}</TextItem>
            {children}
          </TextContainer>
          <ButtonContainer>
            {actions}
          </ButtonContainer>
        </Content>
      </EventFooterItem>
    );
  }
}
export default EventFooter;
