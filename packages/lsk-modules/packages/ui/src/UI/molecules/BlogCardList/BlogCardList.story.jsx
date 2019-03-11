import React from 'react';
import BlogCardList from './BlogCardList';
import ThemeInjector from '../../../ThemeInjector';

import '../../../styles/lib/antd.g.css';

const articles = [
  {
    // img: 'https://picsum.photos/500/300',
    date: 'May 1st',
    title: 'Be Yourself',
    content: 'Be yourself; everyone else is already taken.',
    tag: 'Quotes',
    author: 'Oscar Wilde',
    href: '',
  },
];

export default ({ storiesOf }) => (
  storiesOf('ui/BlogCardList', module)
    .add('BlogCardList', () => (
      <div style={{ padding: 60 }}>
        <ThemeInjector>
          <BlogCardList {...articles[0]} />
        </ThemeInjector>
      </div>
    ))
);
