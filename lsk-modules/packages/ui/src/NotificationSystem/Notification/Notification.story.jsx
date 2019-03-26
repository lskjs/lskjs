import React from 'react';
import Story from '../../Story';
import Notification from './Notification';

export default ({ storiesOf }) => {
  storiesOf('NotificationSystem', module)
    .add('Notification', () => (
      <Story>
        <Notification
          type="error"
          title="Error title"
          text="Error text"
        />
        <Notification
          type="success"
          title="Success title"
          text="Success text"
        />
        <Notification
          type="info"
          title="Info title"
          text="Info text"
        />
        <Notification
          type="warning"
          title="Warning title"
          text="Warning text"
        />
        <Notification />
        <Notification
          href="/cabinet"
          type="info"
          title="With href"
          text="With href"
        />
        <Notification
          onClick={() => console.log('onClick')}
          type="info"
          title="With onClick"
          text="With onClick"
        />
      </Story>
    ));
};

