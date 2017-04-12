import RootBase from 'lego-starter-kit/Uapp/Root';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Provider } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import './bootstrap.g.scss';
import './Html.global.css';

export default class Root extends RootBase {
  constructor(props) {
    super(props);
    if (__CLIENT__) {
      global.toast = (err = {}) => {
        console.error('throwError', err);
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
    const stores = this.props.uapp && this.props.uapp.provide() || {};
    return (
      <Provider {...stores}>
        <div>
          {this.props.children}
          <NotificationContainer />
          <If condition={__DEV__}>
            <DevTools
              position={{
                bottom: 0,
                right: 20,
              }}
            />
          </If>
        </div>
      </Provider>
    );
  }
}
