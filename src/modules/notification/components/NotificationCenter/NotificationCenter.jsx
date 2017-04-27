import React, { Component, PropTypes } from 'react';
import css from 'importcss';
import { observer, inject } from 'mobx-react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import moment from 'moment';

import Bell from 'react-icons2/mdi/bell';
import BellRing from 'react-icons2/mdi/bell-ring';

@inject(stores => ({
  store: stores.uapp.modules.notification.notificationStore,
  api: stores.api,
}))
@observer
@css(require('./NotificationCenter.css'))
export default class NotificationCenter extends Component {
  static propTypes = {
    api: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  }
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
    const { store } = this.props;
    const notifications = (
      <Popover id="notifications" title="Уведомления">
        {store.list.length > 0 ? (
          store.list.map((notify) => {
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
            {store.list.length > 0 ? <BellRing /> : <Bell />}
            {store.list.length > 0 && <div styleName="badge" />}
          </a>
        </OverlayTrigger>
      </li>
    );
  }
}
