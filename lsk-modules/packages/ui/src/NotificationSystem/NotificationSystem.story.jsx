import React from 'react';
import NotificationSystem from './NotificationSystem';
import Story from '../Story';
import Button from '../Button';
import notify from './notifyStyles.styles';
import Notification from './Notification';

export default ({ storiesOf }) => {
  storiesOf('NotificationSystem', module)
    .add('default', () => {
      const notificationSystem = React.createRef();
      const toast = (obj) => {
        notificationSystem.current.toast(obj);
      };
      return (
        <Story>
          <NotificationSystem ref={notificationSystem} />
          <Button
            paint="success"
            onClick={() => toast({
              type: 'success', title: 'title', text: 'text', onClick: () => console.log('onClick'),
            })}
          >
            success
          </Button>
          <Button
            paint="warning"
            onClick={() => toast({
              type: 'warning', title: 'title', text: 'text', href: '/cabinet/qweqweqwe',
            })}
          >
            warning
          </Button>
          <Button
            paint="danger"
            onClick={() => toast({ type: 'error', title: 'title', text: 'text' })}
          >
            danger
          </Button>
          <Button
            paint="info"
            onClick={() => toast({ type: 'info', title: 'title', text: 'text' })}
          >
            info
          </Button>
          <Button
            paint="danger"
            onClick={() => toast({ type: 'error' })}
          >
            danger2
          </Button>
          <Button
            paint="success"
            onClick={() => toast({ type: 'success' })}
          >
            success2
          </Button>
          <Button
            paint="success"
            onClick={() => toast({ type: 'success', autoDismiss: 5 })}
          >
            autoDismiss: 5
          </Button>
          <Button
            paint="success"
            onClick={() => toast({ type: 'success', autoDismiss: 15 })}
          >
            autoDismiss: 15
          </Button>
        </Story>
      );
    })
    .add('with children', () => {
      const notificationSystem = React.createRef();
      const toast = () => notificationSystem.current.addNotification({
        autoDismiss: 0,
        level: 'success',
        children: <Notification item={{
            type: 'notify.success',
            info: {
              title: 'Success title',
              text: 'Success text',
            },
          }}
        />,
      });
      return (
        <Story>
          <NotificationSystem ref={notificationSystem} style={notify} />

          <Button
            paint="success"
            onClick={() => toast({ type: 'success', title: 'title', text: 'text' })}
          >
            success
          </Button>
        </Story>
      );
    });
};

