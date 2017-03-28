import React, { Component } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { inject } from 'mobx-react';
import Navbar from './Navbar';

@inject('log')
export default class MainLayout extends Component {
  constructor(props) {
    super();
    global.toast = (err = {}) => {
      props.log.error('throwError', err);
      if (!err.type) err.type = 'error';
      if (!err.title) {
        if (err.type === 'error') {
          err.title = 'Ошибка';
        } else {
          err.title = 'Успех';
        }
      }
      if (!err.text) {
        if (err.type === 'error') {
          err.text = 'Что-то пошло не так';
        } else {
          err.text = 'Успех';
        }
      }
      this.createNotification(err);
    };
  }
  createNotification = (msg) => {
    switch (msg.type) {
      case 'info':
        NotificationManager.info(msg.title, msg.text, 2000);
        break;
      case 'success':
        NotificationManager.success(msg.title, msg.text, 2000);
        break;
      case 'warning':
        NotificationManager.warning(msg.title, msg.text, 2000);
        break;
      case 'error':
        NotificationManager.error(msg.title, msg.text, 2000);
        break;
      default:
        NotificationManager.info(msg.title, 2000);
    }
  }
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
        <NotificationContainer />
      </div>
    );
  }
}
