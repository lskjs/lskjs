import React, { Component } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { inject } from 'mobx-react';
import Navbar from './Navbar';

@inject('log')
export default class MainLayout extends Component {
  constructor(props) {
    super();
    if (__CLIENT__) {
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
        NotificationManager[err.type || 'info'](err.title, err.text, err.time || 4000, err.callback);
      };
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
