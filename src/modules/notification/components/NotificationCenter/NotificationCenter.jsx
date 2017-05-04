import React, { Component, PropTypes } from 'react';
import css from 'importcss';
import { observer, inject } from 'mobx-react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import moment from 'moment';
import A from 'lsk-general/General/A';

import Bell from 'react-icons2/mdi/bell';
import BellRing from 'react-icons2/mdi/bell-ring';

@inject(stores => ({
  store: stores.uapp.modules.notification.notificationStore,
}))
@observer
@css(require('./NotificationCenter.css'))
export default class NotificationCenter extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  };
  switchActions(notify) {
    switch (notify.action) {
      case 'deal': return this.renderDeal(notify);
      case 'message': return this.renderComment(notify);
      default: return this.renderDefault();
    }
  }
  renderDeal(notify) {
    return (
      <div style={{ fontSize: '90%' }}>
        {'На ваше предложение, '}
        <A href={`/cabinet/offers/${notify.object._id}`}>{notify.object.title}</A>
        {', откликнулись: '}
        <strong>{notify.subject.info.content}</strong>
      </div>
    );
  }
  renderComment(notify) {
    return (
      <div style={{ fontSize: '90%' }}>
        <A href={`/cabinet/user/${notify.object._id}`}>{notify.object.name}</A>
        {' оставил вам сообщение '}
        <strong>{notify.subject.content}</strong>
      </div>
    );
  }
  renderDefault() {
    return (
      <div style={{ fontSize: '90%' }}>
        <strong>У вас какое-то уведомление</strong>
      </div>
    );
  }
  render() {
    const { store } = this.props;
    const notifications = (
      <Popover id="notifications" title="Уведомления">
        {store.list.length > 0 ? (
          <div>
            {store.list.map(notify => (
              <div
                key={notify._id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: 10,
                }}
              >
                {this.switchActions(notify)}
                <div style={{ fontSize: '70%', textAlign: 'right', opacity: 0.7 }}>
                  {moment(notify.createdAt).locale('ru').fromNow()}
                </div>
              </div>
            ))}
            <If condition={store.list.length === 10}>
              <A href="/cabinet/notifications">
                Посмотреть все уведомления
              </A>
            </If>
          </div>
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
