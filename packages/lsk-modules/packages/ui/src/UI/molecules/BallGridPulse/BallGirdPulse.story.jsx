import React from 'react';
import BallGridPulse from './BallGridPulse';

export default ({ storiesOf }) => (
  storiesOf('ui/BallGridPulse', module)
    .add('Default', () => (
      <div style={{ padding: 60, backgroundColor: '#1890ff' }}>
        <BallGridPulse color="#fff" />
      </div>
    ))
);
