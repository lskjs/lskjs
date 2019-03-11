import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { IconWrapper, Header, Wrapper, Content } from './Feature.styles';

class Feature extends PureComponent {
  static propTypes = {
    icon: PropTypes.string,
    header: PropTypes.string,
    content1: PropTypes.string,
    content2: PropTypes.string,
    center: PropTypes.bool,
  };
  static defaultProps = {
    icon: null,
    header: null,
    content1: null,
    content2: null,
    center: true,
  };
  render() {
    const {
      icon,
      header,
      content1,
      content2,
      center,
    } = this.props;
    return (
      <Wrapper center={center}>
        <IconWrapper>{icon}</IconWrapper>
        <Header>{header}</Header>
        <Content>{content1}<br /><span>{content2}</span></Content>
      </Wrapper>
    );
  }
}

export default Feature;
