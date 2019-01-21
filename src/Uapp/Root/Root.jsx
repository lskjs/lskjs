import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DevTools from 'mobx-react-devtools';
import NotificationSystem from 'react-notification-system';
import { Provider } from 'mobx-react';
import { ThemeProvider } from 'emotion-theming';

function isTouchDevice() {
  const el = document.createElement('div');
  el.setAttribute('ongesturestart', 'return;');
  const result = typeof el.ongesturestart === 'function';
  // console.log('@@@@isTouchableDevice', result);
  return result;
}

const DEBUG = false;

export default class Root extends Component {
  Provider = Provider;
  ThemeProvider = ThemeProvider;

  static propTypes = {
    history: PropTypes.object.isRequired,
    insertCss: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  static childContextTypes = {
    history: PropTypes.object.isRequired,
    insertCss: PropTypes.func.isRequired,
    addClassToHtml: PropTypes.func.isRequired,
    removeClassToHtml: PropTypes.func.isRequired,
    // mobxStores: MobxTypes.objectOrObservableObject.isRequired,
  };

  getChildContext() {
    return {
      history: this.props.history,
      insertCss: this.props.insertCss,
      addClassToHtml: Root.addClassToHtml,
      removeClassToHtml: Root.removeClassToHtml,
    };
  }


  // getChildContext() {
  //   const { uapp } = this.props;
  //   const stores = (uapp && uapp.provide()) || {};
  //   uapp.log.trace('uapp.provide', Object.keys(stores));
  //   return {
  //     ...super.getChildContext(),
  //     addClassToHtml: Root.addClassToHtml,
  //     removeClassToHtml: Root.removeClassToHtml,
  //     mobxStores: stores,
  //   };
  // }
  // static contextTypes = {
  //   mobxStores: MobxTypes.objectOrObservableObject,
  // }


  static addClassToHtml(classname) {
    if (__CLIENT__) {
      const html = document.getElementsByTagName('html')[0];
      if (!(html.className).includes(classname)) {
        html.className += ` ${classname}`;
      }
    }
  }
  static removeClassToHtml(classname) {
    if (__CLIENT__) {
      const html = document.getElementsByTagName('html')[0];
      if ((html.className).includes(classname)) {
        html.className = html.className.replace(classname, '');
      }
    }
  }

  componentDidMount() {
    if (__CLIENT__) {
      const html = document.getElementsByTagName('html')[0];
      html.className = html.className.replace('ua_js_no', 'ua_js_yes');
      if (isTouchDevice()) {
        html.className = html.className.replace('ua_touchable_no', 'ua_touchable_yes');
      }
      const uA = navigator.userAgent;
      if (uA.indexOf('Safari') !== -1 && uA.indexOf('Chrome') === -1) {
        Root.addClassToHtml('safari');
      }
      if (uA.indexOf('MSIE ') > 0) Root.addClassToHtml('ie10');
      if (uA.indexOf('Trident/') > 0) Root.addClassToHtml('ie11');
      if (uA.indexOf('Edge/') > 0) Root.addClassToHtml('edge');
      if (uA.indexOf('Firefox/') > 0) Root.addClassToHtml('firefox');
    }
  }

  render() {
    DEBUG && console.log('Root.render');

    const { uapp } = this.props;
    let { children } = this.props;

    children = (
      <div>
        {children}
        <NotificationSystem
          ref={(n) => {
            if (uapp) {
              uapp.notificationSystem = n;
            } else {
              __DEV__ && console.log('LSK/Root !uapp');
            }
          }}
          style={{
            NotificationItem: { // Override the notification item
              DefaultStyle: { // Applied to every notification, regardless of the notification level
                padding: '0px',
                backgroundColor: '#ffffff',
                boxShadow: '0 20px 30px 0 rgba(0, 0, 0, 0.2)',
                border: 'none',
                borderRadius: 2,
                overflow: 'hidden',
              },
            },
            Dismiss: {
              DefaultStyle: {
                zIndex: '100',
                color: '#9b9b9b',
                backgroundColor: 'transparent',
                fontSize: 18,
                top: 6,
                right: 6,
              },
            },
          }}
        />
        {DEBUG && (
          <DevTools
            position={{
            bottom: 0,
            right: 20,
          }}
          />
        )}
      </div>
    );

    DEBUG && console.log('Root.render2');


    const { Provider } = this;
    const stores = this.props.uapp && this.props.uapp.provide() || {};
    uapp.log.trace('uapp.provide', Object.keys(stores));
    if (stores && Object.keys(stores).length && Provider) {
      DEBUG && console.log('Root.render3 @@@@');
      children = (
        <Provider {...stores}>
          {children}
        </Provider>
      );
    }
    DEBUG && console.log('Root.render4');

    const { ThemeProvider } = this;
    const { theme } = uapp;
    if (theme && ThemeProvider) {
      DEBUG && console.log('Root.render2 @@@@');
      children = (
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      );
    }
    DEBUG && console.log('Root.render3');

    return children;
  }
}
