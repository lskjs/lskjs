import React from 'react';
import NumberCard from './NumberCard';
import Story from '../../../Story';

export default ({ storiesOf }) => (
  storiesOf('ui/NumberCard', module)
    .add('Default', () => (
      <Story>
        <NumberCard
          number={16}
          text="grown"
        />
      </Story>
    ))
);
