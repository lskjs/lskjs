import React, { Component } from 'react';
import css from 'importcss';
import { observer, inject } from 'mobx-react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import moment from 'moment';

import Bell from 'react-icons2/mdi/bell';

@inject('user', 'api')
@observer
@css(require('./Notification.css'))
export default class Notification extends Component {

  componentDidMount() {
    this.socket = this.props.api.ws('module/notification');
    this.socket.on('notification', async (notification) => {
      console.log(notification, 'notification');
      this.props.user.notifications.push(notification);
      global.toast && global.toast({
        title: 'Уведомление!',
        text: notification.action,
      });
    });
  }

  render() {
    const { user } = this.props;
    const notifications = (
      <Popover id="notifications" title="Уведомления">
        {user.notifications.length > 0 ? (
          user.notifications.map((notify) => {
            return (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '90%' }}>{`${notify.objectId} ${notify.action} ${notify.subjectId}`}</div>
                <div style={{ fontSize: '70%', textAlign: 'right', opacity: 0.7 }}>
                  {moment(notify.createdAt).locale('ru').fromNow()}
                </div>
              </div>
            );
          })
        ) : (
          <p>У вас нет новых уведомлений</p>
        )}
      </Popover>
    );
    return (
      <li>
        <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={notifications}>
          <a styleName="link">
            <Bell />
            {user.notifications.length > 0 && <div styleName="badge" />}
          </a>
        </OverlayTrigger>
      </li>
    );
  }
}
