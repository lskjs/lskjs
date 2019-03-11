import React, { PureComponent } from 'react';
import If from 'react-if';
import PropTypes from 'prop-types';
import {
  ItemCard,
  CardImage,
  CardBody,
  CardTitle,
  CardPrice,
  StrikeThroughItem,
  Divider,
  CardDesc,
  TitleLink,
  TitleSpan,
  Image,
} from './ProductList.styles';

class ProductList extends PureComponent {
  static propTypes = {
    href: PropTypes.string,
    price: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
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
    description: null,
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
      description,
      componentClass,
    } = this.props;
    return (
      <ItemCard>
        <CardImage componentClass={componentClass} href={href}>
          <Image alt="product" src={image} />
        </CardImage>
        <CardBody>
          <CardTitle>
            <TitleLink componentClas={componentClass} href={href}>{name}</TitleLink>
            <TitleSpan>{category}</TitleSpan>
          </CardTitle>
          <CardPrice>
            <If condition={oldPrice}>
              <StrikeThroughItem isPierced={oldPrice}>{oldPrice}</StrikeThroughItem>
            </If>
            <StrikeThroughItem>{price}</StrikeThroughItem>
          </CardPrice>
          <Divider />
          <CardDesc>{description}</CardDesc>
        </CardBody>
      </ItemCard>
    );
  }
}
export default ProductList;
