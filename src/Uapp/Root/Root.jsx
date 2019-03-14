import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DevTools from 'mobx-react-devtools';
import { Provider } from 'mobx-react';
import { ThemeProvider } from 'emotion-theming';
import NotificationSystem from '@lskjs/general/NotificationSystem';
import Loading from '@lskjs/general/Loading';

const DEBUG = false;

export default class Root extends Component {
  Provider = Provider;
  ThemeProvider = ThemeProvider;

  static propTypes = {
    history: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
  };

  static childContextTypes = {
    history: PropTypes.object.isRequired,
  };

  getChildContext() {
    return {
      history: this.props.history,
    };
  }

  constructor({ uapp }) {
    super();
    uapp.notificationSystem = React.createRef();
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


  render() {
    DEBUG && console.log('Root.render');

    const { uapp } = this.props;
    let { children } = this.props;

    children = (
      <React.Fragment>
        {children}
        <NotificationSystem ref={uapp.notificationSystem} />
        {__DEV__ && (
          <DevTools
            position={{
            bottom: 0,
            right: 20,
          }}
          />
        )}
      </React.Fragment>
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
