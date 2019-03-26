import React from 'react';
import Link from '../../../Link';
import AnimatedLink from './AnimatedLink';
import Story from '../../../Story';

import '../../../styles/lib/antd.g.css';

export default ({ storiesOf }) => (
  storiesOf('ui/AnimatedLink', module)
    .add('Default', () => (
      <Story>
        <AnimatedLink
          href="//google.com"
          target="_blank"
          icon="arrow-right"
        >
          Читать дальше
        </AnimatedLink>
      </Story>
    ))
    .add('Primary', () => (
      <Story>
        <AnimatedLink
          href="//google.com"
          target="_blank"
          icon="arrow-right"
          paint="primary"
        >
          Читать дальше
        </AnimatedLink>
      </Story>
    ))
    .add('With Link', () => (
      <Story>
        <AnimatedLink
          componentClass={Link}
          href="/?selectedKind=BlogCard"
          icon="arrow-right"
          paint="primary"
        >
          Читать дальше
        </AnimatedLink>
      </Story>
    ))
);
