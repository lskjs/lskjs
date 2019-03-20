import React from 'react';
import random from 'lodash/random';
import Link from '../../../Link';

import UserCard from './UserCard';
import Story from '../../../Story';
import '../../../styles/lib/antd.g.css';

const user = () => ({
  id: random(99),
  title: 'John Smith',
  componentClass: Link,
  href: 'http://php-web.info/articles/video-info/otlichiya-4k-full-hd-uhd/',
  avatar: `https://randomuser.me/api/portraits/men/${random(99)}.jpg`,
  position: 'Managing partner - DELTA2020',
  buttonTitle: 'Запрос',
});

export default ({ storiesOf }) => (
  storiesOf('ui/UserCard', module)
    .add('default', () => (
      <Story>
        <UserCard {...user()} />
      </Story>
    ))
);
