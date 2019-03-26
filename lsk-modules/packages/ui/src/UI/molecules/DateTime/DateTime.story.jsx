import React from 'react';
import DateTime from './DateTime';
import Story from '../../../Story';
import '../../../styles/lib/antd.g.css';


export default ({ storiesOf }) => (
  storiesOf('ui/DateTime', module)
    .add('default', () => (
      <Story>
        <DateTime
          dateTime={Date.now()}
        />
      </Story>
    ))
);
