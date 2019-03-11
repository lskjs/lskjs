import React from 'react';
import Story from '../Story';
import Loading from './Loading';
import LoadingDots from '../LoadingDots';

export default ({ storiesOf }) => (
  storiesOf('Loading', module)
    .add('Loading', () => (
      <Story>
        <Loading />
      </Story>
    ))
    .add('Loading full', () => (
      <Story>
        <Loading full />
      </Story>
    ))
    .add('LoadingDots', () => (
      <Story>
        <LoadingDots />
      </Story>
    ))
);

