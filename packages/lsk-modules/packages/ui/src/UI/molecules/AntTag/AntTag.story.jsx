import React from 'react';
import Story from '../../../Story';
import Link from '../../../Link';
import AntTag from './AntTag';

export default ({ storiesOf }) => (
  storiesOf('ui/AntTag', module)
    .add('Default', () => (
      <Story>
        <AntTag>
          Просто
        </AntTag>
        <AntTag closable>
          Крест
        </AntTag>
        <AntTag target="_blank" href="https://vk.com">
          Link
        </AntTag>
        <AntTag componetClass={Link} href="https://vk.com">
          Link
        </AntTag>
      </Story>
    ))
);
