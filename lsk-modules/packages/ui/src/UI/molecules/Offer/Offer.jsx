import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Image from './Image';
import Info from './Info';
import Title from './Title';
import Block from './Offer.styles';

const Subtitle = styled('span')`
    display: flex;
    justify-content: space-between;
    margin-right: 8px;
`;
class Offer extends PureComponent {
  static Image = Image;
  static Info = Info;
  static Title = Title;
  static Subtitle = Subtitle;
  static propTypes = {
    children: PropTypes.any,
  }
  static defaultProps = {
    children: null,
  }
  render() {
    const { children } = this.props;
    return (
      <Block>
        {children}
      </Block>
    );
  }
}

export default Offer;
