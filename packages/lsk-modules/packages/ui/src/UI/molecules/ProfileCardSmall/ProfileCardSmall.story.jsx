import React from 'react';
import Story from '../../../Story';
import ProfileCardV1 from './ProfileCardSmall';

import '../../../styles/lib/antd.g.css';

export default ({ storiesOf }) => (
  storiesOf('ui/ProfileCardSmall', module)
    .add('Default', () => (
      <Story>
        <ProfileCardV1 img="https://picsum.photos/200" name="Jason Bourne" info="Engineer" />
      </Story>
    ))
);
