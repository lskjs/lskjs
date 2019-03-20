import React from 'react';
import range from 'lodash/range';
import random from 'lodash/random';
import AvatarGroup from './AvatarGroup';
import Story from '../Story';


const user = () => ({
  title: 'John Smith',
  src: `https://randomuser.me/api/portraits/men/${random(99)}.jpg`,
});

const userWithLink = () => ({
  title: 'John Smith',
  src: `https://randomuser.me/api/portraits/men/${random(99)}.jpg`,
  link: `user/link-${random(99)}`,
});

const userWithHref = () => ({
  title: 'John Smith',
  src: `https://randomuser.me/api/portraits/men/${random(99)}.jpg`,
  href: `user/href-${random(99)}`,
});

export default ({ storiesOf }) => (
  storiesOf('AvatarGroup', module)
    .add('Items only', () => (
      <Story>
        <AvatarGroup
          items={range(5).map(user)}
        />
      </Story>
    ))
    .add('Items + limit', () => (
      <Story>
        <AvatarGroup
          items={range(5).map(user)}
          limit={3}
        />
      </Story>
    ))
    .add('Items + limit2', () => (
      <AvatarGroup
        items={range(5).map(user)}
        limit={10}
      />
    ))
    .add('Items + count', () => (
      <Story>
        <AvatarGroup
          items={range(5).map(user)}
          count={20}
        />
      </Story>
    ))
    .add('Items + count + limit', () => (
      <Story>
        <AvatarGroup
          items={range(5).map(user)}
          limit={3}
          count={20}
        />
      </Story>
    ))
    .add('Items in order + limit', () => {
      const users = range(5).map((i, a) => ({
        title: (`${i}${a}`),
      }));
      return (
        <Story>
          <AvatarGroup
            items={users}
            limit={4}
          />
        </Story>
      );
    })
    .add('Items in order + limit + avatarInnerStyle', () => {
      const users = range(5).map((i, a) => ({
        title: (`${i}${a}`),
      }));
      const users2 = range(5).map((i, a) => ({
        title: 'John Smith',
      }));
      return (
        <Story>
          <AvatarGroup
            avatarInnerStyle={{ border: '4px solid rgb(255, 255, 255)' }}
            items={users}
            limit={4}
          />
          <AvatarGroup
            avatarInnerStyle={{
 border: '3px solid rgb(255, 255, 255)', lineHeight: (`${40 - 3}px`), fontWeight: 'bold', color: '#fff',
}}
            items={users2}
            limit={4}
            size={40}
            offset={-0.25}
          />
        </Story>
      );
    })
    .add('count', () => (
      <Story>
        <AvatarGroup
          count={20}
        />
      </Story>
    ))
    .add('custom avatar size', () => (
      <Story>
        <AvatarGroup
          size={20}

          items={range(5).map(user)}
          limit={3}
          count={20}
        />
      </Story>
    ))
    .add('custom offset between avatars', () => (
      <Story>
        <AvatarGroup
          offset={-0.6}

          items={range(15).map(user)}
          count={20}
        />
      </Story>
    ))
    .add('disable offset between avatars', () => (
      <Story>
        <AvatarGroup
          offset={0}

          items={range(5).map(user)}
          limit={3}
          count={20}
        />
      </Story>
    ))
    .add('Items + count + limit + link', () => (
      <Story>
        <AvatarGroup
          items={range(5).map(userWithLink)}
          limit={3}
          count={20}
        />
        <AvatarGroup
          items={range(5).map(userWithHref)}
          limit={3}
          count={20}
        />
      </Story>
    ))
);

