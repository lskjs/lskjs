import React, { Component, createFactory } from 'react';
import { ToastContainer, ToastMessage } from 'react-toastr';

const ToastMessageFactory = createFactory(ToastMessage.animation);

export default class ToastContainer2 extends Component {

  constructor() {
    super();
    global.errors = [];
    // global.throwError = global.errors.push;
    global.toast = (err = {}) => {
      console.log('throwError', err);
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
      global.errors.push(err);
    };
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      while (this.check()) {

      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  check() {
    if (!global.errors.length) return false;
    const error = global.errors[0];
    global.errors = global.errors.slice(1);
    this.addAlert(error);
    return true;
  }

  addAlert({ title, text, type }) {
    this.toast[type](title, text, {
      preventDuplicates: false,
      closeButton: true,
    });
  }
  clearAlert() {
    this.toast.clear();
  }
  render() {
    return (
      <ToastContainer
        ref={e => this.toast = e}
        toastMessageFactory={ToastMessageFactory}
        className="toast-bottom-right"
      />
    );
  }
}
