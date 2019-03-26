import React, { PureComponent } from 'react';
import ReactNotificationSystem from 'react-notification-system';
import autobind from 'core-decorators/lib/autobind';
import Link from '../Link';
import NotifyTimelineWrapper from '../UI/atoms/NotifyTimelineWrapper';
import NotifyTimeline from '../UI/atoms/NotifyTimeline';

import Notification from './Notification';
import prepareNotificationData from './prepareNotificationData';
import notify from './notifyStyles.styles';

class NotificationSystem extends PureComponent {
  constructor(props) {
    super(props);
    this.notificationSystem = React.createRef();
  }

  @autobind
  addNotification(...args) {
    this.notificationSystem.current.addNotification(...args);
  }

  @autobind
  toast(rawData, config) {
    const {
      type = 'info', level, children, autoDismiss = 5, href, onClick, ...info
    } = prepareNotificationData(rawData, { defaultType: 'success', ...config });

    this.notificationSystem.current.addNotification({
      autoDismiss,
      level: type,
      children: children || (
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
          onClick={onClick}
        >
          <NotifyTimelineWrapper>
            <NotifyTimeline
              animationDuration={autoDismiss !== null ? autoDismiss : 5}
            />
            <Notification
              type={type}
              {...info}
            />
          </NotifyTimelineWrapper>
        </Link>
      ),
    });
  }
  render() {
    return (
      <ReactNotificationSystem ref={this.notificationSystem} style={notify} />
    );
  }
}

export default NotificationSystem;
