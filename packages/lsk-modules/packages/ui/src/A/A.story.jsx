import React from 'react';
import Story from '../Story';
import A from './A';

export default ({ storiesOf, action }) => (
  storiesOf('A', module)
    .add('empty', () => (
      <Story>
        <A>
          Empty
        </A>
      </Story>
    ))
    .add('href', () => (
      <Story>
        <A href="/test">
          Href
        </A>
      </Story>
    ))
    .add('onClick', () => (
      <Story>
        <A href="/test" onClick={action('onClick')}>
        onClick
        </A>
      </Story>
    ))
);

