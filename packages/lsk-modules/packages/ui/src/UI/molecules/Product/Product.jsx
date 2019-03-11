import React, { PureComponent } from 'react';
import If from 'react-if';
import PropTypes from 'prop-types';
import {
  ItemCard,
  Image,
  CardBody,
  CardTitle,
  CardPrice,
  StrikeTroughItem,
  CardImage,
  TitleLink,
  TitleSp,
} from './Product.styles';

class Product extends PureComponent {
  static propTypes = {
    href: PropTypes.string,
    price: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    category: PropTypes.string,
    oldPrice: PropTypes.bool,
    componentClass: PropTypes.any,
  };
  static defaultProps = {
    href: null,
    price: null,
    image: null,
    name: null,
    category: null,
    oldPrice: null,
    componentClass: 'a',
  };
  render() {
    const {
      image,
      href,
      name,
      price,
      category,
      oldPrice,
      componentClass,
    } = this.props;
    return (
      <ItemCard>
        <CardImage componentClass={componentClass} href={href} >
          <Image alt="product" src={image} />
        </CardImage>
        <CardBody>
          <CardTitle>
            <TitleSp>{category}</TitleSp>
            <TitleLink componentClass={componentClass} href={href}>{name}</TitleLink>
          </CardTitle>
          <CardPrice>
            <If condition={oldPrice}>
              <StrikeTroughItem oldPrice={oldPrice}>{oldPrice}</StrikeTroughItem>
            </If>
            <StrikeTroughItem>{price}</StrikeTroughItem>
          </CardPrice>
        </CardBody>
      </ItemCard>
    );
  }
}

export default Product;
