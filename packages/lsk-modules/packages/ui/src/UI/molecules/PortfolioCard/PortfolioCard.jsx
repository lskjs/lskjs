import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  ImageContainer,
  Image,
  CardInfo,
  CardName,
  CardTag,
} from './PortfolioCard.styles';

class PortfolioCard extends PureComponent {
  static propTypes = {
    href: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    position: PropTypes.string,
    subtitle: PropTypes.string,
  };
  static defaultProps = {
    href: null,
    image: null,
    position: null,
    title: null,
    subtitle: null,
  };
  render() {
    const {
      href,
      image,
      position,
      title,
      subtitle,
      ...props
    } = this.props;
    return (
      <Card href={href} {...props} >
        <ImageContainer>
          <Image src={image} alt="cover" />
        </ImageContainer>
        <CardInfo position={position}>
          <CardName>{title}</CardName>
          <CardTag>{subtitle}</CardTag>
        </CardInfo>
      </Card>
    );
  }
}
export default PortfolioCard;
