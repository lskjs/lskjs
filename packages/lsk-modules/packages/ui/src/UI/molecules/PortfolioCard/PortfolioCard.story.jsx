import React from 'react';
import PortfolioCard from './PortfolioCard';
import Story from '../../../Story';

const articles = [
  {
    image: 'https://picsum.photos/300/200?random',
    href: '',
    title: 'Lorem ipsum dolor',
    subtitle: 'PSD',
  },
  {
    image: 'https://picsum.photos/300/200?random',
    href: '',
    title: 'Lorem ipsum dolor',
    subtitle: 'PSD',
    position: 'bottom',
  },
];

export default ({ storiesOf }) => (
  storiesOf('ui/PortfolioCard', module)
    .add('Card1', () => (
      <Story>
        <PortfolioCard {...articles[0]} />
      </Story>
    ))
    .add('Card2', () => (
      <Story>
        <PortfolioCard {...articles[1]} />
      </Story>
    ))
);
