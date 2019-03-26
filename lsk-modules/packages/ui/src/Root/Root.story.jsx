import React from 'react';
import Story from '../Story';
import Root from './Root';

export default ({ storiesOf }) => (
  storiesOf('Root', module)
    .add('empty', () => (
      <Story>
        <Root uapp={{}}>
          asfdg
        </Root>
      </Story>
    ))

);

