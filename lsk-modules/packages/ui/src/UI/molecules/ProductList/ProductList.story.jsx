import React from 'react';
import ProductList from './ProductList';
import Story from '../../../Story';

const articles = [
  {
    image: 'https://picsum.photos/300',
    href: '',
    category: 'Accessories',
    name: 'Silver Watch',
    oldPrice: '$699.99',
    price: '$300.00',
    description: 'From the way it works to the way it looks, Watch isn’t just something you wear. It’s an essential part of who you are.',
  },
];

export default ({ storiesOf }) => (
  storiesOf('ui/ProductList', module)
    .add('ProductList', () => (
      <Story>
        <ProductList {...articles[0]} />
      </Story>
    ))
);
