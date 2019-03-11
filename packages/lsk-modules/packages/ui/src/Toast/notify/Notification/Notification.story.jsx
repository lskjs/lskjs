import React from 'react';
import Story from '../../../Story';
import Notification from './Notification';

export default ({ storiesOf }) => {
  storiesOf('Notification', module)
    .add('Error', () => (
      <Story>
        <Notification
          item={{
            type: 'notify.error',
            info: {
              title: 'Error title',
              text: 'Error text',
            },
          }}
        />
      </Story>
    ))
    .add('Success', () => (
      <Story>
        <Notification
          item={{
            type: 'notify.success',
            info: {
              title: 'Success title',
              text: 'Success text',
            },
          }}
        />
      </Story>
    ))
    .add('Info', () => (
      <Story>
        <Notification
          item={{
            type: 'notify.info',
            info: {
              title: 'Info title',
              text: 'Info text',
            },
          }}
        />
      </Story>
    ))
    .add('Warning', () => (
      <Story>
        <Notification
          item={{
            type: 'notify.warning',
            info: {
              title: 'Warning title',
              text: 'Warning text',
            },
          }}
        />
      </Story>
    ));
};

