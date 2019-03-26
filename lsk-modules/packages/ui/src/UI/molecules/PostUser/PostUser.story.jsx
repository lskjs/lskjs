import React from 'react';
import PostUser from './PostUser';
import Story from '../../../Story';

export default ({ storiesOf }) => (
  storiesOf('ui/PostUser', module)
    .add('Default', () => (
      <Story>
        <PostUser
          user={{
            title: 'Имя Фамилия',
            avatar: 'https://picsum.photos/100/?random',
          }}
        />
      </Story>
    ))
    .add('With role', () => (
      <Story>
        <PostUser
          user={{
            title: 'Имя Фамилия',
            avatar: 'https://picsum.photos/100/?random',
          }}
          subtitle="Модератор"
        />
      </Story>
    ))
    .add('With category', () => (
      <Story>
        <PostUser
          user={{
            title: 'Имя Фамилия',
            avatar: 'https://picsum.photos/100/?random',
          }}
          category={{
            title: 'Для всех',
          }}
        />
      </Story>
    ))
    .add('With category 2', () => (
      <Story>
        <PostUser
          user={{
            title: 'Имя Фамилия',
            avatar: 'https://picsum.photos/100/?random',
          }}
          category={{
            title: 'Для друзей',
            color: 'red',
          }}
        />
      </Story>
    ))

    .add('With role & category', () => (
      <Story>
        <PostUser
          user={{
            title: 'Имя Фамилия',
            avatar: 'https://picsum.photos/100/?random',
          }}
          subtitle="Модератор"
          category={{
            title: 'Для всех',
          }}
        />
      </Story>
    ))
);
