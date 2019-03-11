import React from 'react';
import BallPulse from './BallPulse';

export default ({ storiesOf }) => (
  storiesOf('ui/BallPulse', module)
    .add('Default', () => (
      <div style={{ padding: 60, backgroundColor: '#1890ff' }}>
        <BallPulse color="#fff" />
      </div>
    ))
);
