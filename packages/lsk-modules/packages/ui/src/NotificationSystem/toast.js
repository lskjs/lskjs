import React from 'react';
import Notification from './notify/Notification';

export default function (rawData = {}) {
  const data = this.prepareNotificationData(rawData, 'success') || {};
  if (__DEV__) {
    if (data.type === 'error') {
      console.error('Uapp.toast', rawData);
    } else {
      console.warn('Uapp.toast', data);
    }
  }

  if (!data.children) {
    const subType = data.type ? `.${data.type}` : '';
    data.children = (
      <Notification
        standalone
        item={{
          type: `notify${subType}`,
          info: {
            title: data.title,
            text: data.text,
            // image: systemUser.avatar,
          },
          viewedAt: true,
        }}
      />
    );
  }
  if (__CLIENT__ && data.sound && typeof Audio === 'function') {
    const audio = new Audio(sound); // eslint-disable-line
    audio.play();
  }
  if (this.favico && data.badge != null) {
    this.favico.badge(data.badge);
  }
  const autoDismiss = data.autoDismiss != null ? data.autoDismiss : 5;
  if (this.notificationSystem) {
    this.notificationSystem.addNotification({
      level: data.type || 'info',
      autoDismiss,
      children: data.children,
    });
  } else {
    __DEV__ && console.log('!notificationSystem');
  }
}
