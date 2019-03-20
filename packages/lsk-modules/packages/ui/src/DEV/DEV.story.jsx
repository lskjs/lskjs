import React from 'react';
import DEV from './DEV';
import Story from '../Story';
// import ObserverDEV from './ObserverDEV';

export default ({ storiesOf, action }) => (
  storiesOf('DEV', module)
    .add('children', () => (
      <Story>
        <DEV>
          Empty
        </DEV>
      </Story>
    ))
    .add('json', () => (
      <Story>
        <DEV json={{ test: 123 }} />
      </Story>
    ))
);

