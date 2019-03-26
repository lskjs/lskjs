import React from 'react';
import Story from '../../../Story';
import ProfileCardBig from './ProfileCardBig';

import '../../../styles/lib/antd.g.css';

export default ({ storiesOf }) => (
  storiesOf('ui/ProfileCardBig', module)
    .add('Default', () => (
      <Story>
        <ProfileCardBig
          img="https://picsum.photos/200"
          name="Jason Bourne"
          info="Engineer"
          sign="I must confess I'm American (I know… nobody's perfect)"
          // fixHeight={250}
        />
      </Story>
    ))
);
