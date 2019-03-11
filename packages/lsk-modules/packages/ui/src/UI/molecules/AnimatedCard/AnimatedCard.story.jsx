import React from 'react';
import AnimatedCard from './AnimatedCard';
import Story from '../../../Story';

import '../../../styles/lib/antd.g.css';

export default ({ storiesOf }) => (
  storiesOf('ui/AnimatedCard', module)
    .add('Default', () => (
      <Story>
        <AnimatedCard
          src="https://avatars.mds.yandex.net/get-pdb/750514/5798b2df-9998-4381-b8be-57aaf7b65e92/s375"
        >
          Content
        </AnimatedCard>
      </Story>
    ))
    .add('With custom color', () => (
      <Story>
        <AnimatedCard
          src="https://avatars.mds.yandex.net/get-pdb/750514/5798b2df-9998-4381-b8be-57aaf7b65e92/s375"
          paint="#FF00FF"
          variant="circle"
        >
          Content
        </AnimatedCard>
      </Story>
    ))
    .add('Top', () => (
      <Story>
        <AnimatedCard
          src="https://avatars.mds.yandex.net/get-pdb/750514/5798b2df-9998-4381-b8be-57aaf7b65e92/s375"
          paint="#FF00FF"
          variant="top"
        >
          Content
        </AnimatedCard>
      </Story>
    ))
    .add('Bottom', () => (
      <Story>
        <AnimatedCard
          src="https://avatars.mds.yandex.net/get-pdb/750514/5798b2df-9998-4381-b8be-57aaf7b65e92/s375"
          paint="#FF00FF"
          variant="bottom"
        >
          Content
        </AnimatedCard>
      </Story>
    ))
);
