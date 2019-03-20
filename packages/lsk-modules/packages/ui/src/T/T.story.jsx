import React from 'react';
import Story from '../Story';
import T from './T';

export default ({ storiesOf }) => (
  storiesOf('T', module)
    .add('empty', () => (
      <Story>
        <T name="test.key" />
      </Story>
    ))

);

