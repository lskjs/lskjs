import React from 'react';
import StatusBlock from './StatusBlock';
import Story from '../../../Story';
import '../../../styles/lib/antd.g.css';


export default ({ storiesOf }) => (
  storiesOf('ui/StatusBlock', module)
    .add('default', () => (
      <Story>
        <StatusBlock
          title="Ожидание"
          paint="red"
          dateTime={Date.now()}
        />
      </Story>
    ))
);
