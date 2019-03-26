import React from 'react';
import Comment from './Comment';
import Story from '../../../Story';

const user = {
  _id: 1,
  avatar: 'https://picsum.photos/200',
  name: 'Jason Bourne',
};


export default ({ storiesOf }) => (
  storiesOf('ui/Comment', module)
    .add('Default', () => (
      <Story>
        <Comment
          user={user}
          componentClass="a"
          titleProps={{
            target: '_blank',
            href: '//google.ru',
          }}
          date={Date.now()}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque ratione consequuntur ut placeat.
        </Comment>
      </Story>
    ))
);
