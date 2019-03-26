import React from 'react';
import Story from '../../../Story';
import DefaultCard from './DefaultCard';

module.exports = ({ storiesOf }) =>
  storiesOf('hz/DefaultCard', module)
    .add('DefaultCard', () => {
      return (
        <Story>
          <DefaultCard
            user={{
              title: 'User 1',
              position: 'Director',
              rating: 123.3,
            }}
          />
        </Story>
      );
    });
